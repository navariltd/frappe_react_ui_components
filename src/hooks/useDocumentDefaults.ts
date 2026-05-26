import { useMemo } from "react"
import { useFrappeGetDoc, useFrappeAuth } from "frappe-react-sdk"
import type { DocMeta } from "../types/frappe"
import { buildFieldDefaults } from "./useDocument"

/**
 * Returns a merged defaults map for a new Frappe document, combining three
 * layers in ascending priority order (last wins):
 *
 *  1. Global Defaults (fetched from the "Global Defaults" singleton) —
 *     matches what Frappe stores in `frappe.boot.defaults` (company,
 *     currency, etc.).  Fields named "default_*" are mapped to their
 *     un-prefixed counterparts so `default_company` → `company`.
 *
 *  2. Field-level defaults from DocType metadata (`field.default`), resolved
 *     with the same keyword handling Frappe's JS client uses:
 *     "Today", "Now", "__user", "__current_user_full_name".
 *
 *  3. Caller-provided `overrides` — explicit values passed by the component
 *     consumer (e.g. `defaults` prop on QuickEntryModal / FormView).
 *
 * This mirrors `frappe.model.get_default_value` + `frappe.defaults.get_default`
 * as documented in Frappe's form lifecycle.
 */
export function useDocumentDefaults(
  meta: DocMeta | null | undefined,
  overrides: Record<string, unknown> = {},
): { defaults: Record<string, unknown>; isLoading: boolean } {
  // Session user info — needed to resolve __user / __current_user_full_name
  const { currentUser } = useFrappeAuth()

  // Frappe stores system-wide defaults in the "Global Defaults" singleton.
  // Fields are named "default_company", "default_currency", etc.; we strip
  // the "default_" prefix so they match form field names.
  const { data: globalDoc, isLoading: globalLoading } = useFrappeGetDoc<
    Record<string, unknown>
  >("Global Defaults", "Global Defaults")

  const defaults = useMemo<Record<string, unknown>>(() => {
    // ── Layer 1: Global Defaults (lowest priority) ──────────────────────────
    const systemDefaults: Record<string, unknown> = {}
    if (globalDoc) {
      for (const [key, value] of Object.entries(globalDoc)) {
        if (!value && value !== 0) continue
        if (key.startsWith("default_")) {
          // "default_company" → "company"
          systemDefaults[key.slice("default_".length)] = value
        }
      }
    }

    // ── Layer 2: Field-level defaults from DocType meta ─────────────────────
    const fieldDefaults = meta
      ? buildFieldDefaults(meta.fields, currentUser ?? undefined)
      : {}

    // ── Layer 3: Caller overrides (highest priority) ────────────────────────
    return { ...systemDefaults, ...fieldDefaults, ...overrides }
  }, [meta, globalDoc, currentUser, overrides])

  return { defaults, isLoading: globalLoading }
}
