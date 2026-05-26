import { Clock, ExternalLink, ImageIcon, Paperclip, Phone } from "lucide-react"
import type { DocField } from "../../types/frappe"
import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import { Progress } from "../ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { StatusBadge } from "./StatusBadge"
import { ChildTableDisplay } from "./ChildTable"

/** Field names that should render their Select value as a StatusBadge. */
const STATUS_FIELDNAMES = new Set([
  "status",
  "docstatus",
  "payment_status",
  "billing_status",
  "delivery_status",
  "order_status",
  "workflow_state",
])

const LAYOUT_TYPES = new Set([
  "Section Break",
  "Column Break",
  "Tab Break",
  "Fold",
  "Heading",
  "HTML",
  "Button",
])

/** Returns true for fieldtypes that carry no data value. */
export function isLayoutField(fieldtype: string) {
  return LAYOUT_TYPES.has(fieldtype)
}

export interface DoctypeFieldProps {
  field: DocField
  value: unknown
  className?: string
}

// ── Internal helpers ─────────────────────────────────────────────────────────

function Empty({ className }: { className?: string }) {
  return (
    <span className={cn("text-muted-foreground select-none", className)}>
      —
    </span>
  )
}

function TruncatedText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const isLong = text.length > 48
  const content = (
    <span
      className={cn(
        "block max-w-50 overflow-hidden text-sm text-ellipsis whitespace-nowrap",
        isLong && "cursor-default",
        className
      )}
    >
      {text}
    </span>
  )
  if (!isLong) return content
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-xs wrap-break-word whitespace-pre-wrap">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function StarRating({ value }: { value: number }) {
  const filled = Math.min(5, Math.max(0, Math.round(value)))
  return (
    <div className="flex items-center gap-px" aria-label={`${filled} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={
            i < filled
              ? "text-sm text-amber-400"
              : "text-sm text-muted-foreground/25"
          }
        >
          ★
        </span>
      ))}
    </div>
  )
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const parts: string[] = []
  if (h > 0) parts.push(`${h}h`)
  if (m > 0) parts.push(`${m}m`)
  if (s > 0 || parts.length === 0) parts.push(`${s}s`)
  return parts.join(" ")
}

/**
 * Renders a single Frappe field value as a polished read-only display.
 * Uses shadcn/ui primitives where appropriate (Badge, Checkbox, Progress, etc.)
 *
 * This is a display component — not a form input. For editable fields, a
 * separate DoctypeFormField component is needed.
 */
export function DoctypeField({ field, value, className }: DoctypeFieldProps) {
  if (value === null || value === undefined || value === "") {
    return <Empty className={className} />
  }

  switch (field.fieldtype) {
    // ── Boolean ───────────────────────────────────────────────────────────────
    case "Check":
      return (
        <Checkbox
          checked={Boolean(Number(value))}
          disabled
          aria-label={Boolean(Number(value)) ? "Yes" : "No"}
          className={cn("pointer-events-none", className)}
        />
      )

    // ── Dates & Time ─────────────────────────────────────────────────────────
    case "Date": {
      const d = new Date(String(value))
      return (
        <span className={cn("text-sm tabular-nums", className)}>
          {isNaN(d.getTime())
            ? String(value)
            : d.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
        </span>
      )
    }

    case "Datetime": {
      const d = new Date(String(value))
      return (
        <span className={cn("text-sm tabular-nums", className)}>
          {isNaN(d.getTime())
            ? String(value)
            : d.toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
        </span>
      )
    }

    case "Time":
      return (
        <span
          className={cn(
            "flex items-center gap-1 text-sm tabular-nums",
            className
          )}
        >
          <Clock className="h-3 w-3 shrink-0 text-muted-foreground" />
          {String(value)}
        </span>
      )

    case "Duration":
      return (
        <span className={cn("font-mono text-sm tabular-nums", className)}>
          {formatDuration(Number(value))}
        </span>
      )

    // ── Numbers ───────────────────────────────────────────────────────────────
    case "Currency":
      return (
        <span className={cn("font-mono text-sm tabular-nums", className)}>
          {Number(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      )

    case "Float":
      return (
        <span className={cn("font-mono text-sm tabular-nums", className)}>
          {Number(value).toLocaleString(undefined, {
            maximumFractionDigits: 4,
          })}
        </span>
      )

    case "Percent": {
      const pct = Math.min(100, Math.max(0, Number(value)))
      return (
        <div className={cn("flex items-center gap-2", className)}>
          <Progress value={pct} className="h-1.5 w-16 shrink-0" />
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {pct.toFixed(1)}%
          </span>
        </div>
      )
    }

    case "Int":
      return (
        <span className={cn("font-mono text-sm tabular-nums", className)}>
          {Number(value)}
        </span>
      )

    case "Rating":
      return <StarRating value={Number(value)} />

    // ── Categorical ──────────────────────────────────────────────────────────
    case "Select":
      // Status-like fields get a color-coded badge; others get a plain outline badge
      if (STATUS_FIELDNAMES.has(field.fieldname)) {
        return <StatusBadge value={String(value)} className={className} />
      }
      return (
        <Badge variant="outline" className={cn("font-normal", className)}>
          {String(value)}
        </Badge>
      )

    case "Link":
    case "Dynamic Link":
      return (
        <span
          role="link"
          tabIndex={0}
          className={cn(
            "inline-flex cursor-pointer items-center gap-0.5 text-sm font-medium",
            "text-primary underline underline-offset-2 transition-opacity hover:opacity-70",
            className
          )}
        >
          {String(value)}
          <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
        </span>
      )

    // ── Plain text ────────────────────────────────────────────────────────────
    case "Data":
    case "Autocomplete":
    case "Barcode":
      return <span className={cn("text-sm", className)}>{String(value)}</span>

    case "Small Text":
    case "Text":
    case "Long Text":
    case "Text Editor":
    case "Markdown Editor":
    case "HTML Editor":
    case "Code":
      return <TruncatedText text={String(value)} className={className} />

    // ── Specialised ───────────────────────────────────────────────────────────
    case "Phone":
      return (
        <span className={cn("flex items-center gap-1 text-sm", className)}>
          <Phone className="h-3 w-3 shrink-0 text-muted-foreground" />
          {String(value)}
        </span>
      )

    case "Password":
      return (
        <span
          className={cn(
            "text-sm tracking-widest text-muted-foreground",
            className
          )}
          aria-label="hidden"
        >
          ••••••••
        </span>
      )

    case "Color": {
      const color = String(value)
      return (
        <div className={cn("flex items-center gap-1.5", className)}>
          <span
            className="h-4 w-4 shrink-0 rounded-sm border border-border"
            style={{ backgroundColor: color }}
          />
          <span className="font-mono text-xs text-muted-foreground">
            {color}
          </span>
        </div>
      )
    }

    case "Attach Image":
    case "Image": {
      const url = String(value)
      return (
        <Avatar size="sm" className={cn(className)}>
          <AvatarImage src={url} alt="attachment" />
          <AvatarFallback>
            <ImageIcon className="h-3 w-3 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )
    }

    case "Attach": {
      const url = String(value)
      const filename = url.split("/").pop() ?? url
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-1 text-sm text-primary hover:underline",
            className
          )}
        >
          <Paperclip className="h-3 w-3 shrink-0" />
          <span className="max-w-30 overflow-hidden text-ellipsis whitespace-nowrap">
            {filename}
          </span>
        </a>
      )
    }

    case "Signature":
      return (
        <span className={cn("text-xs text-muted-foreground italic", className)}>
          [Signature]
        </span>
      )

    case "Geolocation":
      return (
        <span
          className={cn(
            "block max-w-35 truncate font-mono text-xs text-muted-foreground",
            className
          )}
          title={String(value)}
        >
          {String(value)}
        </span>
      )

    // ── Child tables ──────────────────────────────────────────────────────────
    case "Table":
      return (
        <ChildTableDisplay
          field={field}
          value={Array.isArray(value) ? value : []}
          className={className}
        />
      )

    case "Table MultiSelect": {
      // MultiSelect stores an array of {value: string} link objects
      const items = Array.isArray(value) ? value : []
      if (items.length === 0) return <Empty className={className} />
      return (
        <div className={cn("flex flex-wrap gap-1", className)}>
          {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal">
              {typeof item === "object" && item !== null
                ? String((item as Record<string, unknown>).value ?? "")
                : String(item)}
            </Badge>
          ))}
        </div>
      )
    }

    default:
      return <span className={cn("text-sm", className)}>{String(value)}</span>
  }
}
