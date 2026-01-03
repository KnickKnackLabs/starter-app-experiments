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
  /** For array ports, the type of items in the array */
  itemType?: PortType;
}

/**
 * Describes the expected signature of a node that can fill a slot.
 * Think of it as a function type: (inputs) => outputs
 */
export interface NodeSignature {
  inputs: Port[];
  outputs: Port[];
}

/**
 * A slot is a "hole" in a node that accepts another node as an argument.
 * Unlike ports (which connect data), slots enable node composition.
 */
export interface NodeSlot {
  id: string;
  label: string;
  /** The signature that any node filling this slot must match */
  accepts: NodeSignature;
  /** ID of the node currently filling this slot (if any) */
  filledBy?: string;
}

/** Data stored in a blackbox node */
export interface BlackboxNodeData {
  label: string;
  inputs: Port[];
  outputs: Port[];
  /** Slots that accept other nodes as arguments */
  slots?: NodeSlot[];
}

/**
 * Check if a node's signature is compatible with a slot's requirements.
 * Compatible means the node can process the slot's expected inputs
 * and produce the slot's expected outputs.
 */
export function canFillSlot(
  slotAccepts: NodeSignature,
  nodeInputs: Port[],
  nodeOutputs: Port[]
): boolean {
  // Check that node can accept all required inputs
  for (const required of slotAccepts.inputs) {
    const matching = nodeInputs.find(
      (p) =>
        p.type === required.type || p.type === "any" || required.type === "any"
    );
    if (!matching) return false;
  }

  // Check that node produces all required outputs
  for (const required of slotAccepts.outputs) {
    const matching = nodeOutputs.find(
      (p) =>
        p.type === required.type || p.type === "any" || required.type === "any"
    );
    if (!matching) return false;
  }

  return true;
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
