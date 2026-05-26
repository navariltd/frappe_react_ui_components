// ── shadcn base components ──────────────────────────────────────────────────
export { Button, buttonVariants } from "@/components/ui/button"
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ── Date / Time pickers ─────────────────────────────────────────────────────
export {
  DatePicker,
  DatetimePicker,
  TimePicker,
  DateRangePicker,
} from "@/components/ui/date-time-picker"
export type {
  DatePickerProps,
  DatetimePickerProps,
  TimePickerProps,
  DateRangePickerProps,
} from "@/components/ui/date-time-picker"

// ── Generic DataTable (TanStack-based) ─────────────────────────────────────
export { DataTable } from "@/components/table/data-table"
export type {
  DataTableProps,
  SearchableColumn,
  FacetedFilterColumn,
} from "@/components/table/data-table"
export { DataTableToolbar } from "@/components/table/data-table-toolbar"
export { DataTablePagination } from "@/components/table/data-table-pagination"
export { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter"
export type { FacetedFilterOption } from "@/components/table/data-table-faceted-filter"
export { DataTableViewOptions } from "@/components/table/data-table-view-options"
export { default as DataTableColumnHeader } from "@/components/table/data-table-column-header"

// ── Utilities ───────────────────────────────────────────────────────────────
export { cn } from "@/lib/utils"

// ── Types ───────────────────────────────────────────────────────────────────
export type {
  DocField,
  DocMeta,
  DocPerm,
  FieldType,
  FrappeFilter,
} from "@/types/frappe"

// ── Hooks ───────────────────────────────────────────────────────────────────
export { useDoctypeMeta } from "@/hooks/useDoctypeMeta"
export { useDebounce } from "@/hooks/useDebounce"
export { useDocument, parseDocTypeLayout, buildFieldDefaults } from "@/hooks/useDocument"
export { useDocumentDefaults } from "@/hooks/useDocumentDefaults"
export type {
  UseDocumentResult,
  UseDocumentOptions,
  DocTypeLayout,
  LayoutTab,
  LayoutSection,
  LayoutColumn,
} from "@/hooks/useDocument"

// ── Frappe-aware components ─────────────────────────────────────────────────
export { DoctypeField, isLayoutField } from "@/components/frappe/DoctypeField"
export type { DoctypeFieldProps } from "@/components/frappe/DoctypeField"
export { DoctypeFormField } from "@/components/frappe/DoctypeFormField"
export type { DoctypeFormFieldProps } from "@/components/frappe/DoctypeFormField"
export { StatusBadge, getStatusColor, DEFAULT_STATUS_COLORS } from "@/components/frappe/StatusBadge"
export type { StatusBadgeProps, StatusColor } from "@/components/frappe/StatusBadge"
export { ChildTableDisplay, ChildTableField } from "@/components/frappe/ChildTable"
export type { ChildTableDisplayProps, ChildTableFieldProps, ChildRow } from "@/components/frappe/ChildTable"
export { FormView } from "@/components/frappe/FormView"
export type { FormViewProps } from "@/components/frappe/FormView"
export { DoctypeDetailView } from "@/components/frappe/DoctypeDetailView"
export type { DoctypeDetailViewProps } from "@/components/frappe/DoctypeDetailView"
export { QuickEntryModal } from "@/components/frappe/QuickEntryModal"
export type { QuickEntryModalProps } from "@/components/frappe/QuickEntryModal"
export { DocRowSheet } from "@/components/frappe/DocRowSheet"
export type { DocRowSheetProps } from "@/components/frappe/DocRowSheet"
export { ListView } from "@/components/frappe/ListView"
export type { ListViewProps } from "@/components/frappe/ListView"
