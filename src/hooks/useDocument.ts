import { useState, useCallback, useMemo, useEffect, useRef } from "react"
import {
  useFrappeGetDoc,
  useFrappeCreateDoc,
  useFrappeUpdateDoc,
} from "frappe-react-sdk"
import type { DocField, DocMeta } from "../types/frappe"

// ── Layout parser ─────────────────────────────────────────────────────────────

export interface LayoutColumn {
  fields: DocField[]
}

export interface LayoutSection {
  label?: string
  collapsible: boolean
  columns: LayoutColumn[]
}

export interface LayoutTab {
  label: string
  sections: LayoutSection[]
}

export interface DocTypeLayout {
  tabs: LayoutTab[]
}

const LAYOUT_SKIP = new Set([
  "Section Break",
  "Column Break",
  "Tab Break",
  "Fold",
  "HTML",
  "Button",
])

/**
 * Parses a flat DocField array into a Tab → Section → Column → Field tree,
 * mirroring how the Frappe desk arranges forms.
 */
export function parseDocTypeLayout(fields: DocField[]): DocTypeLayout {
  const tabs: LayoutTab[] = []
  let currentTab: LayoutTab | null = null
  let currentSection: LayoutSection | null = null
  let currentColumn: LayoutColumn | null = null

  const ensureTab = () => {
    if (!currentTab) {
      currentTab = { label: "Details", sections: [] }
      tabs.push(currentTab)
    }
  }

  const ensureSection = () => {
    ensureTab()
    if (!currentSection) {
      currentSection = { collapsible: false, columns: [] }
      currentTab!.sections.push(currentSection)
    }
  }

  const ensureColumn = () => {
    ensureSection()
    if (!currentColumn) {
      currentColumn = { fields: [] }
      currentSection!.columns.push(currentColumn)
    }
  }

  for (const field of fields) {
    if (field.hidden === 1) continue

    if (field.fieldtype === "Tab Break") {
      currentTab = { label: field.label ?? "", sections: [] }
      tabs.push(currentTab)
      currentSection = null
      currentColumn = null
      continue
    }

    if (field.fieldtype === "Section Break") {
      ensureTab()
      currentSection = {
        label: field.label,
        collapsible: field.collapsible === 1,
        columns: [],
      }
      currentTab!.sections.push(currentSection)
      currentColumn = null
      continue
    }

    if (field.fieldtype === "Column Break") {
      ensureSection()
      currentColumn = { fields: [] }
      currentSection!.columns.push(currentColumn)
      continue
    }

    if (LAYOUT_SKIP.has(field.fieldtype)) continue

    ensureColumn()
    currentColumn!.fields.push(field)
  }

  // Guarantee at least one tab
  if (tabs.length === 0) {
    tabs.push({ label: "Details", sections: [] })
  }

  return { tabs }
}

// ── Default-value resolver ────────────────────────────────────────────────────

const LAYOUT_FIELD_TYPES = new Set([
  "Section Break",
  "Column Break",
  "Tab Break",
  "Fold",
  "HTML",
  "Button",
  "Table",
  "Table MultiSelect",
])

/**
 * Resolves DocField `default` strings into typed JS values, matching
 * Frappe's client-side `frappe.model.get_default_value` behaviour.
 *
 * Special Frappe keywords handled:
 *   "Today"                     → current date (YYYY-MM-DD)
 *   "Now"                       → current datetime (YYYY-MM-DD HH:MM:SS)
 *   "__user"                    → session user email (requires sessionUser arg)
 *   "__current_user_full_name"  → session user full name (requires sessionUserFullName arg)
 *
 * @param fields        DocType field list from meta
 * @param sessionUser   Current user email from useFrappeAuth().currentUser
 * @param sessionUserFullName  Current user full name (optional)
 */
export function buildFieldDefaults(
  fields: DocField[],
  sessionUser?: string,
  sessionUserFullName?: string
): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const today = new Date().toISOString().slice(0, 10)
  const now = new Date().toISOString().slice(0, 19).replace("T", " ")

  for (const field of fields) {
    if (!field.default) continue
    if (field.hidden === 1 || field.read_only === 1) continue
    if (LAYOUT_FIELD_TYPES.has(field.fieldtype)) continue

    const raw = field.default

    // Handle Frappe special-keyword defaults first
    if (raw === "__user") {
      if (sessionUser) result[field.fieldname] = sessionUser
      continue
    }
    if (raw === "__current_user_full_name") {
      if (sessionUserFullName) result[field.fieldname] = sessionUserFullName
      continue
    }

    switch (field.fieldtype) {
      case "Check":
        result[field.fieldname] = raw === "1" ? 1 : 0
        break
      case "Int":
        result[field.fieldname] = parseInt(raw, 10) || 0
        break
      case "Float":
      case "Currency":
      case "Percent":
        result[field.fieldname] = parseFloat(raw) || 0
        break
      case "Date":
        result[field.fieldname] = raw === "Today" ? today : raw
        break
      case "Datetime":
        result[field.fieldname] = raw === "Now" ? now : raw
        break
      default:
        result[field.fieldname] = raw
    }
  }

  return result
}

// ── Server-error parser ───────────────────────────────────────────────────────

/**
 * Extracts human-readable messages from a Frappe API error.
 *
 * Frappe returns errors via axios in several shapes:
 *  • error.response.data._server_messages — JSON-encoded array of
 *    objects (or JSON-encoded strings) with a `message` key
 *  • error.response.data.exception — "ExcType: message" string
 */
function parseFrappeError(err: unknown): string[] {
  if (!err || typeof err !== "object") return []
  const e = err as Record<string, unknown>
  const data = ((e.response as Record<string, unknown>)?.data ??
    e) as Record<string, unknown>

  // Primary: _server_messages (double-JSON encoded)
  if (typeof data._server_messages === "string") {
    try {
      const outer = JSON.parse(data._server_messages) as unknown[]
      const msgs: string[] = []
      for (const item of outer) {
        if (typeof item === "string") {
          try {
            const inner = JSON.parse(item) as { message?: string }
            if (inner.message) msgs.push(inner.message)
          } catch {
            msgs.push(item)
          }
        } else if (
          typeof item === "object" &&
          item !== null &&
          "message" in item
        ) {
          msgs.push((item as { message: string }).message)
        }
      }
      if (msgs.length > 0) return msgs
    } catch {
      /* fall through */
    }
  }

  // Fallback: exception string "SomeError: human message"
  if (typeof data.exception === "string") {
    const match = data.exception.match(/\w+Error:\s*(.+)/)
    if (match) return [match[1].trim()]
  }

  return []
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export interface UseDocumentOptions {
  /** Called after a successful save. */
  onSuccess?: (docname: string) => void
  /** Called if save fails. */
  onError?: (error: unknown) => void
}

export interface UseDocumentResult {
  /** Current form values (merged from fetched doc + user edits). */
  doc: Record<string, unknown>
  /** Parsed layout for rendering the form. */
  layout: DocTypeLayout | null
  /** True while fetching the existing document. */
  isLoading: boolean
  /** True while save is in flight. */
  isSaving: boolean
  /** True if any field has been changed since load. */
  isDirty: boolean
  /** True when creating a new document (no name provided). */
  isNew: boolean
  /** Per-field validation errors keyed by fieldname. */
  errors: Record<string, string>
  /** Update a single field value. */
  setField: (fieldname: string, value: unknown) => void
  /**
   * Validate required fields. When `visibleFields` is provided only those
   * fieldnames are checked — use this in Quick Entry so server-computed
   * fields (Grand Total, Net Total, etc.) don't block submission.
   */
  validate: (meta: DocMeta, visibleFields?: Set<string>) => boolean
  /**
   * Persist the document. Validates first; only fields in `visibleFields`
   * are checked client-side. Server errors are parsed and surfaced in
   * `errors` under `__server_N` keys so they appear in the error list.
   */
  save: (meta: DocMeta, visibleFields?: Set<string>) => Promise<string | null>
  /** Reset local edits back to the fetched document. */
  reset: () => void
}

/**
 * Manages the state of a single Frappe document — fetching, editing,
 * validation, saving, and fetch_from field population.
 *
 * Pass `name` for edit mode (loads existing doc).
 * Omit or pass `undefined` for create mode (starts with an empty doc).
 *
 * Pass `meta` to enable automatic fetch_from population: when a Link
 * field changes, any field with `fetch_from = "<fieldname>.<prop>"`
 * is automatically filled from the linked document.
 */
export function useDocument(
  doctype: string,
  name?: string,
  options: UseDocumentOptions = {},
  meta?: DocMeta | null
): UseDocumentResult {
  const isNew = !name

  // Fetch existing doc when in edit mode
  const { data: fetchedDoc, isLoading } = useFrappeGetDoc<
    Record<string, unknown>
  >(doctype, isNew ? undefined : name, isNew ? null : undefined)

  const [localEdits, setLocalEdits] = useState<Record<string, unknown>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)

  // ── fetch_from support ────────────────────────────────────────────────────
  const [pendingFetch, setPendingFetch] = useState<{
    fieldname: string
    doctype: string
    docname: string
  } | null>(null)

  const { data: linkedDoc } = useFrappeGetDoc<Record<string, unknown>>(
    pendingFetch?.doctype ?? "",
    pendingFetch?.docname,
    pendingFetch ? undefined : null // null SWR key = disabled
  )

  // Refs so the effect always reads the latest values without extra deps
  const pendingFetchRef = useRef(pendingFetch)
  pendingFetchRef.current = pendingFetch
  const localEditsRef = useRef(localEdits)
  localEditsRef.current = localEdits

  useEffect(() => {
    if (!linkedDoc || !pendingFetchRef.current || !meta) return
    const pf = pendingFetchRef.current
    const updates: Record<string, unknown> = {}

    for (const field of meta.fields) {
      if (!field.fetch_from) continue
      const dot = field.fetch_from.indexOf(".")
      if (dot === -1) continue
      if (field.fetch_from.slice(0, dot) !== pf.fieldname) continue
      const prop = field.fetch_from.slice(dot + 1)
      const fetched = linkedDoc[prop]
      if (fetched === undefined) continue

      // fetch_if_empty: skip if the field already has a non-empty value
      if (field.fetch_if_empty === 1) {
        const cur = localEditsRef.current[field.fieldname]
        if (cur !== null && cur !== undefined && cur !== "") continue
      }

      updates[field.fieldname] = fetched
    }

    if (Object.keys(updates).length > 0) {
      setLocalEdits((prev) => ({ ...prev, ...updates }))
    }
    setPendingFetch(null)
  }, [linkedDoc]) // eslint-disable-line react-hooks/exhaustive-deps
  // ─────────────────────────────────────────────────────────────────────────

  const { createDoc } = useFrappeCreateDoc()
  const { updateDoc } = useFrappeUpdateDoc()

  // Merged doc: fetched values + any local edits on top
  const doc = useMemo<Record<string, unknown>>(
    () => ({ ...(fetchedDoc ?? {}), ...localEdits }),
    [fetchedDoc, localEdits]
  )

  const isDirty = Object.keys(localEdits).length > 0

  const setField = useCallback(
    (fieldname: string, value: unknown) => {
      setLocalEdits((prev) => {
        const next = { ...prev, [fieldname]: value }

        if (!value && meta) {
          const src = meta.fields.find((f) => f.fieldname === fieldname)
          if (src?.fieldtype === "Link") {
            for (const f of meta.fields) {
              if (
                f.fetch_from?.startsWith(fieldname + ".") &&
                f.fetch_if_empty !== 1
              ) {
                next[f.fieldname] = ""
              }
            }
          }
        }

        return next
      })

      setErrors((prev) => {
        if (!prev[fieldname]) return prev
        const next = { ...prev }
        delete next[fieldname]
        return next
      })

      // Trigger a fetch_from resolution when a Link field is set to a value
      if (meta && value) {
        const src = meta.fields.find((f) => f.fieldname === fieldname)
        if (src?.fieldtype === "Link" && src.options) {
          const hasDeps = meta.fields.some((f) =>
            f.fetch_from?.startsWith(fieldname + ".")
          )
          if (hasDeps) {
            setPendingFetch({
              fieldname,
              doctype: src.options,
              docname: String(value),
            })
          }
        }
      } else if (!value) {
        // Cancel any in-flight fetch for the field being cleared
        setPendingFetch((prev) => (prev?.fieldname === fieldname ? null : prev))
      }
    },
    [meta]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  const validate = useCallback(
    (meta: DocMeta, visibleFields?: Set<string>): boolean => {
      const newErrors: Record<string, string> = {}
      for (const field of meta.fields) {
        if (field.reqd !== 1 || field.hidden === 1) continue
        // When a visible-field filter is supplied (e.g. Quick Entry), only
        // validate those fields — server-computed ones are checked server-side.
        if (visibleFields && !visibleFields.has(field.fieldname)) continue
        const val = doc[field.fieldname]
        if (val === null || val === undefined || val === "") {
          newErrors[field.fieldname] = `${field.label ?? field.fieldname} is required`
        }
      }
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    },
    [doc],
  )

  const save = useCallback(
    async (meta: DocMeta, visibleFields?: Set<string>): Promise<string | null> => {
      if (!validate(meta, visibleFields)) return null
      setIsSaving(true)
      try {
        let savedName: string
        if (isNew) {
          const result = await createDoc(doctype, doc)
          savedName = String(result.name)
        } else {
          await updateDoc(doctype, name!, localEdits)
          savedName = name!
        }
        setLocalEdits({})
        options.onSuccess?.(savedName)
        return savedName
      } catch (err) {
        // Surface Frappe server errors in the error list so the user can
        // see what the backend rejected without a silent failure.
        const msgs = parseFrappeError(err)
        if (msgs.length > 0) {
          const serverErrors: Record<string, string> = {}
          msgs.forEach((msg, i) => {
            serverErrors[i === 0 ? "__server" : `__server_${i}`] = msg
          })
          setErrors(serverErrors)
        }
        options.onError?.(err)
        return null
      } finally {
        setIsSaving(false)
      }
    },
    [createDoc, updateDoc, doctype, name, doc, localEdits, isNew, validate, options],
  )

  const reset = useCallback(() => {
    setLocalEdits({})
    setErrors({})
    setPendingFetch(null)
  }, [])

  return {
    doc,
    layout: null, // populated by callers via parseDocTypeLayout(meta.fields)
    isLoading,
    isSaving,
    isDirty,
    isNew,
    errors,
    setField,
    validate,
    save,
    reset,
  }
}
