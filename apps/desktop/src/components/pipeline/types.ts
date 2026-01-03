/** Supported data types for pipeline ports */
export type PortType =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "array"
  | "any";

/** Port definition for node inputs/outputs */
export interface Port {
  id: string;
  label: string;
  type: PortType;
}

/** Data stored in a blackbox node */
export interface BlackboxNodeData {
  label: string;
  inputs: Port[];
  outputs: Port[];
}

/** Color mapping for port types */
export const portTypeColors: Record<PortType, string> = {
  string: "#22c55e", // green
  number: "#3b82f6", // blue
  boolean: "#f59e0b", // amber
  object: "#8b5cf6", // purple
  array: "#ec4899", // pink
  any: "#6b7280", // gray
};
