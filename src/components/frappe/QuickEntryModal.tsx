import { useEffect, useMemo, useRef } from "react"
import { AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocField } from "../../types/frappe"
import { useDoctypeMeta } from "../../hooks/useDoctypeMeta"
import { useDocument } from "../../hooks/useDocument"
import { useDocumentDefaults } from "../../hooks/useDocumentDefaults"
import { DoctypeFormField } from "./DoctypeFormField"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Separator } from "../ui/separator"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface QuickEntryModalProps {
  doctype: string
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Called with the new document name on successful save. */
  onSuccess?: (name: string) => void
  /**
   * Pre-fill specific fields when the dialog opens.
   * e.g. { customer: "Acme Ltd.", company: "My Company" }
   */
  defaults?: Record<string, unknown>
  /** Override the dialog title. Default: "New {doctype}". */
  title?: string
  /** Extra className on the DialogContent. */
  className?: string
}

/**
 * A compact dialog that renders only the mandatory and quick-entry fields
 * for a DocType, enabling fast document creation without opening a full form.
 *
 * Requires <FrappeProvider> in the tree.
 */
export function QuickEntryModal({
  doctype,
  open,
  onOpenChange,
  onSuccess,
  defaults = {},
  title,
  className,
}: QuickEntryModalProps) {
  const { meta, isLoading: metaLoading } = useDoctypeMeta(doctype)
  const { doc, setField, save, isSaving, errors, reset } = useDocument(
    doctype,
    undefined,
    {},
    meta
  )

  // Fetch Frappe defaults (Global Defaults + field.default + caller overrides).
  const { defaults: resolvedDefaults } = useDocumentDefaults(meta, defaults)

  // Seed defaults once per open. Re-arms on close so re-opening is fresh.
  const seededRef = useRef(false)
  useEffect(() => {
    if (!open) {
      seededRef.current = false
      return
    }
    if (!meta || seededRef.current) return
    Object.entries(resolvedDefaults).forEach(([k, v]) => setField(k, v))
    seededRef.current = true
  }, [open, meta, resolvedDefaults]) // eslint-disable-line react-hooks/exhaustive-deps

  const quickFields = useMemo<DocField[]>(
    () =>
      meta?.fields.filter(
        (f) =>
          (f.reqd === 1 || f.allow_in_quick_entry === 1) &&
          f.hidden !== 1 &&
          f.read_only !== 1 &&
          f.fieldtype !== "Section Break" &&
          f.fieldtype !== "Column Break" &&
          f.fieldtype !== "Tab Break" &&
          f.fieldtype !== "HTML" &&
          f.fieldtype !== "Button"
      ) ?? [],
    [meta]
  )

  const handleSave = async () => {
    if (!meta) return
    const quickFieldNames = new Set(quickFields.map((f) => f.fieldname))
    const name = await save(meta, quickFieldNames)
    if (name) {
      onSuccess?.(name)
      handleClose()
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  const hasErrors = Object.keys(errors).length > 0

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{title ?? `New ${doctype}`}</DialogTitle>
          <DialogDescription>
            Fill in the required fields to create the document.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        {/* Error summary */}
        {hasErrors && (
          <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <ul className="list-disc space-y-0.5 pl-2 text-xs">
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Fields */}
        <div className="max-h-[60vh] overflow-y-auto py-1 pr-1">
          {metaLoading ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading {doctype} fields…
            </div>
          ) : quickFields.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              No quick-entry or required fields found for {doctype}.
            </p>
          ) : (
            <div className="space-y-4">
              {quickFields.map((field) => (
                <div key={field.fieldname} className="flex flex-col gap-1.5">
                  <label className="text-sm leading-none font-medium">
                    {field.label ?? field.fieldname}
                    {field.reqd === 1 && (
                      <span className="ml-0.5 text-destructive">*</span>
                    )}
                  </label>
                  {field.description && (
                    <p className="text-xs text-muted-foreground">
                      {field.description}
                    </p>
                  )}
                  <DoctypeFormField
                    field={field}
                    value={doc[field.fieldname] ?? ""}
                    onChange={(v) => setField(field.fieldname, v)}
                    className={
                      errors[field.fieldname]
                        ? "border-destructive ring-1 ring-destructive/20"
                        : undefined
                    }
                  />
                  {errors[field.fieldname] && (
                    <p className="flex items-center gap-1 text-xs text-destructive">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors[field.fieldname]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || metaLoading}>
            {isSaving && (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            )}
            Create {doctype}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
