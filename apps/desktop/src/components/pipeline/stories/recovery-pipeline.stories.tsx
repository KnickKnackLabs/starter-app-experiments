import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Background,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AINode, type AINodeData } from "../ai-node";

const nodeTypes = { ai: AINode };

type RecoveryStoryArgs = {
  nodes: Node<AINodeData>[];
  edges: Edge[];
};

const meta: Meta<RecoveryStoryArgs> = {
  title: "Pipeline/Recovery",
  parameters: { layout: "fullscreen" },
  decorators: [
    (_, { args }) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlowProvider>
          <ReactFlow
            className="bg-muted"
            edges={args.edges}
            fitView
            fitViewOptions={{ maxZoom: 1, padding: 0.2 }}
            nodes={args.nodes}
            nodeTypes={nodeTypes}
            snapGrid={[8, 8]}
            snapToGrid
          >
            <Background className="!bg-muted" gap={16} size={1} />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<RecoveryStoryArgs>;

// ============================================================================
// THE LOOP - Understanding the cycle
// ============================================================================

const loopNodes: Node<AINodeData>[] = [
  {
    id: "trigger",
    type: "ai",
    position: { x: 50, y: 200 },
    data: {
      label: "Trigger",
      subtitle: "Something happens",
      category: "data",
      icon: "⚡",
      inputs: [{ id: "feedback", label: "cycle continues", type: "any" }],
      outputs: [{ id: "event", label: "event", type: "object" }],
      metadata: [
        { label: "types", value: "emotion, environment, physical, social" },
      ],
    },
  },
  {
    id: "craving",
    type: "ai",
    position: { x: 300, y: 200 },
    data: {
      label: "Craving",
      subtitle: "The urge builds",
      category: "transform",
      icon: "🌊",
      inputs: [{ id: "trigger", label: "trigger", type: "object" }],
      outputs: [{ id: "urge", label: "urge", type: "object" }],
      metadata: [
        { label: "intensity", value: "1-10" },
        { label: "duration", value: "~20 min peak" },
      ],
    },
  },
  {
    id: "decision",
    type: "ai",
    position: { x: 550, y: 200 },
    data: {
      label: "Decision Point",
      subtitle: "The critical moment",
      category: "control",
      icon: "⚖️",
      inputs: [{ id: "urge", label: "urge", type: "object" }],
      outputs: [
        { id: "use", label: "use", type: "boolean" },
        { id: "resist", label: "resist", type: "boolean" },
      ],
    },
  },
  {
    id: "use",
    type: "ai",
    position: { x: 800, y: 100 },
    data: {
      label: "Use",
      subtitle: "The behavior",
      category: "output",
      icon: "💊",
      status: "error",
      inputs: [{ id: "decision", label: "decision", type: "boolean" }],
      outputs: [{ id: "aftermath", label: "aftermath", type: "object" }],
    },
  },
  {
    id: "aftermath",
    type: "ai",
    position: { x: 1050, y: 100 },
    data: {
      label: "Aftermath",
      subtitle: "Shame, guilt, consequences",
      category: "data",
      icon: "🌑",
      inputs: [{ id: "use", label: "use", type: "object" }],
      outputs: [{ id: "state", label: "state", type: "object" }],
      metadata: [
        { label: "physical", value: "hangover, withdrawal" },
        { label: "emotional", value: "shame, regret" },
        { label: "social", value: "damage, isolation" },
      ],
    },
  },
  {
    id: "back-to-trigger",
    type: "ai",
    position: { x: 1050, y: 300 },
    data: {
      label: "New Trigger",
      subtitle: "The cycle feeds itself",
      category: "transform",
      icon: "🔄",
      inputs: [{ id: "aftermath", label: "aftermath", type: "object" }],
      outputs: [{ id: "trigger", label: "trigger", type: "any" }],
    },
  },
];

const loopEdges: Edge[] = [
  {
    id: "e1",
    source: "trigger",
    sourceHandle: "event",
    target: "craving",
    targetHandle: "trigger",
  },
  {
    id: "e2",
    source: "craving",
    sourceHandle: "urge",
    target: "decision",
    targetHandle: "urge",
  },
  {
    id: "e3",
    source: "decision",
    sourceHandle: "use",
    target: "use",
    targetHandle: "decision",
  },
  {
    id: "e4",
    source: "use",
    sourceHandle: "aftermath",
    target: "aftermath",
    targetHandle: "use",
  },
  {
    id: "e5",
    source: "aftermath",
    sourceHandle: "state",
    target: "back-to-trigger",
    targetHandle: "aftermath",
  },
  {
    id: "e6",
    source: "back-to-trigger",
    sourceHandle: "trigger",
    target: "trigger",
    targetHandle: "feedback",
    style: { strokeDasharray: "5,5" },
  },
];

export const TheLoop: Story = {
  args: {
    nodes: loopNodes,
    edges: loopEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The addiction cycle: Trigger → Craving → Decision → Use → Aftermath → back to Trigger. Understanding the loop is the first step to breaking it.",
      },
    },
  },
};

// ============================================================================
// TRIGGER CLASSIFICATION - Understanding what sets it off
// ============================================================================

const triggerNodes: Node<AINodeData>[] = [
  {
    id: "emotional",
    type: "ai",
    position: { x: 50, y: 50 },
    data: {
      label: "Emotional",
      subtitle: "Feelings that trigger",
      category: "data",
      icon: "💔",
      inputs: [],
      outputs: [{ id: "trigger", label: "trigger", type: "object" }],
      metadata: [
        { label: "stress", value: "work, money, relationships" },
        { label: "boredom", value: "emptiness, lack of purpose" },
        { label: "anxiety", value: "worry, fear, overwhelm" },
        { label: "loneliness", value: "isolation, disconnection" },
      ],
    },
  },
  {
    id: "environmental",
    type: "ai",
    position: { x: 50, y: 280 },
    data: {
      label: "Environmental",
      subtitle: "Places & contexts",
      category: "data",
      icon: "📍",
      inputs: [],
      outputs: [{ id: "trigger", label: "trigger", type: "object" }],
      metadata: [
        { label: "locations", value: "bars, dealers, old haunts" },
        { label: "times", value: "Friday night, payday" },
        { label: "people", value: "using friends, enablers" },
      ],
    },
  },
  {
    id: "physical",
    type: "ai",
    position: { x: 50, y: 480 },
    data: {
      label: "Physical",
      subtitle: "Body states",
      category: "data",
      icon: "🫀",
      inputs: [],
      outputs: [{ id: "trigger", label: "trigger", type: "object" }],
      metadata: [
        { label: "HALT", value: "Hungry, Angry, Lonely, Tired" },
        { label: "pain", value: "chronic, acute" },
        { label: "withdrawal", value: "physical dependence" },
      ],
    },
  },
  {
    id: "social",
    type: "ai",
    position: { x: 50, y: 680 },
    data: {
      label: "Social",
      subtitle: "Relationship dynamics",
      category: "data",
      icon: "👥",
      inputs: [],
      outputs: [{ id: "trigger", label: "trigger", type: "object" }],
      metadata: [
        { label: "conflict", value: "arguments, rejection" },
        { label: "pressure", value: "peer, social expectations" },
        { label: "celebration", value: "parties, 'rewards'" },
      ],
    },
  },
  {
    id: "classifier",
    type: "ai",
    position: { x: 350, y: 300 },
    data: {
      label: "Trigger Classifier",
      subtitle: "What kind is this?",
      category: "model",
      icon: "🔍",
      model: "Self-Awareness",
      inputs: [
        { id: "emotional", label: "emotional", type: "object" },
        { id: "environmental", label: "environmental", type: "object" },
        { id: "physical", label: "physical", type: "object" },
        { id: "social", label: "social", type: "object" },
      ],
      outputs: [
        { id: "classified", label: "classified", type: "object" },
        { id: "intensity", label: "intensity", type: "number" },
      ],
      metadata: [{ label: "question", value: "What am I really feeling?" }],
    },
  },
  {
    id: "router",
    type: "ai",
    position: { x: 650, y: 300 },
    data: {
      label: "Response Router",
      subtitle: "Match trigger to intervention",
      category: "control",
      icon: "🔀",
      inputs: [
        { id: "trigger", label: "classified", type: "object" },
        { id: "intensity", label: "intensity", type: "number" },
      ],
      outputs: [
        { id: "immediate", label: "immediate", type: "object" },
        { id: "short-term", label: "short-term", type: "object" },
        { id: "support", label: "need support", type: "object" },
      ],
    },
  },
];

const triggerEdges: Edge[] = [
  {
    id: "e1",
    source: "emotional",
    sourceHandle: "trigger",
    target: "classifier",
    targetHandle: "emotional",
  },
  {
    id: "e2",
    source: "environmental",
    sourceHandle: "trigger",
    target: "classifier",
    targetHandle: "environmental",
  },
  {
    id: "e3",
    source: "physical",
    sourceHandle: "trigger",
    target: "classifier",
    targetHandle: "physical",
  },
  {
    id: "e4",
    source: "social",
    sourceHandle: "trigger",
    target: "classifier",
    targetHandle: "social",
  },
  {
    id: "e5",
    source: "classifier",
    sourceHandle: "classified",
    target: "router",
    targetHandle: "trigger",
  },
  {
    id: "e6",
    source: "classifier",
    sourceHandle: "intensity",
    target: "router",
    targetHandle: "intensity",
  },
];

export const TriggerClassification: Story = {
  args: {
    nodes: triggerNodes,
    edges: triggerEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Classify triggers by type (emotional, environmental, physical, social) and intensity. Different triggers need different responses.",
      },
    },
  },
};

// ============================================================================
// INTERVENTION TOOLKIT - What to do instead
// ============================================================================

const interventionNodes: Node<AINodeData>[] = [
  {
    id: "urge",
    type: "ai",
    position: { x: 50, y: 250 },
    data: {
      label: "Urge Detected",
      subtitle: "Craving is happening",
      category: "data",
      icon: "🚨",
      status: "running",
      inputs: [],
      outputs: [
        { id: "urge", label: "urge", type: "object" },
        { id: "intensity", label: "intensity", type: "number" },
      ],
      metadata: [
        { label: "intensity", value: "7/10" },
        { label: "type", value: "emotional" },
      ],
    },
  },
  {
    id: "assess",
    type: "ai",
    position: { x: 300, y: 250 },
    data: {
      label: "Quick Assessment",
      subtitle: "HALT check",
      category: "model",
      icon: "🤔",
      model: "Self-Check",
      inputs: [{ id: "urge", label: "urge", type: "object" }],
      outputs: [{ id: "needs", label: "needs", type: "object" }],
      metadata: [
        { label: "Hungry?", value: "→ eat something" },
        { label: "Angry?", value: "→ process it" },
        { label: "Lonely?", value: "→ connect" },
        { label: "Tired?", value: "→ rest" },
      ],
    },
  },
  {
    id: "immediate",
    type: "ai",
    position: { x: 550, y: 50 },
    data: {
      label: "Immediate Actions",
      subtitle: "Do right now",
      category: "transform",
      icon: "⚡",
      inputs: [{ id: "needs", label: "needs", type: "object" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "breathe", value: "4-7-8 breathing" },
        { label: "move", value: "walk, stretch, cold water" },
        { label: "delay", value: "wait 20 min, urge will pass" },
        { label: "distract", value: "call someone, go outside" },
      ],
    },
  },
  {
    id: "grounding",
    type: "ai",
    position: { x: 550, y: 250 },
    data: {
      label: "Grounding",
      subtitle: "Get present",
      category: "transform",
      icon: "🌳",
      inputs: [{ id: "needs", label: "needs", type: "object" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "5-4-3-2-1", value: "senses exercise" },
        { label: "cold", value: "ice, cold shower" },
        { label: "physical", value: "feet on ground" },
      ],
    },
  },
  {
    id: "connection",
    type: "ai",
    position: { x: 550, y: 450 },
    data: {
      label: "Connection",
      subtitle: "Reach out",
      category: "output",
      icon: "📞",
      inputs: [{ id: "needs", label: "needs", type: "object" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "sponsor", value: "call them" },
        { label: "friend", value: "honest conversation" },
        { label: "meeting", value: "go to one" },
        { label: "hotline", value: "SAMHSA 1-800-662-4357" },
      ],
    },
  },
  {
    id: "result",
    type: "ai",
    position: { x: 850, y: 250 },
    data: {
      label: "Urge Surfed",
      subtitle: "You made it through",
      category: "output",
      icon: "🏄",
      status: "success",
      inputs: [
        { id: "immediate", label: "immediate", type: "string" },
        { id: "grounding", label: "grounding", type: "string" },
        { id: "connection", label: "connection", type: "string" },
      ],
      outputs: [{ id: "log", label: "log", type: "object" }],
      metadata: [
        { label: "record", value: "what worked" },
        { label: "celebrate", value: "small win" },
      ],
    },
  },
];

const interventionEdges: Edge[] = [
  {
    id: "e1",
    source: "urge",
    sourceHandle: "urge",
    target: "assess",
    targetHandle: "urge",
  },
  {
    id: "e2",
    source: "assess",
    sourceHandle: "needs",
    target: "immediate",
    targetHandle: "needs",
  },
  {
    id: "e3",
    source: "assess",
    sourceHandle: "needs",
    target: "grounding",
    targetHandle: "needs",
  },
  {
    id: "e4",
    source: "assess",
    sourceHandle: "needs",
    target: "connection",
    targetHandle: "needs",
  },
  {
    id: "e5",
    source: "immediate",
    sourceHandle: "action",
    target: "result",
    targetHandle: "immediate",
  },
  {
    id: "e6",
    source: "grounding",
    sourceHandle: "action",
    target: "result",
    targetHandle: "grounding",
  },
  {
    id: "e7",
    source: "connection",
    sourceHandle: "action",
    target: "result",
    targetHandle: "connection",
  },
];

export const InterventionToolkit: Story = {
  args: {
    nodes: interventionNodes,
    edges: interventionEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "When an urge hits: assess needs (HALT), then apply interventions - immediate actions, grounding techniques, or human connection. Urges pass if you surf them.",
      },
    },
  },
};

// ============================================================================
// SUPPORT NETWORK - Who to call when
// ============================================================================

const supportNodes: Node<AINodeData>[] = [
  {
    id: "crisis-level",
    type: "ai",
    position: { x: 50, y: 200 },
    data: {
      label: "Crisis Level",
      subtitle: "How serious is this?",
      category: "control",
      icon: "🎚️",
      inputs: [],
      outputs: [
        { id: "green", label: "manageable", type: "boolean" },
        { id: "yellow", label: "struggling", type: "boolean" },
        { id: "red", label: "crisis", type: "boolean" },
      ],
      metadata: [
        { label: "green", value: "I can handle this" },
        { label: "yellow", value: "I need support" },
        { label: "red", value: "I'm about to use" },
      ],
    },
  },
  {
    id: "self-care",
    type: "ai",
    position: { x: 350, y: 50 },
    data: {
      label: "Self-Care",
      subtitle: "Green zone",
      category: "transform",
      icon: "🧘",
      status: "success",
      inputs: [{ id: "level", label: "level", type: "boolean" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "journal", value: "write it out" },
        { label: "exercise", value: "move your body" },
        { label: "routine", value: "stick to plan" },
      ],
    },
  },
  {
    id: "inner-circle",
    type: "ai",
    position: { x: 350, y: 200 },
    data: {
      label: "Inner Circle",
      subtitle: "Yellow zone - trusted people",
      category: "output",
      icon: "💛",
      status: "running",
      inputs: [{ id: "level", label: "level", type: "boolean" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "sponsor", value: "[Name] - [Number]" },
        { label: "therapist", value: "[Name] - [Number]" },
        { label: "friend", value: "[Name] - [Number]" },
      ],
    },
  },
  {
    id: "emergency",
    type: "ai",
    position: { x: 350, y: 380 },
    data: {
      label: "Emergency",
      subtitle: "Red zone - get help now",
      category: "output",
      icon: "🚨",
      status: "error",
      inputs: [{ id: "level", label: "level", type: "boolean" }],
      outputs: [{ id: "action", label: "action", type: "string" }],
      metadata: [
        { label: "SAMHSA", value: "1-800-662-4357" },
        { label: "Crisis Text", value: "Text HOME to 741741" },
        { label: "ER", value: "Go to emergency room" },
        { label: "911", value: "If life-threatening" },
      ],
    },
  },
  {
    id: "log",
    type: "ai",
    position: { x: 650, y: 200 },
    data: {
      label: "Log & Learn",
      subtitle: "Track patterns",
      category: "data",
      icon: "📊",
      inputs: [
        { id: "self", label: "self-care", type: "string" },
        { id: "support", label: "support", type: "string" },
        { id: "emergency", label: "emergency", type: "string" },
      ],
      outputs: [{ id: "pattern", label: "pattern", type: "object" }],
      metadata: [
        { label: "what triggered", value: "..." },
        { label: "what helped", value: "..." },
        { label: "next time", value: "..." },
      ],
    },
  },
];

const supportEdges: Edge[] = [
  {
    id: "e1",
    source: "crisis-level",
    sourceHandle: "green",
    target: "self-care",
    targetHandle: "level",
  },
  {
    id: "e2",
    source: "crisis-level",
    sourceHandle: "yellow",
    target: "inner-circle",
    targetHandle: "level",
  },
  {
    id: "e3",
    source: "crisis-level",
    sourceHandle: "red",
    target: "emergency",
    targetHandle: "level",
  },
  {
    id: "e4",
    source: "self-care",
    sourceHandle: "action",
    target: "log",
    targetHandle: "self",
  },
  {
    id: "e5",
    source: "inner-circle",
    sourceHandle: "action",
    target: "log",
    targetHandle: "support",
  },
  {
    id: "e6",
    source: "emergency",
    sourceHandle: "action",
    target: "log",
    targetHandle: "emergency",
  },
];

export const SupportNetwork: Story = {
  args: {
    nodes: supportNodes,
    edges: supportEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Escalation levels: Green (self-care), Yellow (call your people), Red (emergency resources). Know your numbers before you need them.",
      },
    },
  },
};

// ============================================================================
// DAILY CHECK-IN - Proactive monitoring
// ============================================================================

const checkInNodes: Node<AINodeData>[] = [
  {
    id: "morning",
    type: "ai",
    position: { x: 50, y: 150 },
    data: {
      label: "Morning Check",
      subtitle: "Start the day aware",
      category: "data",
      icon: "🌅",
      inputs: [],
      outputs: [{ id: "state", label: "state", type: "object" }],
      metadata: [
        { label: "sleep", value: "how'd you sleep?" },
        { label: "mood", value: "1-10 scale" },
        { label: "risks", value: "what's today's challenge?" },
      ],
    },
  },
  {
    id: "intention",
    type: "ai",
    position: { x: 300, y: 150 },
    data: {
      label: "Set Intention",
      subtitle: "What's the plan?",
      category: "prompt",
      icon: "🎯",
      inputs: [{ id: "state", label: "state", type: "object" }],
      outputs: [{ id: "plan", label: "plan", type: "object" }],
      metadata: [
        { label: "goal", value: "stay clean today" },
        { label: "avoid", value: "known triggers" },
        { label: "do", value: "one healthy thing" },
      ],
    },
  },
  {
    id: "midday",
    type: "ai",
    position: { x: 550, y: 50 },
    data: {
      label: "Midday Pulse",
      subtitle: "How's it going?",
      category: "transform",
      icon: "☀️",
      inputs: [{ id: "plan", label: "plan", type: "object" }],
      outputs: [{ id: "status", label: "status", type: "object" }],
      metadata: [
        { label: "on track?", value: "yes/no" },
        { label: "urges?", value: "any cravings?" },
        { label: "adjust", value: "need to change plan?" },
      ],
    },
  },
  {
    id: "evening",
    type: "ai",
    position: { x: 550, y: 250 },
    data: {
      label: "Evening Review",
      subtitle: "Reflect on the day",
      category: "transform",
      icon: "🌙",
      inputs: [{ id: "plan", label: "plan", type: "object" }],
      outputs: [{ id: "review", label: "review", type: "object" }],
      metadata: [
        { label: "wins", value: "what went well?" },
        { label: "struggles", value: "what was hard?" },
        { label: "grateful", value: "one thing" },
      ],
    },
  },
  {
    id: "log-day",
    type: "ai",
    position: { x: 800, y: 150 },
    data: {
      label: "Daily Log",
      subtitle: "Build the record",
      category: "output",
      icon: "📝",
      status: "success",
      inputs: [
        { id: "midday", label: "midday", type: "object" },
        { id: "evening", label: "evening", type: "object" },
      ],
      outputs: [{ id: "entry", label: "entry", type: "object" }],
      metadata: [
        { label: "streak", value: "Day N" },
        { label: "pattern", value: "seeing trends" },
      ],
    },
  },
];

const checkInEdges: Edge[] = [
  {
    id: "e1",
    source: "morning",
    sourceHandle: "state",
    target: "intention",
    targetHandle: "state",
  },
  {
    id: "e2",
    source: "intention",
    sourceHandle: "plan",
    target: "midday",
    targetHandle: "plan",
  },
  {
    id: "e3",
    source: "intention",
    sourceHandle: "plan",
    target: "evening",
    targetHandle: "plan",
  },
  {
    id: "e4",
    source: "midday",
    sourceHandle: "status",
    target: "log-day",
    targetHandle: "midday",
  },
  {
    id: "e5",
    source: "evening",
    sourceHandle: "review",
    target: "log-day",
    targetHandle: "evening",
  },
];

export const DailyCheckIn: Story = {
  args: {
    nodes: checkInNodes,
    edges: checkInEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Proactive daily structure: Morning intention-setting, midday pulse check, evening reflection. Awareness is the foundation of recovery.",
      },
    },
  },
};
