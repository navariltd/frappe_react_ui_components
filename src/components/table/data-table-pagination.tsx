import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import type { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  /** Total record count for server-side pagination. Overrides TanStack's page count. */
  totalRows?: number
  pageSizeOptions?: number[]
  onPageChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

export function DataTablePagination<TData>({
  table,
  totalRows,
  pageSizeOptions = [10, 20, 30, 50],
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount =
    totalRows !== undefined
      ? Math.max(1, Math.ceil(totalRows / pageSize))
      : undefined

  // When totalRows is unknown, allow Next if we received a full page —
  // a full page implies more data likely exists on the server.
  const canGoNext =
    pageCount !== undefined ? pageIndex + 1 < pageCount : table.getRowCount() >= pageSize

  const goTo = (index: number) => {
    table.setPageIndex(index)
    onPageChange?.(index)
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {totalRows !== undefined ? `${totalRows} total rows` : pageIndex > 0 ? `Page ${pageIndex + 1}` : ""}
      </div>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const size = Number(value)
              table.setPageSize(size)
              table.setPageIndex(0)
              onPageSizeChange?.(size)
              // Do NOT call onPageChange(0) here — DataTable maps onPageSizeChange
              // to onPageChange(0, newSize), so calling onPageChange(0) again would
              // pass the stale old pageSize and overwrite the new one.
            }}
          >
            <SelectTrigger className="h-8 w-17.5">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-50 items-center justify-center text-sm font-medium">
          Page {pageIndex + 1}{pageCount !== undefined ? ` of ${pageCount}` : ""}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => goTo(0)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">First page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goTo(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => goTo(pageIndex + 1)}
            disabled={!canGoNext}
          >
            <span className="sr-only">Next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => pageCount !== undefined && goTo(pageCount - 1)}
            disabled={!canGoNext || pageCount === undefined}
          >
            <span className="sr-only">Last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
