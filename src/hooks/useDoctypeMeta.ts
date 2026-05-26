import { useMemo } from "react"
import { useFrappeGetCall } from "frappe-react-sdk"
import type { DocField, DocMeta } from "../types/frappe"

/**
 * Fetches DocType metadata via frappe.desk.form.load.getdoctype.
 *
 * This endpoint runs frappe.get_meta() server-side, so Property Setters
 * and Custom Fields are applied before the response is sent — unlike
 * /api/resource/DocType/{name} which returns raw DB rows.
 *
 */
export function useDoctypeMeta(doctype: string | null | undefined): {
  meta: DocMeta | null
  isLoading: boolean
  error: unknown
} {
  const { data, error, isLoading } = useFrappeGetCall<Record<string, unknown>>(
    "frappe.desk.form.load.getdoctype",
    doctype ? { doctype } : undefined,
    doctype ? undefined : null
  )

  const meta = useMemo((): DocMeta | null => {
    if (!data || !doctype) return null

    // Resolve the docs array — handle both response shapes
    const raw = data as Record<string, unknown>
    const docs =
      (raw.docs as Array<Record<string, unknown>> | undefined) ??
      ((raw.message as Record<string, unknown> | undefined)?.docs as
        | Array<Record<string, unknown>>
        | undefined)

    if (!docs?.length) return null

    const docTypeDoc = docs.find(
      (d) => d.doctype === "DocType" && d.name === doctype
    )
    if (!docTypeDoc) return null

    // fields are embedded directly on the DocType doc
    const rawFields = Array.isArray(docTypeDoc.fields)
      ? (docTypeDoc.fields as Record<string, unknown>[])
      : []

    const fields: DocField[] = rawFields
      .slice()
      .sort((a, b) => Number(a.idx) - Number(b.idx))
      .map((f) => ({
        ...(f as unknown as DocField),
      }))

    return { ...(docTypeDoc as unknown as DocMeta), fields }
  }, [data, doctype])

  return { meta, isLoading, error }
}
