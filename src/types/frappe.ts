export type FieldType =
  | "Autocomplete"
  | "Attach"
  | "Attach Image"
  | "Barcode"
  | "Button"
  | "Check"
  | "Code"
  | "Color"
  | "Column Break"
  | "Currency"
  | "Data"
  | "Date"
  | "Datetime"
  | "Duration"
  | "Dynamic Link"
  | "Float"
  | "Fold"
  | "Geolocation"
  | "Heading"
  | "HTML"
  | "HTML Editor"
  | "Image"
  | "Int"
  | "JSON"
  | "Link"
  | "Long Text"
  | "Markdown Editor"
  | "Password"
  | "Percent"
  | "Phone"
  | "Rating"
  | "Read Only"
  | "Section Break"
  | "Select"
  | "Signature"
  | "Small Text"
  | "Tab Break"
  | "Table"
  | "Table MultiSelect"
  | "Text"
  | "Text Editor"
  | "Time"
  | (string & {})

export interface DocField {
  fieldname: string
  fieldtype: FieldType
  label: string
  /** For Select: newline-separated options. For Link: the linked DocType. For Table: the child DocType. */
  options?: string
  reqd?: 0 | 1
  in_list_view?: 0 | 1
  in_standard_filter?: 0 | 1
  in_global_search?: 0 | 1
  hidden?: 0 | 1
  read_only?: 0 | 1
  bold?: 0 | 1
  search_index?: 0 | 1
  no_copy?: 0 | 1
  allow_bulk_edit?: 0 | 1
  allow_in_quick_entry?: 0 | 1
  collapsible?: 0 | 1
  description?: string
  default?: string
  precision?: string
  length?: number
  idx?: number
  depends_on?: string
  mandatory_depends_on?: string
  read_only_depends_on?: string
  fetch_from?: string
  fetch_if_empty?: 0 | 1
}

export interface DocPerm {
  role: string
  read?: 0 | 1
  write?: 0 | 1
  create?: 0 | 1
  delete?: 0 | 1
  submit?: 0 | 1
  cancel?: 0 | 1
  amend?: 0 | 1
}

export interface DocMeta {
  name: string
  module?: string
  description?: string
  fields: DocField[]
  permissions?: DocPerm[]
  is_submittable?: 0 | 1
  issingle?: 0 | 1
  istable?: 0 | 1
  title_field?: string
  search_fields?: string
  sort_field?: string
  sort_order?: "ASC" | "DESC"
  autoname?: string
}

/** Frappe filter tuple: [fieldname, operator, value] */
export type FrappeFilter =
  | [
      string,
      "=" | "!=" | ">" | ">=" | "<" | "<=" | "like" | "not like",
      string | number,
    ]
  | [string, "in" | "not in" | "between", (string | number)[]]
