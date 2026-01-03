import type { StoryObj } from "@storybook/react-vite";
import type { Edge, Node } from "@xyflow/react";
import type { BlackboxNodeData } from "../types";
import { type PipelineStoryArgs, pipelineStoryMeta } from "./story-utils";

const meta = {
  ...pipelineStoryMeta,
  title: "Pipeline/Cooking",
};

export default meta;
type Story = StoryObj<PipelineStoryArgs>;

// ============================================================================
// MISE EN PLACE - Everything in its place
// Models the classic prep workflow where raw ingredients become ready-to-cook
// ============================================================================

const miseEnPlaceNodes: Node<BlackboxNodeData>[] = [
  // Raw ingredients
  {
    id: "garlic-raw",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "🧄 Garlic (6 cloves)",
      inputs: [],
      outputs: [{ id: "ingredient", label: "whole", type: "object" }],
    },
  },
  {
    id: "onion-raw",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "🧅 Onion (1 large)",
      inputs: [],
      outputs: [{ id: "ingredient", label: "whole", type: "object" }],
    },
  },
  {
    id: "tomatoes-raw",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "🍅 Tomatoes (4)",
      inputs: [],
      outputs: [{ id: "ingredient", label: "whole", type: "object" }],
    },
  },
  {
    id: "basil-raw",
    type: "blackbox",
    position: { x: 50, y: 350 },
    data: {
      label: "🌿 Fresh Basil",
      inputs: [],
      outputs: [{ id: "ingredient", label: "leaves", type: "object" }],
    },
  },

  // Prep actions
  {
    id: "mince",
    type: "blackbox",
    position: { x: 280, y: 50 },
    data: {
      label: "🔪 Mince",
      inputs: [{ id: "in", label: "whole", type: "object" }],
      outputs: [{ id: "out", label: "minced", type: "object" }],
    },
  },
  {
    id: "dice",
    type: "blackbox",
    position: { x: 280, y: 150 },
    data: {
      label: "🔪 Dice",
      inputs: [{ id: "in", label: "whole", type: "object" }],
      outputs: [{ id: "out", label: "diced", type: "object" }],
    },
  },
  {
    id: "crush",
    type: "blackbox",
    position: { x: 280, y: 250 },
    data: {
      label: "🫳 Crush",
      inputs: [{ id: "in", label: "whole", type: "object" }],
      outputs: [{ id: "out", label: "crushed", type: "object" }],
    },
  },
  {
    id: "chiffonade",
    type: "blackbox",
    position: { x: 280, y: 350 },
    data: {
      label: "🔪 Chiffonade",
      inputs: [{ id: "in", label: "leaves", type: "object" }],
      outputs: [{ id: "out", label: "ribbons", type: "object" }],
    },
  },

  // Mise en place collection
  {
    id: "mise-bowl",
    type: "blackbox",
    position: { x: 520, y: 175 },
    data: {
      label: "🥣 Mise en Place",
      inputs: [
        { id: "aromatics", label: "aromatics", type: "object" },
        { id: "base", label: "base", type: "object" },
        { id: "main", label: "main", type: "object" },
        { id: "garnish", label: "garnish", type: "object" },
      ],
      outputs: [{ id: "prepped", label: "ready", type: "object" }],
    },
  },
];

const miseEnPlaceEdges: Edge[] = [
  {
    id: "e1",
    source: "garlic-raw",
    sourceHandle: "ingredient",
    target: "mince",
    targetHandle: "in",
  },
  {
    id: "e2",
    source: "onion-raw",
    sourceHandle: "ingredient",
    target: "dice",
    targetHandle: "in",
  },
  {
    id: "e3",
    source: "tomatoes-raw",
    sourceHandle: "ingredient",
    target: "crush",
    targetHandle: "in",
  },
  {
    id: "e4",
    source: "basil-raw",
    sourceHandle: "ingredient",
    target: "chiffonade",
    targetHandle: "in",
  },
  {
    id: "e5",
    source: "mince",
    sourceHandle: "out",
    target: "mise-bowl",
    targetHandle: "aromatics",
  },
  {
    id: "e6",
    source: "dice",
    sourceHandle: "out",
    target: "mise-bowl",
    targetHandle: "base",
  },
  {
    id: "e7",
    source: "crush",
    sourceHandle: "out",
    target: "mise-bowl",
    targetHandle: "main",
  },
  {
    id: "e8",
    source: "chiffonade",
    sourceHandle: "out",
    target: "mise-bowl",
    targetHandle: "garnish",
  },
];

export const MiseEnPlace: Story = {
  args: {
    initialNodes: miseEnPlaceNodes,
    initialEdges: miseEnPlaceEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The French concept of 'mise en place' - having all ingredients prepped and ready before cooking begins. Raw ingredients flow through prep techniques into organized stations.",
      },
    },
  },
};

// ============================================================================
// PASTA CARBONARA - A complete recipe from pantry to plate
// Shows ingredient sourcing, prep, cooking techniques, and final assembly
// ============================================================================

const carbonaraNodes: Node<BlackboxNodeData>[] = [
  // Pantry/Fridge ingredients
  {
    id: "guanciale",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "🥓 Guanciale (200g)",
      inputs: [],
      outputs: [{ id: "meat", label: "cured", type: "object" }],
    },
  },
  {
    id: "eggs",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "🥚 Eggs (4 yolks + 2 whole)",
      inputs: [],
      outputs: [{ id: "egg", label: "eggs", type: "object" }],
    },
  },
  {
    id: "pecorino",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "🧀 Pecorino Romano",
      inputs: [],
      outputs: [{ id: "cheese", label: "block", type: "object" }],
    },
  },
  {
    id: "pasta-dry",
    type: "blackbox",
    position: { x: 50, y: 350 },
    data: {
      label: "🍝 Rigatoni (400g)",
      inputs: [],
      outputs: [{ id: "pasta", label: "dry", type: "object" }],
    },
  },
  {
    id: "black-pepper",
    type: "blackbox",
    position: { x: 50, y: 450 },
    data: {
      label: "🫚 Black Pepper",
      inputs: [],
      outputs: [{ id: "spice", label: "whole", type: "object" }],
    },
  },

  // Prep stage
  {
    id: "cube-meat",
    type: "blackbox",
    position: { x: 280, y: 50 },
    data: {
      label: "🔪 Cube (½ inch)",
      inputs: [{ id: "in", label: "cured", type: "object" }],
      outputs: [{ id: "out", label: "cubed", type: "object" }],
    },
  },
  {
    id: "whisk-eggs",
    type: "blackbox",
    position: { x: 280, y: 150 },
    data: {
      label: "🥄 Whisk",
      inputs: [
        { id: "eggs", label: "eggs", type: "object" },
        { id: "cheese", label: "cheese", type: "object" },
      ],
      outputs: [{ id: "out", label: "mixture", type: "object" }],
    },
  },
  {
    id: "grate-cheese",
    type: "blackbox",
    position: { x: 180, y: 250 },
    data: {
      label: "🧀 Fine Grate",
      inputs: [{ id: "in", label: "block", type: "object" }],
      outputs: [{ id: "out", label: "grated", type: "object" }],
    },
  },
  {
    id: "crack-pepper",
    type: "blackbox",
    position: { x: 280, y: 450 },
    data: {
      label: "⚫ Crack (coarse)",
      inputs: [{ id: "in", label: "whole", type: "object" }],
      outputs: [{ id: "out", label: "cracked", type: "object" }],
    },
  },

  // Cooking stage
  {
    id: "render-fat",
    type: "blackbox",
    position: { x: 500, y: 50 },
    data: {
      label: "🔥 Render (low heat)",
      inputs: [{ id: "meat", label: "cubed", type: "object" }],
      outputs: [
        { id: "crispy", label: "crispy", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
    },
  },
  {
    id: "boil-pasta",
    type: "blackbox",
    position: { x: 500, y: 350 },
    data: {
      label: "🫕 Boil (al dente)",
      inputs: [{ id: "pasta", label: "dry", type: "object" }],
      outputs: [
        { id: "cooked", label: "cooked", type: "object" },
        { id: "water", label: "pasta water", type: "object" },
      ],
    },
  },

  // Assembly - the critical moment
  {
    id: "toss-off-heat",
    type: "blackbox",
    position: { x: 720, y: 200 },
    data: {
      label: "🥄 Toss (OFF HEAT!)",
      inputs: [
        { id: "pasta", label: "pasta", type: "object" },
        { id: "eggs", label: "egg mix", type: "object" },
        { id: "fat", label: "fat", type: "object" },
        { id: "water", label: "pasta water", type: "object" },
      ],
      outputs: [{ id: "out", label: "emulsified", type: "object" }],
    },
  },

  // Final plate
  {
    id: "plate",
    type: "blackbox",
    position: { x: 940, y: 150 },
    data: {
      label: "🍽️ Plate",
      inputs: [
        { id: "pasta", label: "carbonara", type: "object" },
        { id: "crispy", label: "crispy bits", type: "object" },
        { id: "pepper", label: "pepper", type: "object" },
      ],
      outputs: [{ id: "dish", label: "finished", type: "object" }],
    },
  },
];

const carbonaraEdges: Edge[] = [
  // Prep connections
  {
    id: "c1",
    source: "guanciale",
    sourceHandle: "meat",
    target: "cube-meat",
    targetHandle: "in",
  },
  {
    id: "c2",
    source: "pecorino",
    sourceHandle: "cheese",
    target: "grate-cheese",
    targetHandle: "in",
  },
  {
    id: "c3",
    source: "eggs",
    sourceHandle: "egg",
    target: "whisk-eggs",
    targetHandle: "eggs",
  },
  {
    id: "c4",
    source: "grate-cheese",
    sourceHandle: "out",
    target: "whisk-eggs",
    targetHandle: "cheese",
  },
  {
    id: "c5",
    source: "black-pepper",
    sourceHandle: "spice",
    target: "crack-pepper",
    targetHandle: "in",
  },
  // Cooking connections
  {
    id: "c6",
    source: "cube-meat",
    sourceHandle: "out",
    target: "render-fat",
    targetHandle: "meat",
  },
  {
    id: "c7",
    source: "pasta-dry",
    sourceHandle: "pasta",
    target: "boil-pasta",
    targetHandle: "pasta",
  },
  // Assembly connections
  {
    id: "c8",
    source: "boil-pasta",
    sourceHandle: "cooked",
    target: "toss-off-heat",
    targetHandle: "pasta",
  },
  {
    id: "c9",
    source: "whisk-eggs",
    sourceHandle: "out",
    target: "toss-off-heat",
    targetHandle: "eggs",
  },
  {
    id: "c10",
    source: "render-fat",
    sourceHandle: "fat",
    target: "toss-off-heat",
    targetHandle: "fat",
  },
  {
    id: "c11",
    source: "boil-pasta",
    sourceHandle: "water",
    target: "toss-off-heat",
    targetHandle: "water",
  },
  // Plating
  {
    id: "c12",
    source: "toss-off-heat",
    sourceHandle: "out",
    target: "plate",
    targetHandle: "pasta",
  },
  {
    id: "c13",
    source: "render-fat",
    sourceHandle: "crispy",
    target: "plate",
    targetHandle: "crispy",
  },
  {
    id: "c14",
    source: "crack-pepper",
    sourceHandle: "out",
    target: "plate",
    targetHandle: "pepper",
  },
];

export const PastaCarbonaraRecipe: Story = {
  args: {
    initialNodes: carbonaraNodes,
    initialEdges: carbonaraEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A complete Pasta Carbonara recipe modeled as a pipeline. Shows the critical technique: tossing OFF HEAT to emulsify without scrambling the eggs. The rendered fat and pasta water create the silky sauce.",
      },
    },
  },
};

// ============================================================================
// FLAVOR MATRIX - Salt, Fat, Acid, Heat (Samin Nosrat's framework)
// Models how the four elements of flavor combine
// ============================================================================

const flavorMatrixNodes: Node<BlackboxNodeData>[] = [
  // The four elements
  {
    id: "salt",
    type: "blackbox",
    position: { x: 50, y: 100 },
    data: {
      label: "🧂 SALT",
      inputs: [],
      outputs: [{ id: "effect", label: "enhances", type: "string" }],
    },
  },
  {
    id: "fat",
    type: "blackbox",
    position: { x: 50, y: 220 },
    data: {
      label: "🫒 FAT",
      inputs: [],
      outputs: [{ id: "effect", label: "carries", type: "string" }],
    },
  },
  {
    id: "acid",
    type: "blackbox",
    position: { x: 50, y: 340 },
    data: {
      label: "🍋 ACID",
      inputs: [],
      outputs: [{ id: "effect", label: "balances", type: "string" }],
    },
  },
  {
    id: "heat",
    type: "blackbox",
    position: { x: 50, y: 460 },
    data: {
      label: "🔥 HEAT",
      inputs: [],
      outputs: [{ id: "effect", label: "transforms", type: "string" }],
    },
  },

  // Flavor combination node with slots for techniques
  {
    id: "salting-technique",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Season Early",
      inputs: [{ id: "in", label: "salt", type: "string" }],
      outputs: [{ id: "out", label: "penetrated", type: "string" }],
    },
  },
  {
    id: "fat-technique",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Brown in Oil",
      inputs: [{ id: "in", label: "fat", type: "string" }],
      outputs: [{ id: "out", label: "maillard", type: "string" }],
    },
  },
  {
    id: "acid-technique",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "Finish with Citrus",
      inputs: [{ id: "in", label: "acid", type: "string" }],
      outputs: [{ id: "out", label: "brightness", type: "string" }],
    },
  },
  {
    id: "heat-technique",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "High Sear",
      inputs: [{ id: "in", label: "heat", type: "string" }],
      outputs: [{ id: "out", label: "crust", type: "string" }],
    },
  },
  {
    id: "flavor-builder",
    type: "blackbox",
    position: { x: 300, y: 200 },
    data: {
      label: "🎯 Flavor Builder",
      inputs: [
        { id: "salt-in", label: "salt", type: "string" },
        { id: "fat-in", label: "fat", type: "string" },
        { id: "acid-in", label: "acid", type: "string" },
        { id: "heat-in", label: "heat", type: "string" },
      ],
      outputs: [{ id: "flavor", label: "flavor", type: "object" }],
      slots: [
        {
          id: "salting-slot",
          label: "salting method",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "salting-technique",
        },
        {
          id: "fat-slot",
          label: "fat technique",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "fat-technique",
        },
        {
          id: "acid-slot",
          label: "acid technique",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "acid-technique",
        },
        {
          id: "heat-slot",
          label: "heat technique",
          accepts: {
            inputs: [{ id: "in", label: "in", type: "string" }],
            outputs: [{ id: "out", label: "out", type: "string" }],
          },
          filledBy: "heat-technique",
        },
      ],
    },
  },

  // Result
  {
    id: "dish-output",
    type: "blackbox",
    position: { x: 600, y: 280 },
    data: {
      label: "🍖 Perfect Steak",
      inputs: [{ id: "flavor", label: "flavor", type: "object" }],
      outputs: [],
    },
  },
];

const flavorMatrixEdges: Edge[] = [
  {
    id: "f1",
    source: "salt",
    sourceHandle: "effect",
    target: "flavor-builder",
    targetHandle: "salt-in",
  },
  {
    id: "f2",
    source: "fat",
    sourceHandle: "effect",
    target: "flavor-builder",
    targetHandle: "fat-in",
  },
  {
    id: "f3",
    source: "acid",
    sourceHandle: "effect",
    target: "flavor-builder",
    targetHandle: "acid-in",
  },
  {
    id: "f4",
    source: "heat",
    sourceHandle: "effect",
    target: "flavor-builder",
    targetHandle: "heat-in",
  },
  {
    id: "f5",
    source: "flavor-builder",
    sourceHandle: "flavor",
    target: "dish-output",
    targetHandle: "flavor",
  },
];

export const FlavorMatrix: Story = {
  args: {
    initialNodes: flavorMatrixNodes,
    initialEdges: flavorMatrixEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Based on Samin Nosrat's 'Salt Fat Acid Heat' framework. The four elements of good cooking combine through technique slots. Each slot can be swapped with different methods - try double-clicking a slot to eject and swap techniques.",
      },
    },
  },
};

// ============================================================================
// UTENSIL AS SLOT - The pan changes everything
// Demonstrates how the same ingredients + technique produce different results
// based on the cooking vessel (modeled as a slot)
// ============================================================================

const utensilSlotNodes: Node<BlackboxNodeData>[] = [
  // Input ingredients
  {
    id: "eggs-input",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "🥚 Eggs (3)",
      inputs: [],
      outputs: [{ id: "eggs", label: "cracked", type: "object" }],
    },
  },
  {
    id: "butter-input",
    type: "blackbox",
    position: { x: 50, y: 270 },
    data: {
      label: "🧈 Butter",
      inputs: [],
      outputs: [{ id: "fat", label: "melted", type: "object" }],
    },
  },

  // The utensils (these fill the slot)
  {
    id: "nonstick-pan",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "🍳 Nonstick Pan",
      inputs: [
        { id: "food", label: "food", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
      outputs: [{ id: "cooked", label: "cooked", type: "object" }],
    },
  },
  {
    id: "cast-iron",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "🫕 Cast Iron",
      inputs: [
        { id: "food", label: "food", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
      outputs: [{ id: "cooked", label: "cooked", type: "object" }],
    },
  },
  {
    id: "stainless-pan",
    type: "blackbox",
    position: { x: 0, y: 0 },
    data: {
      label: "🥘 Stainless Steel",
      inputs: [
        { id: "food", label: "food", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
      outputs: [{ id: "cooked", label: "cooked", type: "object" }],
    },
  },

  // Cooking technique with vessel slot
  {
    id: "scramble-technique",
    type: "blackbox",
    position: { x: 300, y: 150 },
    data: {
      label: "🔥 Scramble",
      inputs: [
        { id: "eggs", label: "eggs", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
      outputs: [{ id: "result", label: "scrambled", type: "object" }],
      slots: [
        {
          id: "vessel",
          label: "cooking vessel",
          accepts: {
            inputs: [
              { id: "food", label: "food", type: "object" },
              { id: "fat", label: "fat", type: "object" },
            ],
            outputs: [{ id: "cooked", label: "cooked", type: "object" }],
          },
          filledBy: "nonstick-pan",
        },
      ],
    },
  },

  // Different outcomes based on vessel
  {
    id: "result",
    type: "blackbox",
    position: { x: 550, y: 150 },
    data: {
      label: "🍳 Soft Curds",
      inputs: [{ id: "in", label: "scrambled", type: "object" }],
      outputs: [],
    },
  },
];

const utensilSlotEdges: Edge[] = [
  {
    id: "u1",
    source: "eggs-input",
    sourceHandle: "eggs",
    target: "scramble-technique",
    targetHandle: "eggs",
  },
  {
    id: "u2",
    source: "butter-input",
    sourceHandle: "fat",
    target: "scramble-technique",
    targetHandle: "fat",
  },
  {
    id: "u3",
    source: "scramble-technique",
    sourceHandle: "result",
    target: "result",
    targetHandle: "in",
  },
];

export const UtensilAsSlot: Story = {
  args: {
    initialNodes: utensilSlotNodes,
    initialEdges: utensilSlotEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The cooking vessel changes everything! Same eggs, same technique, but a nonstick pan gives soft curds while cast iron gives crispy edges. Double-click the vessel slot to swap pans and see how the outcome label would change.",
      },
    },
  },
};

// ============================================================================
// MOTHER SAUCES - The five foundations of French cuisine
// Shows how base techniques transform into derivative sauces
// ============================================================================

const motherSaucesNodes: Node<BlackboxNodeData>[] = [
  // Roux base
  {
    id: "flour",
    type: "blackbox",
    position: { x: 50, y: 200 },
    data: {
      label: "🌾 Flour",
      inputs: [],
      outputs: [{ id: "starch", label: "starch", type: "object" }],
    },
  },
  {
    id: "butter-roux",
    type: "blackbox",
    position: { x: 50, y: 300 },
    data: {
      label: "🧈 Butter",
      inputs: [],
      outputs: [{ id: "fat", label: "fat", type: "object" }],
    },
  },
  {
    id: "make-roux",
    type: "blackbox",
    position: { x: 200, y: 250 },
    data: {
      label: "🔥 Cook Roux",
      inputs: [
        { id: "starch", label: "flour", type: "object" },
        { id: "fat", label: "fat", type: "object" },
      ],
      outputs: [{ id: "roux", label: "roux", type: "object" }],
    },
  },

  // Liquids
  {
    id: "milk",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "🥛 Milk",
      inputs: [],
      outputs: [{ id: "liquid", label: "warm", type: "object" }],
    },
  },
  {
    id: "stock",
    type: "blackbox",
    position: { x: 50, y: 400 },
    data: {
      label: "🍖 Brown Stock",
      inputs: [],
      outputs: [{ id: "liquid", label: "hot", type: "object" }],
    },
  },

  // Mother sauces
  {
    id: "bechamel",
    type: "blackbox",
    position: { x: 400, y: 100 },
    data: {
      label: "🥣 Béchamel",
      inputs: [
        { id: "roux", label: "roux", type: "object" },
        { id: "liquid", label: "milk", type: "object" },
      ],
      outputs: [{ id: "sauce", label: "white sauce", type: "object" }],
    },
  },
  {
    id: "espagnole",
    type: "blackbox",
    position: { x: 400, y: 350 },
    data: {
      label: "🟤 Espagnole",
      inputs: [
        { id: "roux", label: "roux", type: "object" },
        { id: "liquid", label: "stock", type: "object" },
      ],
      outputs: [{ id: "sauce", label: "brown sauce", type: "object" }],
    },
  },

  // Derivatives
  {
    id: "mornay",
    type: "blackbox",
    position: { x: 600, y: 50 },
    data: {
      label: "🧀 Mornay",
      inputs: [
        { id: "base", label: "béchamel", type: "object" },
        { id: "cheese", label: "gruyère", type: "object" },
      ],
      outputs: [{ id: "sauce", label: "cheese sauce", type: "object" }],
    },
  },
  {
    id: "cheese-add",
    type: "blackbox",
    position: { x: 500, y: 0 },
    data: {
      label: "🧀 Gruyère",
      inputs: [],
      outputs: [{ id: "cheese", label: "grated", type: "object" }],
    },
  },
  {
    id: "demi-glace",
    type: "blackbox",
    position: { x: 600, y: 300 },
    data: {
      label: "✨ Demi-Glace",
      inputs: [
        { id: "base", label: "espagnole", type: "object" },
        { id: "stock", label: "stock", type: "object" },
      ],
      outputs: [{ id: "sauce", label: "rich sauce", type: "object" }],
    },
  },
  {
    id: "more-stock",
    type: "blackbox",
    position: { x: 500, y: 420 },
    data: {
      label: "🍖 More Stock",
      inputs: [],
      outputs: [{ id: "liquid", label: "reduced", type: "object" }],
    },
  },

  // Final applications
  {
    id: "mac-cheese",
    type: "blackbox",
    position: { x: 800, y: 50 },
    data: {
      label: "🧀 Mac & Cheese",
      inputs: [{ id: "sauce", label: "mornay", type: "object" }],
      outputs: [],
    },
  },
  {
    id: "steak-sauce",
    type: "blackbox",
    position: { x: 800, y: 300 },
    data: {
      label: "🥩 Steak au Poivre",
      inputs: [{ id: "sauce", label: "demi-glace", type: "object" }],
      outputs: [],
    },
  },
];

const motherSaucesEdges: Edge[] = [
  // Roux making
  {
    id: "m1",
    source: "flour",
    sourceHandle: "starch",
    target: "make-roux",
    targetHandle: "starch",
  },
  {
    id: "m2",
    source: "butter-roux",
    sourceHandle: "fat",
    target: "make-roux",
    targetHandle: "fat",
  },
  // Mother sauces
  {
    id: "m3",
    source: "make-roux",
    sourceHandle: "roux",
    target: "bechamel",
    targetHandle: "roux",
  },
  {
    id: "m4",
    source: "milk",
    sourceHandle: "liquid",
    target: "bechamel",
    targetHandle: "liquid",
  },
  {
    id: "m5",
    source: "make-roux",
    sourceHandle: "roux",
    target: "espagnole",
    targetHandle: "roux",
  },
  {
    id: "m6",
    source: "stock",
    sourceHandle: "liquid",
    target: "espagnole",
    targetHandle: "liquid",
  },
  // Derivatives
  {
    id: "m7",
    source: "bechamel",
    sourceHandle: "sauce",
    target: "mornay",
    targetHandle: "base",
  },
  {
    id: "m8",
    source: "cheese-add",
    sourceHandle: "cheese",
    target: "mornay",
    targetHandle: "cheese",
  },
  {
    id: "m9",
    source: "espagnole",
    sourceHandle: "sauce",
    target: "demi-glace",
    targetHandle: "base",
  },
  {
    id: "m10",
    source: "more-stock",
    sourceHandle: "liquid",
    target: "demi-glace",
    targetHandle: "stock",
  },
  // Applications
  {
    id: "m11",
    source: "mornay",
    sourceHandle: "sauce",
    target: "mac-cheese",
    targetHandle: "sauce",
  },
  {
    id: "m12",
    source: "demi-glace",
    sourceHandle: "sauce",
    target: "steak-sauce",
    targetHandle: "sauce",
  },
];

export const MotherSauces: Story = {
  args: {
    initialNodes: motherSaucesNodes,
    initialEdges: motherSaucesEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The French mother sauces demonstrate culinary inheritance. A roux (flour + butter) combines with different liquids to create base sauces. These transform into derivative sauces, which become final dishes. Béchamel → Mornay → Mac & Cheese. Espagnole → Demi-Glace → Steak au Poivre.",
      },
    },
  },
};

// ============================================================================
// STIR FRY TIMING - Wok hei and sequential cooking
// Models the critical timing of Asian stir-fry technique
// ============================================================================

const stirFryNodes: Node<BlackboxNodeData>[] = [
  // Ingredients with different cook times
  {
    id: "garlic-ginger",
    type: "blackbox",
    position: { x: 50, y: 50 },
    data: {
      label: "🧄 Garlic & Ginger",
      inputs: [],
      outputs: [{ id: "aromatics", label: "minced", type: "object" }],
    },
  },
  {
    id: "protein",
    type: "blackbox",
    position: { x: 50, y: 150 },
    data: {
      label: "🍗 Chicken (sliced)",
      inputs: [],
      outputs: [{ id: "protein", label: "velvetized", type: "object" }],
    },
  },
  {
    id: "hard-veg",
    type: "blackbox",
    position: { x: 50, y: 250 },
    data: {
      label: "🥕 Carrots, Broccoli",
      inputs: [],
      outputs: [{ id: "veg", label: "cut", type: "object" }],
    },
  },
  {
    id: "soft-veg",
    type: "blackbox",
    position: { x: 50, y: 350 },
    data: {
      label: "🫑 Bell Peppers",
      inputs: [],
      outputs: [{ id: "veg", label: "cut", type: "object" }],
    },
  },
  {
    id: "sauce-mix",
    type: "blackbox",
    position: { x: 50, y: 450 },
    data: {
      label: "🥫 Sauce (soy, sesame, etc)",
      inputs: [],
      outputs: [{ id: "sauce", label: "mixed", type: "object" }],
    },
  },

  // Sequential wok stages
  {
    id: "wok-1",
    type: "blackbox",
    position: { x: 280, y: 50 },
    data: {
      label: "🔥 Bloom Aromatics (10s)",
      inputs: [{ id: "in", label: "aromatics", type: "object" }],
      outputs: [{ id: "out", label: "fragrant", type: "object" }],
    },
  },
  {
    id: "wok-2",
    type: "blackbox",
    position: { x: 280, y: 150 },
    data: {
      label: "🔥 Sear Protein (2min)",
      inputs: [
        { id: "protein", label: "protein", type: "object" },
        { id: "aromatics", label: "aromatics", type: "object" },
      ],
      outputs: [{ id: "out", label: "seared", type: "object" }],
    },
  },
  {
    id: "wok-3",
    type: "blackbox",
    position: { x: 480, y: 200 },
    data: {
      label: "🔥 Hard Veg (1.5min)",
      inputs: [
        { id: "prev", label: "from wok", type: "object" },
        { id: "veg", label: "hard veg", type: "object" },
      ],
      outputs: [{ id: "out", label: "crisp-tender", type: "object" }],
    },
  },
  {
    id: "wok-4",
    type: "blackbox",
    position: { x: 680, y: 250 },
    data: {
      label: "🔥 Soft Veg (30s)",
      inputs: [
        { id: "prev", label: "from wok", type: "object" },
        { id: "veg", label: "soft veg", type: "object" },
      ],
      outputs: [{ id: "out", label: "just wilted", type: "object" }],
    },
  },
  {
    id: "wok-5",
    type: "blackbox",
    position: { x: 880, y: 300 },
    data: {
      label: "🔥 Sauce & Toss (20s)",
      inputs: [
        { id: "prev", label: "from wok", type: "object" },
        { id: "sauce", label: "sauce", type: "object" },
      ],
      outputs: [{ id: "out", label: "glazed", type: "object" }],
    },
  },

  // Final result
  {
    id: "wok-hei",
    type: "blackbox",
    position: { x: 1050, y: 300 },
    data: {
      label: "✨ Wok Hei!",
      inputs: [{ id: "stir-fry", label: "stir-fry", type: "object" }],
      outputs: [],
    },
  },
];

const stirFryEdges: Edge[] = [
  {
    id: "s1",
    source: "garlic-ginger",
    sourceHandle: "aromatics",
    target: "wok-1",
    targetHandle: "in",
  },
  {
    id: "s2",
    source: "wok-1",
    sourceHandle: "out",
    target: "wok-2",
    targetHandle: "aromatics",
  },
  {
    id: "s3",
    source: "protein",
    sourceHandle: "protein",
    target: "wok-2",
    targetHandle: "protein",
  },
  {
    id: "s4",
    source: "wok-2",
    sourceHandle: "out",
    target: "wok-3",
    targetHandle: "prev",
  },
  {
    id: "s5",
    source: "hard-veg",
    sourceHandle: "veg",
    target: "wok-3",
    targetHandle: "veg",
  },
  {
    id: "s6",
    source: "wok-3",
    sourceHandle: "out",
    target: "wok-4",
    targetHandle: "prev",
  },
  {
    id: "s7",
    source: "soft-veg",
    sourceHandle: "veg",
    target: "wok-4",
    targetHandle: "veg",
  },
  {
    id: "s8",
    source: "wok-4",
    sourceHandle: "out",
    target: "wok-5",
    targetHandle: "prev",
  },
  {
    id: "s9",
    source: "sauce-mix",
    sourceHandle: "sauce",
    target: "wok-5",
    targetHandle: "sauce",
  },
  {
    id: "s10",
    source: "wok-5",
    sourceHandle: "out",
    target: "wok-hei",
    targetHandle: "stir-fry",
  },
];

export const StirFryTiming: Story = {
  args: {
    initialNodes: stirFryNodes,
    initialEdges: stirFryEdges,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Stir-fry is all about timing and sequence. Aromatics bloom first (10s), then protein sears (2min), hard vegetables go in (1.5min), soft vegetables briefly (30s), and finally sauce to glaze (20s). The result? Wok hei - the 'breath of the wok' that makes restaurant stir-fry special.",
      },
    },
  },
};
