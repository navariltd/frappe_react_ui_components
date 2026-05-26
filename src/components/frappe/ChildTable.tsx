import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { Eye, Pencil, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocField } from "../../types/frappe"
import { useDoctypeMeta } from "../../hooks/useDoctypeMeta"
import { isLayoutField } from "./DoctypeField"
import { DoctypeField } from "./DoctypeField"
import { DoctypeFormField } from "./DoctypeFormField"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Separator } from "../ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

export type ChildRow = Record<string, unknown>

// ── Read-only display ─────────────────────────────────────────────────────────

export interface ChildTableDisplayProps {
  /** The parent DocField (fieldtype = "Table" or "Table MultiSelect") */
  field: DocField
  /** Array of child row objects */
  value: ChildRow[]
  className?: string
}

/**
 * Read-only display of a child table.
 * - Shows a collapsible mini-table with only the child doctype's `in_list_view` columns.
 * - Each row has a "View" button that opens a dialog showing ALL fields of that row.
 */
export function ChildTableDisplay({
  field,
  value,
  className,
}: ChildTableDisplayProps) {
  const [expanded, setExpanded] = useState(false)
  const [detailRow, setDetailRow] = useState<ChildRow | null>(null)

  const rows: ChildRow[] = Array.isArray(value) ? value : []
  const { meta } = useDoctypeMeta(field.options)

  // Columns shown in the mini-table — in_list_view only
  const listFields = useMemo(
    () =>
      meta?.fields
        .filter((f) => f.in_list_view === 1 && !isLayoutField(f.fieldtype))
        .slice(0, 5) ?? [],
    [meta]
  )

  // All data fields shown in the detail dialog
  const allFields = useMemo(
    () =>
      meta?.fields.filter(
        (f) => !isLayoutField(f.fieldtype) && f.hidden !== 1
      ) ?? [],
    [meta]
  )

  return (
    <div className={cn("space-y-1", className)}>
      {/* Row count + expand toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <Badge variant="secondary" className="font-mono">
          {rows.length} {rows.length === 1 ? "row" : "rows"}
        </Badge>
        {rows.length > 0 &&
          (expanded ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          ))}
      </button>

      {/* Mini table — in_list_view columns only */}
      {expanded && rows.length > 0 && (
        <div className="overflow-x-auto rounded-md border text-xs">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8 text-muted-foreground">#</TableHead>
                {listFields.map((f) => (
                  <TableHead key={f.fieldname}>{f.label}</TableHead>
                ))}
                {/* View button column */}
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={String(row.name ?? idx)}>
                  <TableCell className="text-muted-foreground">
                    {idx + 1}
                  </TableCell>
                  {listFields.map((f) => (
                    <TableCell key={f.fieldname}>
                      <DoctypeField field={f} value={row[f.fieldname]} />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      aria-label="View row details"
                      onClick={() => setDetailRow(row)}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Row detail dialog */}
      <Dialog open={!!detailRow} onOpenChange={(o) => !o && setDetailRow(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {field.options ?? "Row"} Details
              {detailRow?.name ? (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  — {String(detailRow.name)}
                </span>
              ) : null}
            </DialogTitle>
          </DialogHeader>
          <Separator />
          {detailRow && (
            <div className="grid gap-4 pt-1 sm:grid-cols-2">
              {allFields.map((f) => (
                <div
                  key={f.fieldname}
                  className="flex min-w-0 flex-col gap-0.5"
                >
                  <span className="truncate text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {f.label ?? f.fieldname}
                  </span>
                  <div className="min-w-0 text-sm">
                    <DoctypeField field={f} value={detailRow[f.fieldname]} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ── Editable form field ───────────────────────────────────────────────────────

export interface ChildTableFieldProps {
  field: DocField
  value: ChildRow[]
  onChange: (rows: ChildRow[]) => void
  disabled?: boolean
  className?: string
}

/**
 * Editable child table for use in forms.
 *
 * - Shows only `in_list_view` columns in the compact table (read-only preview).
 * - Each row has an edit (✏) button that opens a full-field Dialog.
 * - "Add Row" creates a blank row and immediately opens the edit Dialog.
 * - Rows can be deleted via the trash button in the Dialog.
 *
 * Requires <FrappeProvider> in the tree.
 */
export function ChildTableField({
  field,
  value,
  onChange,
  disabled,
  className,
}: ChildTableFieldProps) {
  const rows: ChildRow[] = Array.isArray(value) ? value : []
  const { meta, isLoading } = useDoctypeMeta(field.options)

  // editIdx: which row index is open in the dialog (-1 = none)
  const [editIdx, setEditIdx] = useState<number>(-1)

  // Draft edits for the currently open row
  const [draft, setDraft] = useState<ChildRow>({})

  // ── fetch_from support ──────────────────────────────────────────────────────
  const [pendingFetch, setPendingFetch] = useState<{
    fieldname: string
    doctype: string
    docname: string
  } | null>(null)

  const { data: linkedDoc } = useFrappeGetDoc<Record<string, unknown>>(
    pendingFetch?.doctype ?? "",
    pendingFetch?.docname,
    pendingFetch ? undefined : null
  )

  const pendingFetchRef = useRef(pendingFetch)
  pendingFetchRef.current = pendingFetch
  const draftRef = useRef(draft)
  draftRef.current = draft

  useEffect(() => {
    if (!linkedDoc || !pendingFetchRef.current || !meta) return
    const pf = pendingFetchRef.current
    const updates: ChildRow = {}

    for (const f of meta.fields) {
      if (!f.fetch_from) continue
      const dot = f.fetch_from.indexOf(".")
      if (dot === -1) continue
      if (f.fetch_from.slice(0, dot) !== pf.fieldname) continue
      const prop = f.fetch_from.slice(dot + 1)
      const fetched = linkedDoc[prop]
      if (fetched === undefined) continue

      if (f.fetch_if_empty === 1) {
        const cur = draftRef.current[f.fieldname]
        if (cur !== null && cur !== undefined && cur !== "") continue
      }

      updates[f.fieldname] = fetched
    }

    if (Object.keys(updates).length > 0) {
      setDraft((prev) => ({ ...prev, ...updates }))
    }
    setPendingFetch(null)
  }, [linkedDoc]) // eslint-disable-line react-hooks/exhaustive-deps
  // ───────────────────────────────────────────────────────────────────────────

  const handleDraftChange = useCallback(
    (fieldname: string, value: unknown) => {
      setDraft((prev) => {
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
        setPendingFetch((prev) => (prev?.fieldname === fieldname ? null : prev))
      }
    },
    [meta]
  ) // eslint-disable-line react-hooks/exhaustive-deps

  // Columns shown in the compact table — in_list_view only
  const listFields = useMemo(
    () =>
      meta?.fields
        .filter((f) => f.in_list_view === 1 && !isLayoutField(f.fieldtype))
        .slice(0, 5) ?? [],
    [meta]
  )

  // All editable fields shown in the edit dialog
  const allEditFields = useMemo(
    () =>
      meta?.fields.filter(
        (f) =>
          !isLayoutField(f.fieldtype) &&
          f.hidden !== 1 &&
          f.read_only !== 1 &&
          f.fieldtype !== "Table" &&
          f.fieldtype !== "Table MultiSelect"
      ) ?? [],
    [meta]
  )

  const openEdit = (idx: number) => {
    setDraft({ ...(rows[idx] ?? {}) })
    setEditIdx(idx)
    setPendingFetch(null)
  }

  const addRow = () => {
    const newRow: ChildRow = { idx: rows.length + 1 }
    allEditFields.forEach((f) => {
      newRow[f.fieldname] = f.default ?? ""
    })
    const newRows = [...rows, newRow]
    onChange(newRows)
    // open edit dialog for the new row immediately
    setDraft({ ...newRow })
    setEditIdx(newRows.length - 1)
  }

  const saveEdit = () => {
    onChange(rows.map((r, i) => (i === editIdx ? { ...r, ...draft } : r)))
    setEditIdx(-1)
  }

  const deleteRow = (idx: number) => {
    onChange(rows.filter((_, i) => i !== idx))
    setEditIdx(-1)
  }

  if (isLoading) {
    return (
      <div className="flex h-16 items-center justify-center rounded-md border text-sm text-muted-foreground">
        Loading {field.options} fields…
      </div>
    )
  }

  if (!meta) {
    return (
      <div className="rounded-md border p-3 text-sm text-muted-foreground">
        No fields found for {field.options}
      </div>
    )
  }

  const colCount = listFields.length + (disabled ? 1 : 2)

  return (
    <div className={cn("space-y-2", className)}>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8 text-center text-xs text-muted-foreground">
                #
              </TableHead>
              {listFields.map((f) => (
                <TableHead key={f.fieldname} className="text-xs">
                  {f.label}
                </TableHead>
              ))}
              {/* Edit / delete action column */}
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={colCount}
                  className="h-16 text-center text-sm text-muted-foreground"
                >
                  No rows. {!disabled && 'Click "Add Row" to start.'}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className="text-center text-xs text-muted-foreground">
                    {rowIdx + 1}
                  </TableCell>
                  {/* Read-only preview of in_list_view fields */}
                  {listFields.map((f) => (
                    <TableCell key={f.fieldname} className="px-2 py-1.5">
                      <DoctypeField field={f} value={row[f.fieldname]} />
                    </TableCell>
                  ))}
                  {/* Edit button → opens full-field dialog */}
                  <TableCell className="px-2 py-1 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => openEdit(rowIdx)}
                      disabled={disabled}
                      className="h-6 w-6 text-muted-foreground hover:text-foreground"
                      aria-label="Edit row"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!disabled && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          className="gap-1.5"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Row
        </Button>
      )}

      {/* Full-field edit dialog */}
      <Dialog open={editIdx >= 0} onOpenChange={(o) => !o && setEditIdx(-1)}>
        <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {field.options} — Row {editIdx + 1}
            </DialogTitle>
          </DialogHeader>
          <Separator />
          <div className="flex-1 space-y-4 overflow-y-auto py-1 pr-1">
            {allEditFields.map((f) => (
              <div key={f.fieldname} className="flex flex-col gap-1.5">
                <label className="text-sm leading-none font-medium">
                  {f.label ?? f.fieldname}
                  {f.reqd === 1 && (
                    <span className="ml-0.5 text-destructive">*</span>
                  )}
                </label>
                <DoctypeFormField
                  field={f}
                  value={draft[f.fieldname] ?? ""}
                  onChange={(v) => handleDraftChange(f.fieldname, v)}
                />
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex items-center justify-between pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => deleteRow(editIdx)}
              className="gap-1.5 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Row
            </Button>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditIdx(-1)}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={saveEdit}>
                Save Row
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
