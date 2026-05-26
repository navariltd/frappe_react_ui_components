import { useState } from "react"
import { useSearch } from "frappe-react-sdk"
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react"
import type { DocField } from "../../types/frappe"
import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Label } from "../ui/label"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { DatePicker, DatetimePicker, TimePicker } from "../ui/date-time-picker"
import { ChildTableField } from "./ChildTable"

// ── Prop types ───────────────────────────────────────────────────────────────

export interface DoctypeFormFieldProps {
  field: DocField
  value: unknown
  onChange: (value: unknown) => void
  disabled?: boolean
  className?: string
  linkedDoctype?: string
}

// ── Internal sub-components ──────────────────────────────────────────────────

/** Searchable combobox that queries any Frappe DocType via useSearch. */
function FrappeLinkSelect({
  doctype,
  label,
  value,
  onChange,
  disabled,
}: {
  doctype: string
  label: string
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const { data, isLoading } = useSearch(doctype, query, undefined, 20)
  const results = data?.message ?? []

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled || !doctype}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <span className="truncate">{value || `Select ${label}…`}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-85 p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${label}…`}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="py-4 text-center text-sm text-muted-foreground">
                Searching…
              </div>
            ) : results.length === 0 ? (
              <CommandEmpty>No results found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {results.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(v) => {
                      onChange(v === value ? "" : v)
                      setOpen(false)
                      setQuery("")
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium">{item.value}</span>
                      {item.description && (
                        <span className="truncate text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/**
 * Command-based combobox for static option lists (Select fieldtype).
 * Provides built-in text filter.
 */
function SelectCombobox({
  options,
  value,
  onChange,
  placeholder = "Select…",
  disabled,
  className,
}: {
  options: string[]
  value: string
  onChange: (v: unknown) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-0"
        align="start"
      >
        <Command>
          {options.length > 6 && <CommandInput placeholder="Search…" />}
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {/* Clear selection */}
              {value && (
                <CommandItem
                  value="__clear__"
                  onSelect={() => {
                    onChange("")
                    setOpen(false)
                  }}
                  className="text-xs text-muted-foreground italic"
                >
                  Clear selection
                </CommandItem>
              )}
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  value={opt}
                  onSelect={(v) => {
                    onChange(v)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === opt ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {opt}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/** Interactive star rating. */
function StarInput({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
  const [hovered, setHovered] = useState(0)
  const filled = hovered > 0 ? hovered : value
  return (
    <div
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHovered(0)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={disabled}
          className={cn(
            "text-xl transition-colors",
            i < filled ? "text-amber-400" : "text-muted-foreground/20",
            !disabled && "cursor-pointer hover:text-amber-300"
          )}
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHovered(i + 1)}
          aria-label={`${i + 1} star`}
        >
          ★
        </button>
      ))}
      {value > 0 && !disabled && (
        <button
          type="button"
          onClick={() => onChange(0)}
          className="ml-1 text-xs text-muted-foreground hover:text-destructive"
          aria-label="Clear rating"
        >
          ✕
        </button>
      )}
    </div>
  )
}

/** H / M / S inputs — value is total seconds. */
function DurationInput({
  value,
  onChange,
  disabled,
}: {
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
  const h = Math.floor(value / 3600)
  const m = Math.floor((value % 3600) / 60)
  const s = value % 60
  const update = (hours: number, mins: number, secs: number) =>
    onChange(hours * 3600 + mins * 60 + secs)

  const numProps = {
    type: "number" as const,
    min: 0,
    disabled,
    className: "w-16 text-center font-mono",
  }

  return (
    <div className="flex items-center gap-1.5">
      <Input
        {...numProps}
        max={9999}
        value={h}
        onChange={(e) => update(Number(e.target.value), m, s)}
      />
      <span className="text-sm text-muted-foreground">h</span>
      <Input
        {...numProps}
        max={59}
        value={m}
        onChange={(e) => update(h, Number(e.target.value), s)}
      />
      <span className="text-sm text-muted-foreground">m</span>
      <Input
        {...numProps}
        max={59}
        value={s}
        onChange={(e) => update(h, m, Number(e.target.value))}
      />
      <span className="text-sm text-muted-foreground">s</span>
    </div>
  )
}

/** Password field with show / hide toggle. */
function PasswordInput({
  value,
  onChange,
  disabled,
  className,
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
  className?: string
}) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn("pr-10", className)}
        autoComplete="off"
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

/** Color picker with hex input. */
function ColorInput({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-9 w-10 shrink-0 cursor-pointer rounded border border-input p-0.5"
      />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="font-mono"
        placeholder="#000000"
        maxLength={9}
      />
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

/**
 * Renders an editable form control for a single Frappe DocField.
 *
 * Link / Dynamic Link fields use `useSearch` from frappe-react-sdk to query
 * the Frappe backend, so this component must be rendered inside a
 * <FrappeProvider>.
 */
export function DoctypeFormField({
  field,
  value,
  onChange,
  disabled = false,
  className,
  linkedDoctype,
}: DoctypeFormFieldProps) {
  const str = value == null ? "" : String(value)
  const num = Number(value) || 0

  switch (field.fieldtype) {
    // ── Boolean ───────────────────────────────────────────────────────────────
    case "Check":
      return (
        <Switch
          checked={Boolean(Number(value))}
          onCheckedChange={(checked) => onChange(checked ? 1 : 0)}
          disabled={disabled}
          className={className}
          aria-label={field.label}
        />
      )

    // ── Dates & Time ─────────────────────────────────────────────────────────
    case "Date":
      return (
        <DatePicker
          value={str}
          onChange={(v) => onChange(v)}
          disabled={disabled}
          className={className}
        />
      )

    case "Datetime":
      return (
        <DatetimePicker
          value={str}
          onChange={(v) => onChange(v)}
          disabled={disabled}
          className={className}
        />
      )

    case "Time":
      return (
        <TimePicker
          value={str || "00:00:00"}
          onChange={(v) => onChange(v)}
          disabled={disabled}
        />
      )

    case "Duration":
      return (
        <DurationInput value={num} onChange={onChange} disabled={disabled} />
      )

    // ── Numbers ───────────────────────────────────────────────────────────────
    case "Int":
      return (
        <InputGroup className={cn("w-36", className)}>
          <InputGroupInput
            type="number"
            step={1}
            value={str}
            onChange={(e) => onChange(Number(e.target.value))}
            disabled={disabled}
            className="font-mono"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupText>int</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      )

    case "Float":
      return (
        <InputGroup className={cn("w-40", className)}>
          <InputGroupInput
            type="number"
            step="any"
            value={str}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            disabled={disabled}
            className="font-mono"
          />
          <InputGroupAddon align="inline-end"></InputGroupAddon>
        </InputGroup>
      )

    case "Currency":
      return (
        <InputGroup className={cn("w-44", className)}>
          <InputGroupAddon align="inline-start">
            <InputGroupText>$</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            type="number"
            step="any"
            value={str}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            disabled={disabled}
            className="font-mono"
          />
        </InputGroup>
      )

    case "Percent": {
      const pct = Math.min(100, Math.max(0, num))
      return (
        <div className={cn("flex items-center gap-3", className)}>
          <InputGroup className="w-28 shrink-0">
            <InputGroupInput
              type="number"
              min={0}
              max={100}
              step="any"
              value={str}
              onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
              disabled={disabled}
              className="font-mono"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupText>%</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <Progress value={pct} className="h-2 flex-1" />
          <span className="w-12 shrink-0 text-right text-sm text-muted-foreground tabular-nums">
            {pct.toFixed(1)}%
          </span>
        </div>
      )
    }

    case "Rating":
      return <StarInput value={num} onChange={onChange} disabled={disabled} />

    // ── Categorical ──────────────────────────────────────────────────────────
    case "Select": {
      const options = (field.options ?? "")
        .split("\n")
        .map((o) => o.trim())
        .filter(Boolean)

      // Use a Command-based combobox: proper mouse-wheel scroll + built-in
      // search filter. The shadcn Select uses hover-activated arrows which
      // is poor UX for fields with many options.
      return (
        <SelectCombobox
          options={options}
          value={str}
          onChange={onChange}
          placeholder={`Select ${field.label}…`}
          disabled={disabled}
          className={className}
        />
      )
    }

    case "Link": {
      const doctype = field.options ?? ""
      return (
        <FrappeLinkSelect
          doctype={doctype}
          label={field.label ?? doctype}
          value={str}
          onChange={onChange}
          disabled={disabled}
        />
      )
    }

    case "Dynamic Link": {
      const doctype = linkedDoctype ?? field.options ?? ""
      return (
        <FrappeLinkSelect
          doctype={doctype}
          label={field.label ?? doctype}
          value={str}
          onChange={onChange}
          disabled={disabled || !doctype}
        />
      )
    }

    // ── Text ──────────────────────────────────────────────────────────────────
    case "Data":
    case "Autocomplete":
    case "Barcode":
      return (
        <Input
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={className}
          placeholder={field.label}
        />
      )

    case "Phone":
      return (
        <Input
          type="tel"
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={className}
          placeholder={field.label}
        />
      )

    case "Small Text":
      return (
        <Textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={2}
          className={cn("resize-y", className)}
          placeholder={field.label}
        />
      )

    case "Text":
    case "Long Text":
      return (
        <Textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={4}
          className={cn("resize-y", className)}
          placeholder={field.label}
        />
      )

    case "Text Editor":
    case "Markdown Editor":
    case "HTML Editor":
    case "Code":
      return (
        <Textarea
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={6}
          className={cn("resize-y font-mono text-sm", className)}
          placeholder={field.label}
          spellCheck={false}
        />
      )

    // ── Specialised ───────────────────────────────────────────────────────────
    case "Password":
      return (
        <PasswordInput
          value={str}
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      )

    case "Color":
      return <ColorInput value={str} onChange={onChange} disabled={disabled} />

    case "Attach":
    case "Attach Image":
    case "Image": {
      return (
        <div className={cn("flex gap-2", className)}>
          <Input
            value={str}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="File URL or path"
            className="flex-1"
          />
          <Label
            className={cn(
              "flex h-9 cursor-pointer items-center rounded-md border border-input",
              "bg-background px-3 text-sm transition-colors hover:bg-muted",
              disabled && "pointer-events-none opacity-50"
            )}
          >
            Browse
            <input
              type="file"
              className="sr-only"
              accept={field.fieldtype !== "Attach" ? "image/*" : undefined}
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onChange(URL.createObjectURL(file))
              }}
            />
          </Label>
        </div>
      )
    }

    case "Signature":
      return (
        <div
          className={cn(
            "rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground",
            className
          )}
        >
          Signature pad not yet implemented
        </div>
      )

    // ── Child tables ──────────────────────────────────────────────────────────
    case "Table":
      return (
        <ChildTableField
          field={field}
          value={
            Array.isArray(value) ? (value as Record<string, unknown>[]) : []
          }
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      )

    case "Table MultiSelect":
      // Render as a read-only tag list (full editing requires a dedicated
      // multi-select combobox — use columnOverrides to customise)
      return (
        <ChildTableField
          field={field}
          value={
            Array.isArray(value) ? (value as Record<string, unknown>[]) : []
          }
          onChange={onChange}
          disabled={disabled}
          className={className}
        />
      )

    default:
      return (
        <Input
          value={str}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={className}
          placeholder={field.label}
        />
      )
  }
}
