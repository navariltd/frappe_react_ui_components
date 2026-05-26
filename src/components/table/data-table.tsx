import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import type {
  SearchableColumn,
  FacetedFilterColumn,
} from "./data-table-toolbar"

export type { SearchableColumn, FacetedFilterColumn }

export interface DataTableProps<TData, TValue = unknown> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Columns available in the global search input. */
  searchableColumns?: SearchableColumn[]
  /** Columns shown as faceted filter buttons (Select fields). */
  facetedFilterColumns?: FacetedFilterColumn[]
  /**
   * Total record count for server-side pagination.
   * When provided, pass onPageChange to re-fetch on page navigation.
   */
  totalRows?: number
  /**
   * Called when the user navigates pages or changes page size.
   * Receives the new (pageIndex, pageSize) so the parent can re-fetch.
   */
  onPageChange?: (pageIndex: number, pageSize: number) => void
  /** Page size options shown in the selector. Default: [10, 20, 30, 50] */
  pageSizeOptions?: number[]
  /** Initial page size. Default: 20. */
  defaultPageSize?: number
  /**
   * Called with the debounced search string when the user types.
   * When provided, column-level filtering is skipped — delegate to
   * server-side search instead.
   */
  onSearchChange?: (value: string) => void
  /** Debounce delay for the search input in ms. Default: 350. */
  searchDebounceMs?: number
  /** Called when a row is clicked. */
  onRowClick?: (row: TData) => void
  /** Extra className applied to the outermost container. */
  className?: string
  /** Text shown when there are no rows. */
  emptyMessage?: string
  loading?: boolean
}

export function DataTable<TData, TValue = unknown>({
  columns,
  data,
  searchableColumns = [],
  facetedFilterColumns = [],
  totalRows,
  onPageChange,
  pageSizeOptions = [10, 20, 30, 50],
  defaultPageSize = 20,
  onRowClick,
  className,
  onSearchChange,
  searchDebounceMs,
  emptyMessage = "No results.",
  loading = false,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  })

  // Use server (manual) pagination whenever a page-change callback is wired up.
  // This also disables TanStack's autoResetPageIndex behaviour — without it,
  // any data update (e.g. a new SWR response) silently resets pageIndex to 0,
  // making Next-page navigation appear broken for non-cached doctypes.
  const isServerPagination = onPageChange !== undefined

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    onPaginationChange: setPagination,
    ...(isServerPagination && {
      manualPagination: true,
      // -1 = unknown page count; DataTablePagination uses its own calculation
      // once totalRows is available, so this only matters for TanStack internals.
      pageCount:
        totalRows !== undefined
          ? Math.max(1, Math.ceil(totalRows / pagination.pageSize))
          : -1,
    }),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className={cn("space-y-4", className)}>
      {(searchableColumns.length > 0 || facetedFilterColumns.length > 0) && (
        <DataTableToolbar
          table={table}
          searchableColumns={searchableColumns}
          facetedFilterColumns={facetedFilterColumns}
          onSearchChange={onSearchChange}
          searchDebounceMs={searchDebounceMs}
        />
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        totalRows={totalRows}
        pageSizeOptions={pageSizeOptions}
        onPageChange={(idx) =>
          onPageChange?.(idx, table.getState().pagination.pageSize)
        }
        onPageSizeChange={(size) => onPageChange?.(0, size)}
      />
    </div>
  )
}
