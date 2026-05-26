import { cn } from "@/lib/utils"

export type StatusColor =
  | "green"
  | "blue"
  | "red"
  | "orange"
  | "yellow"
  | "purple"
  | "gray"

const COLOR_CLASSES: Record<StatusColor, string> = {
  green:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  orange:
    "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  yellow:
    "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  purple:
    "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
  gray: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
}

/**
 * Maps lowercased Frappe status strings to a display color.
 * Extend or override this via the `colorMap` prop on StatusBadge.
 */
export const DEFAULT_STATUS_COLORS: Record<string, StatusColor> = {
  // ── Green: positive / done ──────────────────────────────────────────────────
  paid: "green",
  completed: "green",
  approved: "green",
  active: "green",
  accepted: "green",
  delivered: "green",
  resolved: "green",
  success: "green",
  "fully billed": "green",
  "fully delivered": "green",
  "fully ordered": "green",
  confirmed: "green",

  // ── Blue: submitted / in progress ───────────────────────────────────────────
  submitted: "blue",
  open: "blue",
  "in progress": "blue",
  processing: "blue",
  "pending review": "blue",
  "under review": "blue",
  reviewing: "blue",
  ordered: "blue",
  "to deliver and bill": "blue",
  "to bill": "blue",
  "to deliver": "blue",

  // ── Orange: partial / waiting ────────────────────────────────────────────────
  pending: "orange",
  unpaid: "orange",
  "on hold": "orange",
  partial: "orange",
  "partially paid": "orange",
  "partially ordered": "orange",
  "partially billed": "orange",
  "partially delivered": "orange",
  "work in progress": "orange",
  replied: "orange",

  // ── Red: cancelled / failed ──────────────────────────────────────────────────
  cancelled: "red",
  canceled: "red",
  rejected: "red",
  failed: "red",
  overdue: "red",
  expired: "red",
  lost: "red",
  "credit note issued": "red",
  stopped: "red",

  // ── Purple: special states ───────────────────────────────────────────────────
  "return issued": "purple",
  amended: "purple",

  // ── Gray: neutral / draft ────────────────────────────────────────────────────
  draft: "gray",
  inactive: "gray",
  archived: "gray",
  "not started": "gray",
  closed: "gray",
  deactivated: "gray",
}

// ── Component ─────────────────────────────────────────────────────────────────

export interface StatusBadgeProps {
  value: string
  /**
   * Additional or overriding status → color entries.
   * Keys are lowercased status strings.
   */
  colorMap?: Record<string, StatusColor>
  className?: string
}

/**
 * A color-coded badge for Frappe document status values.
 * Automatically colors common Frappe statuses (Draft, Submitted, Paid, etc.)
 * and falls back to gray for unknown values.
 */
export function StatusBadge({ value, colorMap, className }: StatusBadgeProps) {
  const combined = { ...DEFAULT_STATUS_COLORS, ...colorMap }
  const color: StatusColor = combined[value.toLowerCase()] ?? "gray"

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-sm border px-2 text-xs font-medium",
        COLOR_CLASSES[color],
        className
      )}
    >
      {value}
    </span>
  )
}

/** Returns the color for a given status string. Useful for custom rendering. */
export function getStatusColor(
  value: string,
  colorMap?: Record<string, StatusColor>
): StatusColor {
  const combined = { ...DEFAULT_STATUS_COLORS, ...colorMap }
  return combined[value.toLowerCase()] ?? "gray"
}
