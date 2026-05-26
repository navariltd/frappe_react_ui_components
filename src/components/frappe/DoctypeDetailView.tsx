import { useMemo, useState } from "react"
import { Loader2 } from "lucide-react"
import { useFrappeGetDoc } from "frappe-react-sdk"
import { cn } from "@/lib/utils"
import type { DocField } from "../../types/frappe"
import { useDoctypeMeta } from "../../hooks/useDoctypeMeta"
import { parseDocTypeLayout } from "../../hooks/useDocument"
import type { LayoutTab } from "../../hooks/useDocument"
import { DoctypeField } from "./DoctypeField"
import { StatusBadge } from "./StatusBadge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Separator } from "../ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { ChevronDown } from "lucide-react"
import { Badge } from "../ui/badge"

function DetailField({ field, value }: { field: DocField; value: unknown }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      <span className="truncate text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {field.label ?? field.fieldname}
      </span>
      <div className="min-w-0 text-sm">
        <DoctypeField field={field} value={value} />
      </div>
    </div>
  )
}

function DetailSection({
  tab,
  doc,
}: {
  tab: LayoutTab
  doc: Record<string, unknown>
}) {
  return (
    <div className="space-y-6">
      {tab.sections.map((section, sIdx) => {
        const hasFields = section.columns.some((c) => c.fields.length > 0)
        if (!hasFields) return null

        const content = (
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {section.columns.map((col, cIdx) => (
              <div key={cIdx} className="space-y-4">
                {col.fields.map((field) => (
                  <DetailField
                    key={field.fieldname}
                    field={field}
                    value={doc[field.fieldname]}
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

export interface DoctypeDetailViewProps {
  doctype: string
  name: string
  /** Fields to hide by fieldname. */
  hiddenFields?: string[]
  /** Extra className on the container. */
  className?: string
  /** Show the document name + status header. Default: true. */
  showHeader?: boolean
}

/**
 * Read-only view of a single Frappe document.
 *
 * - Fetches metadata via useDoctypeMeta
 * - Fetches the document via useFrappeGetDoc
 * - Renders fields in the DocType's section / tab layout
 * - Highlights the status field (if present) in the header
 *
 * Must be wrapped in <FrappeProvider>.
 */
export function DoctypeDetailView({
  doctype,
  name,
  hiddenFields = [],
  className,
  showHeader = true,
}: DoctypeDetailViewProps) {
  const { meta, isLoading: metaLoading } = useDoctypeMeta(doctype)
  const { data: doc, isLoading: docLoading } = useFrappeGetDoc<
    Record<string, unknown>
  >(doctype, name)

  const [activeTab, setActiveTab] = useState<string | undefined>()

  const hiddenSet = useMemo(() => new Set(hiddenFields), [hiddenFields])

  const layout = useMemo(() => {
    if (!meta) return null
    const visible = meta.fields.filter(
      (f: DocField) =>
        !hiddenSet.has(f.fieldname) &&
        f.fieldname !== "status" &&
        f.fieldname !== "workflow_state"
    )
    return parseDocTypeLayout(visible)
  }, [meta, hiddenSet])

  const statusValue = doc
    ? String(doc["status"] ?? doc["workflow_state"] ?? "")
    : ""

  const currentTab = activeTab ?? layout?.tabs[0]?.label

  if (metaLoading || docLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading {doctype} {name}…
      </div>
    )
  }

  if (!layout || !doc) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Could not load {doctype} {name}.
      </div>
    )
  }

  const hasTabs = layout.tabs.length > 1
  const docRecord = doc as Record<string, unknown>

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {doctype}
            </p>
            <h2 className="mt-0.5 truncate text-lg font-semibold">{name}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-1">
            {statusValue && <StatusBadge value={statusValue} />}
            {Number(docRecord["docstatus"]) === 1 && (
              <Badge variant="secondary" className="text-xs">
                Submitted
              </Badge>
            )}
            {Number(docRecord["docstatus"]) === 2 && (
              <Badge variant="destructive" className="text-xs">
                Cancelled
              </Badge>
            )}
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
              <DetailSection tab={tab} doc={docRecord} />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <DetailSection tab={layout.tabs[0]} doc={docRecord} />
      )}
    </div>
  )
}
