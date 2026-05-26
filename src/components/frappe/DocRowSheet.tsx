import { cn } from "@/lib/utils"
import { DoctypeDetailView } from "./DoctypeDetailView"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DocRowSheetProps {
  doctype: string
  /**
   * The selected row. The row must contain a `name` field (the Frappe docname).
   * Pass `null` to close the sheet.
   */
  row: Record<string, unknown> | null
  /** Called when the sheet closes. */
  onClose: () => void
  /**
   * Which side the sheet slides in from.
   * @default "right"
   */
  side?: "left" | "right"
  /**
   * Sheet header title.
   * Pass a function to derive the title from the selected row.
   * @default doctype
   */
  title?: string | ((row: Record<string, unknown>) => string)
  /**
   * Sheet header description.
   * Pass a function to derive from the row.
   * @default the document name
   */
  description?: string | ((row: Record<string, unknown>) => string)
  /**
   * Extra actions rendered at the bottom of the sheet (below the detail view).
   * Receives the current row and a close callback.
   */
  actions?: (
    row: Record<string, unknown>,
    onClose: () => void
  ) => React.ReactNode
  /** Fields to hide in the detail view. */
  hiddenFields?: string[]
  /** Extra className on SheetContent. */
  className?: string
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * A side sheet that shows a read-only DoctypeDetailView for a selected row.
 *
 * Typically used with ListView's `onRowClick`:
 * ```tsx
 * const [selectedRow, setSelectedRow] = useState(null)
 *
 * <ListView
 *   fields={fields}
 *   data={data}
 *   onRowClick={setSelectedRow}
 * />
 * <DocRowSheet
 *   doctype="Sales Invoice"
 *   row={selectedRow}
 *   onClose={() => setSelectedRow(null)}
 * />
 * ```
 *
 * Or use the `rowSheet` prop on ListView for a zero-boilerplate version.
 *
 * <ListView
 *    fields={listFields}
 *    data={data ?? []}
 *    loading={metaLoading || isLoading}
 *    totalRows={totalCount ?? undefined}
 *    defaultPageSize={pageSize}
 *    onPageChange={(idx) => setPageIndex(idx)}
 *    rowSheet={{
 *      doctype,
 *      side: sheetSide,
 *      title: (row) => String(row.name ?? doctype),
 *      description: doctype,
 *    }}
 *  />
 *
 * Requires <FrappeProvider> in the tree.
 */
export function DocRowSheet({
  doctype,
  row,
  onClose,
  side = "right",
  title,
  description,
  actions,
  hiddenFields,
  className,
}: DocRowSheetProps) {
  const docName = row ? String(row.name ?? "") : ""

  const resolvedTitle =
    typeof title === "function"
      ? row
        ? title(row)
        : doctype
      : (title ?? doctype)

  const resolvedDescription =
    typeof description === "function"
      ? row
        ? description(row)
        : ""
      : (description ?? docName)

  return (
    <Sheet open={!!row} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side={side}
        className={cn(
          "flex w-full flex-col overflow-hidden px-4 sm:max-w-xl",
          className
        )}
      >
        {/* Header */}
        <SheetHeader className="shrink-0 border-b pb-4">
          <SheetTitle>{resolvedTitle}</SheetTitle>
          {resolvedDescription && (
            <SheetDescription>{resolvedDescription}</SheetDescription>
          )}
        </SheetHeader>

        {/* Detail content — scrollable */}
        <div className="flex-1 overflow-y-auto py-4">
          {row && docName ? (
            <DoctypeDetailView
              doctype={doctype}
              name={docName}
              hiddenFields={hiddenFields}
              showHeader={false}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No document selected.
            </p>
          )}
        </div>

        {/* Optional footer actions */}
        {actions && row && (
          <div className="flex shrink-0 items-center gap-2 border-t pt-4">
            {actions(row, onClose)}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
