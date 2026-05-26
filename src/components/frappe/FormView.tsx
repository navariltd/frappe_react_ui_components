import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AlertCircle, Loader2, Save, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocField } from "../../types/frappe"
import { useDoctypeMeta } from "../../hooks/useDoctypeMeta"
import { useDocument, parseDocTypeLayout } from "../../hooks/useDocument"
import { useDocumentDefaults } from "../../hooks/useDocumentDefaults"
import type { LayoutTab } from "../../hooks/useDocument"
import { DoctypeFormField } from "./DoctypeFormField"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Separator } from "../ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { ChevronDown } from "lucide-react"

// ── Field with label ──────────────────────────────────────────────────────────

function FormField({
  field,
  value,
  onChange,
  disabled,
  error,
}: {
  field: DocField
  value: unknown
  onChange: (v: unknown) => void
  disabled?: boolean
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm leading-none font-medium">
        {field.label ?? field.fieldname}
        {field.reqd === 1 && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {field.description && (
        <p className="text-xs text-muted-foreground">{field.description}</p>
      )}
      <DoctypeFormField
        field={field}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={cn(error && "border-destructive ring-1 ring-destructive/20")}
      />
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Section renderer ──────────────────────────────────────────────────────────

function FormSection({
  tab,
  doc,
  errors,
  onFieldChange,
  disabled,
}: {
  tab: LayoutTab
  doc: Record<string, unknown>
  errors: Record<string, string>
  onFieldChange: (fieldname: string, value: unknown) => void
  disabled?: boolean
}) {
  return (
    <div className="space-y-6">
      {tab.sections.map((section, sIdx) => {
        const hasFields = section.columns.some((c) => c.fields.length > 0)
        if (!hasFields) return null

        const content = (
          <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {section.columns.map((col, cIdx) => (
              <div key={cIdx} className="space-y-4">
                {col.fields.map((field) => (
                  <FormField
                    key={field.fieldname}
                    field={field}
                    value={doc[field.fieldname]}
                    onChange={(v) => onFieldChange(field.fieldname, v)}
                    disabled={disabled}
                    error={errors[field.fieldname]}
                  />
                ))}
              </div>
            ))}
          </div>
        )

        if (section.collapsible) {
          return (
            <Collapsible key={sIdx} defaultOpen>
              {section.label && (
                <CollapsibleTrigger className="flex w-full items-center justify-between py-1 text-sm font-semibold text-muted-foreground hover:text-foreground [&[data-state=open]>svg]:rotate-180">
                  {section.label}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
                </CollapsibleTrigger>
              )}
              {section.label && <Separator className="my-2" />}
              <CollapsibleContent className="pt-2">
                {content}
              </CollapsibleContent>
            </Collapsible>
          )
        }

        return (
          <div key={sIdx} className="space-y-3">
            {section.label && (
              <>
                <h4 className="text-sm font-semibold text-muted-foreground">
                  {section.label}
                </h4>
                <Separator />
              </>
            )}
            {content}
          </div>
        )
      })}
    </div>
  )
}

// ── FormView ──────────────────────────────────────────────────────────────────

export interface FormViewProps {
  doctype: string
  /** Omit for new document creation. */
  name?: string
  /** Read-only mode — shows fields but disables editing. */
  readOnly?: boolean
  /** Called with the saved document name after a successful save. */
  onSave?: (name: string) => void
  /** Called when the user clicks Cancel / Reset. */
  onCancel?: () => void
  /** Fields to exclude from the form by fieldname. */
  hiddenFields?: string[]
  /** Extra className on the container. */
  className?: string
  /** Whether to show the Save / Reset toolbar. Default: true. */
  showToolbar?: boolean
  /**
   * Pre-fill specific fields for new documents.
   */
  defaults?: Record<string, unknown>
}

/**
 * A full document form driven by Frappe DocType metadata.
 *
 * - Fetches metadata via useDoctypeMeta
 * - Fetches document data (edit mode) via useDocument
 * - Renders fields organised into tabs / sections / columns
 * - Validates required fields
 * - Saves via useFrappeCreateDoc / useFrappeUpdateDoc
 *
 * Must be wrapped in <FrappeProvider>.
 */
export function FormView({
  doctype,
  name,
  readOnly = false,
  onSave,
  onCancel,
  hiddenFields = [],
  className,
  showToolbar = true,
  defaults = {},
}: FormViewProps) {
  const { meta, isLoading: metaLoading } = useDoctypeMeta(doctype)
  const {
    doc,
    isLoading,
    isSaving,
    isDirty,
    errors,
    setField,
    save,
    reset,
    isNew,
  } = useDocument(doctype, name, { onSuccess: onSave }, meta)

  // Fetch Frappe defaults: Global Defaults + field.default keywords + caller overrides.
  const { defaults: resolvedDefaults } = useDocumentDefaults(meta, defaults)

  const [activeTab, setActiveTab] = useState<string | undefined>()

  // Seed defaults once when meta loads for new docs.
  const defaultsSeeded = useRef(false)
  useEffect(() => {
    if (!isNew || !meta || defaultsSeeded.current) return
    Object.entries(resolvedDefaults).forEach(([k, v]) => setField(k, v))
    defaultsSeeded.current = true
  }, [meta, resolvedDefaults]) // eslint-disable-line react-hooks/exhaustive-deps

  // Wrap reset so new-doc defaults are reapplied after clearing edits.
  const handleReset = useCallback(() => {
    reset()
    if (isNew) {
      Object.entries(resolvedDefaults).forEach(([k, v]) => setField(k, v))
    }
  }, [reset, isNew, resolvedDefaults, setField])

  const hiddenSet = useMemo(() => new Set(hiddenFields), [hiddenFields])

  const layout = useMemo(() => {
    if (!meta) return null
    const visibleFields = meta.fields.filter(
      (f: DocField) => !hiddenSet.has(f.fieldname)
    )
    return parseDocTypeLayout(visibleFields)
  }, [meta, hiddenSet])

  const currentTab = activeTab ?? layout?.tabs[0]?.label

  if (metaLoading || isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading {doctype}…
      </div>
    )
  }

  if (!layout || !meta) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Could not load metadata for {doctype}.
      </div>
    )
  }

  const hasTabs = layout.tabs.length > 1

  const renderTabContent = (tab: (typeof layout.tabs)[number]) => (
    <FormSection
      tab={tab}
      doc={doc}
      errors={errors}
      onFieldChange={setField}
      disabled={readOnly}
    />
  )

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {showToolbar && !readOnly && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isDirty && (
              <span className="text-xs text-muted-foreground">
                Unsaved changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {(isDirty || onCancel) && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  handleReset()
                  onCancel?.()
                }}
                disabled={isSaving}
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                {onCancel ? "Cancel" : "Reset"}
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={() => save(meta)}
              disabled={isSaving || !isDirty}
            >
              {isSaving ? (
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="mr-1.5 h-3.5 w-3.5" />
              )}
              {name ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      )}

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-medium">Please fix the following errors:</p>
            <ul className="mt-1 list-disc pl-4 text-xs">
              {Object.values(errors).map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Fields */}
      {hasTabs ? (
        <Tabs value={currentTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            {layout.tabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.label}>
                {tab.label || "Details"}
              </TabsTrigger>
            ))}
          </TabsList>
          {layout.tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label}>
              {renderTabContent(tab)}
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        renderTabContent(layout.tabs[0])
      )}
    </div>
  )
}
