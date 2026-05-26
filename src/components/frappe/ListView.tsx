import { useMemo, useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import type { DocField } from "../../types/frappe"
import { DoctypeField } from "./DoctypeField"
import DataTableColumnHeader from "../table/data-table-column-header"
import { DataTable } from "../table/data-table"
import type {
  DataTableProps,
  FacetedFilterColumn,
  SearchableColumn,
} from "../table/data-table"
import { DocRowSheet } from "./DocRowSheet"
import type { DocRowSheetProps } from "./DocRowSheet"

const LAYOUT_TYPES = new Set([
  "Section Break",
  "Column Break",
  "Tab Break",
  "Fold",
  "Heading",
  "HTML",
  "Button",
])

/** Fieldtypes treated as searchable when in_standard_filter = 1. */
const SEARCHABLE_TYPES = new Set([
  "Data",
  "Link",
  "Dynamic Link",
  "Small Text",
  "Autocomplete",
])

/** Fieldtypes that produce faceted filter options when in_standard_filter = 1. */
const FACETED_TYPES = new Set(["Select"])

export interface ListViewProps {
  /** Field definitions for the rendered columns. */
  fields: DocField[]
  /** Row data — keys must include "name" plus each field's fieldname. */
  data: Record<string, unknown>[]
  loading?: boolean
  /**
   * Total record count for server-side pagination.
   * When provided, wire onPageChange to re-fetch your data.
   */
  totalRows?: number
  /**
   * Called when the user navigates pages or changes page size.
   * Use this to update limit_start / limit in your useFrappeGetDocList call.
   */
  onPageChange?: (pageIndex: number, pageSize: number) => void
  /** Initial page size shown in the selector. Default: 20. */
  defaultPageSize?: number
  /** Page size options. Default: [10, 20, 30, 50]. */
  pageSizeOptions?: number[]
  /**
   * Per-column render / header overrides keyed by fieldname (or "name").
   * Merged over the auto-generated ColumnDef — use this to replace a cell
   * renderer, add an action column, or force-hide a column.
   *
   * @example
   * columnOverrides={{
   *   grand_total: {
   *     cell: ({ row }) => <strong>{row.getValue('grand_total')}</strong>,
   *   },
   * }}
   */
  columnOverrides?: Record<string, Partial<ColumnDef<Record<string, unknown>>>>
  /** Called when a row is clicked. */
  onRowClick?: (row: Record<string, unknown>) => void
  /** Extra className on the outermost container. */
  className?: string
  emptyMessage?: string
  /** Pass additional searchable columns beyond what in_standard_filter provides. */
  extraSearchableColumns?: SearchableColumn[]
  /** Pass additional faceted filter columns beyond what in_standard_filter provides. */
  extraFacetedColumns?: FacetedFilterColumn[]
  /**
   * Called with the debounced search string when the user types.
   * When provided, client-side column filtering is skipped — use this
   * to re-fetch data server-side with the search term.
   */
  onSearchChange?: (value: string) => void
  /** Debounce delay for the search input in ms. Default: 350. */
  searchDebounceMs?: number
  /** Override which DataTable props to pass (everything except columns/data). */
  tableProps?: Partial<
    Omit<DataTableProps<Record<string, unknown>>, "columns" | "data">
  >
  /**
   * When provided, clicking a row opens a DocRowSheet showing the document's
   * DoctypeDetailView. This is zero-boilerplate — the sheet state is managed
   * internally.
   *
   * If `onRowClick` is also set, `rowSheet` takes precedence for the click
   * handler; `onRowClick` will not be called.
   *
   * @example
   * <ListView
   *   fields={fields}
   *   data={data}
   *   rowSheet={{
   *     doctype: "Sales Invoice",
   *     side: "right",
   *     actions: (row, close) => {
        const navigate = useNavigate();
          return (
            <Button onClick={() => { navigate(`/invoices/${String(row.name)}`); close(); }}>
              Open Full Page
            </Button>
          );
        },
   *   }}
   * />
   */
  rowSheet?: Omit<DocRowSheetProps, "row" | "onClose">
}

export function ListView({
  fields,
  data,
  loading = false,
  totalRows,
  onPageChange,
  defaultPageSize = 20,
  pageSizeOptions,
  columnOverrides = {},
  onRowClick,
  className,
  emptyMessage,
  extraSearchableColumns = [],
  extraFacetedColumns = [],
  onSearchChange,
  searchDebounceMs,
  tableProps,
  rowSheet,
}: ListViewProps) {
  const [sheetRow, setSheetRow] = useState<Record<string, unknown> | null>(null)
  const columns = useMemo<ColumnDef<Record<string, unknown>>[]>(() => {
    const nameCol: ColumnDef<Record<string, unknown>> = {
      accessorKey: "name",
      id: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          {String(row.getValue("name") ?? "")}
        </span>
      ),
      enableSorting: true,
      enableHiding: false,
      ...columnOverrides["name"],
    }

    const fieldCols: ColumnDef<Record<string, unknown>>[] = fields
      .filter((f) => !LAYOUT_TYPES.has(f.fieldtype))
      .map((field) => ({
        accessorKey: field.fieldname,
        id: field.fieldname,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={field.label ?? field.fieldname}
          />
        ),
        cell: ({ row }) => (
          <DoctypeField field={field} value={row.getValue(field.fieldname)} />
        ),
        enableSorting: true,
        enableHiding: true,
        ...columnOverrides[field.fieldname],
      }))

    return [nameCol, ...fieldCols]
  }, [fields, columnOverrides])

  const searchableColumns = useMemo<SearchableColumn[]>(
    () => [
      { id: "name", title: "Name" },
      ...fields
        .filter(
          (f) => f.in_standard_filter === 1 && SEARCHABLE_TYPES.has(f.fieldtype)
        )
        .map((f) => ({ id: f.fieldname, title: f.label ?? f.fieldname })),
      ...extraSearchableColumns,
    ],
    [fields, extraSearchableColumns]
  )

  const facetedFilterColumns = useMemo<FacetedFilterColumn[]>(
    () => [
      ...fields
        .filter(
          (f) =>
            f.in_standard_filter === 1 &&
            FACETED_TYPES.has(f.fieldtype) &&
            f.options
        )
        .map((f) => ({
          id: f.fieldname,
          title: f.label ?? f.fieldname,
          options: (f.options ?? "")
            .split("\n")
            .filter(Boolean)
            .map((opt) => ({ label: opt, value: opt })),
        })),
      ...extraFacetedColumns,
    ],
    [fields, extraFacetedColumns]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        searchableColumns={searchableColumns}
        facetedFilterColumns={facetedFilterColumns}
        totalRows={totalRows}
        onPageChange={onPageChange}
        defaultPageSize={defaultPageSize}
        pageSizeOptions={pageSizeOptions}
        onSearchChange={onSearchChange}
        searchDebounceMs={searchDebounceMs}
        onRowClick={rowSheet ? setSheetRow : onRowClick}
        className={className}
        emptyMessage={emptyMessage}
        {...tableProps}
      />
      {rowSheet && (
        <DocRowSheet
          {...rowSheet}
          row={sheetRow}
          onClose={() => setSheetRow(null)}
        />
      )}
    </>
  )
}
