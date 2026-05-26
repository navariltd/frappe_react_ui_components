import { useState } from "react"
import { CalendarIcon, Clock, X } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseTime(t: string): [string, string, string] {
  const parts = t.split(":")
  return [
    (parts[0] ?? "00").padStart(2, "0"),
    (parts[1] ?? "00").padStart(2, "0"),
    (parts[2] ?? "00").padStart(2, "0"),
  ]
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

// ── TimePicker ───────────────────────────────────────────────────────────────

export interface TimePickerProps {
  /** Value as "HH:mm:ss" string. */
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  /** Whether to show the seconds input. Default: false. */
  showSeconds?: boolean
  className?: string
}

/**
 * Compact time picker using number spinner inputs.
 * Better UX than Select dropdowns for 0-59 ranges — type directly or
 * click the up/down arrows. Wraps correctly (e.g. 59→00, 23→00).
 */
export function TimePicker({
  value = "00:00:00",
  onChange,
  disabled,
  showSeconds = false,
  className,
}: TimePickerProps) {
  const [h, m, s] = parseTime(value)

  const update = (hours: string, mins: string, secs: string) =>
    onChange?.(`${hours}:${mins}:${secs}`)

  const spin = (
    current: string,
    max: number,
    onCommit: (padded: string) => void,
    label: string,
  ) => (
    <div className="flex flex-col items-center gap-0.5">
      <input
        type="number"
        min={0}
        max={max}
        value={parseInt(current, 10)}
        disabled={disabled}
        aria-label={label}
        onChange={(e) => {
          const raw = parseInt(e.target.value, 10)
          const clamped = isNaN(raw) ? 0 : clamp(raw, 0, max)
          onCommit(String(clamped).padStart(2, "0"))
        }}
        className={cn(
          "h-8 w-14 rounded-md border border-input bg-transparent text-center font-mono text-sm",
          "focus:outline-none focus:ring-1 focus:ring-ring/50 focus:border-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:opacity-100",
          className,
        )}
      />
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )

  return (
    <div className="flex items-center gap-1.5">
      <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
      {spin(h, 23, (v) => update(v, m, s), "hr")}
      <span className="font-mono text-lg text-muted-foreground mb-4">:</span>
      {spin(m, 59, (v) => update(h, v, s), "min")}
      {showSeconds && (
        <>
          <span className="font-mono text-lg text-muted-foreground mb-4">:</span>
          {spin(s, 59, (v) => update(h, m, v), "sec")}
        </>
      )}
    </div>
  )
}

// ── DatePicker ───────────────────────────────────────────────────────────────

export interface DatePickerProps {
  /** Value as "yyyy-MM-dd" string. */
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  className?: string
}

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder = "Pick a date",
  className,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const date = value ? new Date(value) : undefined
  const isValid = date && !isNaN(date.getTime())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !isValid && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="flex-1">
            {isValid ? format(date!, "PPP") : placeholder}
          </span>
          {isValid && onChange && (
            <span
              role="button"
              aria-label="Clear date"
              tabIndex={0}
              className="ml-1 rounded-sm opacity-60 ring-offset-background hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation()
                  onChange("")
                }
              }}
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isValid ? date : undefined}
          defaultMonth={isValid ? date : new Date()}
          onSelect={(d) => {
            onChange?.(d ? format(d, "yyyy-MM-dd") : "")
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

// ── DatetimePicker ───────────────────────────────────────────────────────────

export interface DatetimePickerProps {
  /** Value as "yyyy-MM-dd HH:mm:ss" string. */
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
  showSeconds?: boolean
  className?: string
}

export function DatetimePicker({
  value = "",
  onChange,
  disabled,
  placeholder = "Pick date & time",
  showSeconds = false,
  className,
}: DatetimePickerProps) {
  const [open, setOpen] = useState(false)
  const [datePart, timePart = "00:00:00"] = value.split(" ")
  const date = datePart ? new Date(datePart) : undefined
  const isValid = date && !isNaN(date.getTime())

  const [h, m, s] = parseTime(timePart)
  const displayTime = showSeconds ? `${h}:${m}:${s}` : `${h}:${m}`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !isValid && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="flex-1">
            {isValid ? `${format(date!, "PPP")} · ${displayTime}` : placeholder}
          </span>
          {isValid && onChange && (
            <span
              role="button"
              aria-label="Clear"
              tabIndex={0}
              className="ml-1 rounded-sm opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.stopPropagation()
                  onChange("")
                }
              }}
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={isValid ? date : undefined}
          defaultMonth={isValid ? date : new Date()}
          onSelect={(d) => {
            if (d) onChange?.(`${format(d, "yyyy-MM-dd")} ${timePart}`)
          }}
        />
        <Separator />
        <div className="p-3">
          <TimePicker
            value={timePart}
            showSeconds={showSeconds}
            onChange={(t) => {
              if (datePart) onChange?.(`${datePart} ${t}`)
            }}
            disabled={disabled}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ── DateRangePicker ──────────────────────────────────────────────────────────

export interface DateRangePickerProps {
  value?: { from?: string; to?: string }
  onChange?: (range: { from: string; to: string }) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  numberOfMonths?: number
}

export function DateRangePicker({
  value,
  onChange,
  disabled,
  placeholder = "Pick a date range",
  className,
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false)

  const range: DateRange | undefined = value?.from
    ? {
        from: new Date(value.from),
        to: value?.to ? new Date(value.to) : undefined,
      }
    : undefined

  const isValidFrom = range?.from && !isNaN(range.from.getTime())
  const isValidTo = range?.to && !isNaN(range.to.getTime())

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !isValidFrom && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="flex-1">
            {isValidFrom ? (
              isValidTo ? (
                <>
                  {format(range!.from!, "LLL dd, y")}
                  {" — "}
                  {format(range!.to!, "LLL dd, y")}
                </>
              ) : (
                format(range!.from!, "LLL dd, y")
              )
            ) : (
              placeholder
            )}
          </span>
          {isValidFrom && onChange && (
            <span
              role="button"
              aria-label="Clear"
              tabIndex={0}
              className="ml-1 rounded-sm opacity-60 hover:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                onChange({ from: "", to: "" })
              }}
            >
              <X className="h-3.5 w-3.5" />
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          defaultMonth={range?.from ?? new Date()}
          onSelect={(r) => {
            onChange?.({
              from: r?.from ? format(r.from, "yyyy-MM-dd") : "",
              to: r?.to ? format(r.to, "yyyy-MM-dd") : "",
            })
          }}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
}
