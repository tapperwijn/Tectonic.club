# Tectonic Puzzle Solver

## 🔍 What is a Tectonic Puzzle?

Tectonic (also known as Suguru) is a grid-based logic puzzle. Each puzzle consists of a rectangular grid subdivided into irregularly shaped **regions**, also called **cages**. The goal is to fill the grid with digits while satisfying the following rules.

---

## 📏 Grid Layout

- The grid has a fixed **width × height** (e.g., 6×6).
- Each **cell belongs to exactly one region**.
- A **region** is a group of 1 to N connected cells.
- The size of a region determines the digits allowed in it:
  - A region of size 3 → must contain digits 1, 2, 3
  - A region of size 5 → must contain digits 1 to 5, etc.
- Regions can be shaped arbitrarily but must be **connected** (touching side or corner).

---

## ✅ Puzzle Rules

1. **Digits per Region**  
   Each region must contain **exactly the digits 1 through N**, where N is the region’s size. No repeats.

2. **No Adjacent Same Digits**  
   Identical digits **must not touch**, not even diagonally. This rule applies **across the entire grid**, not just within regions.

3. **Single Unique Solution**  
   A well-formed puzzle has **one unique solution** that can be solved using logic alone (no guessing).

---

# types.ts typescript interfaces

export type CellID = `${number}-${number}`; // e.g., "2-3"

export interface CellData {
  id: CellID;
  row: number;
  col: number;
  regionId: number;
  value: number | null;       // Final number in the cell (if any)
  scribbles: number[];        // Player notes (possible values)
}

export interface Puzzle {
  width: number;              // Grid width
  height: number;             // Grid height
  cells: CellData[][];        // 2D matrix of cells [row][col]
}



# Tectonic Puzzle Solver

## Features

- Dynamic grid builder (custom width and height)
- Region assignment (click and drag to assign region IDs)
- Per-cell number input or note scribbles
- Solving steps shown in a chat-style interface
- The current puzzle data displayed at the bottom of the page in a gray container as code markup






Based on the current implementation and the required features, here's my proposed workflow:

Grid Setup Components (First Priority)

Add dimension controls (width/height input)
Create a grid initialization system
Add a Grid Controls component above the grid with:
Dimension inputs
Reset button
Mode switcher (Build/Solve)
Region Builder Mode (Second Priority)

Enhance the existing click handling for region assignment
Add drag functionality for multi-cell selection
Visual feedback for regions (different colors/borders)
Region size validation
Solver Input Mode (Third Priority)

Implement dual input system:
Direct number input (click to cycle numbers)
Scribble mode (right-click or modifier key)
Visual distinction between final numbers and scribbles
Add input mode toggle (Number/Scribble)
Solution Steps Display (Fourth Priority)

Add a chat-like interface to the right of the grid
Create step-by-step solving algorithm
Animate solving steps
Allow stepping through solution
State Management (Throughout)

Save/load puzzle state
Undo/redo functionality
Export/import puzzles
Show puzzle data in code format