import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import type { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import type { FacetedFilterOption } from "./data-table-faceted-filter"
import { useDebounce } from "@/hooks/useDebounce"

export interface SearchableColumn {
  id: string
  title: string
}

export interface FacetedFilterColumn {
  id: string
  title: string
  options: FacetedFilterOption[]
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchableColumns?: SearchableColumn[]
  facetedFilterColumns?: FacetedFilterColumn[]
  /**
   * When provided, called with the debounced search string instead of
   * applying a client-side column filter. Use this for server-side search.
   */
  onSearchChange?: (value: string) => void
  /** Debounce delay in ms. Default: 350. */
  searchDebounceMs?: number
}

export function DataTableToolbar<TData>({
  table,
  searchableColumns = [],
  facetedFilterColumns = [],
  onSearchChange,
  searchDebounceMs = 350,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const [inputValue, setInputValue] = useState("")
  const debouncedSearch = useDebounce({
    value: inputValue,
    delay: searchDebounceMs,
  })

  // Track the latest callback in a ref so the effect below never needs it as
  // a dependency. Without this, a new arrow-function reference on every parent
  // render would trigger the effect and call setPageIndex(0), silently
  // resetting pagination on every data update.
  const onSearchChangeRef = useRef(onSearchChange)
  onSearchChangeRef.current = onSearchChange

  // Only re-run when the debounced search value actually changes.
  useEffect(() => {
    if (onSearchChangeRef.current) {
      onSearchChangeRef.current(debouncedSearch)
    } else {
      searchableColumns.forEach(({ id }) => {
        table.getColumn(id)?.setFilterValue(debouncedSearch || undefined)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const placeholder =
    searchableColumns.length > 0
      ? `Filter ${searchableColumns.map((c) => c.title).join(" or ")}…`
      : "Search…"

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        {searchableColumns.length > 0 && (
          <Input
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-8 w-37.5 lg:w-62.5"
          />
        )}
        {facetedFilterColumns.map((col) => {
          const column = table.getColumn(col.id)
          return column ? (
            <DataTableFacetedFilter
              key={col.id}
              column={column}
              title={col.title}
              options={col.options}
            />
          ) : null
        })}
        {(isFiltered || inputValue) && (
          <Button
            variant="ghost"
            onClick={() => {
              setInputValue("")
              table.resetColumnFilters()
              onSearchChange?.("")
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
