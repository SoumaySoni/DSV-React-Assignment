export type FieldType = "text" | "email" | "tel";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
}
