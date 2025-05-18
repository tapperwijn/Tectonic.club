"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import GridControls from "./GridControls";
import RegionList from "./RegionList";
import { useAutoSave } from "@/hooks/useAutoSave";
import { CellData, Puzzle, CellID } from "@/types/grid";
import { useToast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";

interface TectonicGridProps {
  initialWidth?: number;
  initialHeight?: number;
  initialMode?: "solver" | "builder";
}

const MotionDiv = motion.div;

// Helper function to create a cell
const createCell = (row: number, col: number): CellData => ({
  id: `${row}-${col}`,
  row,
  col,
  regionId: 0,
  value: null,
  scribbles: [],
});

// Helper function to create a grid
const createGrid = (width: number, height: number): CellData[][] => {
  return Array(height)
    .fill(null)
    .map((_, row) =>
      Array(width)
        .fill(null)
        .map((_, col) => createCell(row, col))
    );
};

// Get region color
const getRegionColor = (regionId: number): string => {
  if (regionId === 0) return "bg-card";

  const colors = [
    "bg-blue-500/20",
    "bg-green-500/20",
    "bg-yellow-500/20",
    "bg-purple-500/20",
    "bg-pink-500/20",
    "bg-indigo-500/20",
    "bg-red-500/20",
    "bg-orange-500/20",
    "bg-teal-500/20",
  ];

  return colors[(regionId - 1) % colors.length];
};

// Create puzzle state for saving
const getPuzzleState = (width: number, height: number, cells: CellData[][]): Puzzle => ({
  width,
  height,
  cells,
});

// Helper function to check if cells are connected
const areConnected = (cell1: CellData, cell2: CellData): boolean => {
  const rowDiff = Math.abs(cell1.row - cell2.row);
  const colDiff = Math.abs(cell1.col - cell2.col);
  return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 1 && colDiff === 1);
};

// Helper function to get all cells in a region
const getRegionCells = (cells: CellData[][], regionId: number): CellData[] => {
  return cells.flat().filter(cell => cell.regionId === regionId);
};

// Helper function to validate region connectivity
const isRegionConnected = (cells: CellData[][], regionId: number): boolean => {
  const regionCells = getRegionCells(cells, regionId);
  if (regionCells.length === 0) return true;
  
  const visited = new Set<string>();
  const stack = [regionCells[0]];
  
  while (stack.length > 0) {
    const cell = stack.pop()!;
    visited.add(cell.id);
    
    const neighbors = regionCells.filter(
      c => !visited.has(c.id) && areConnected(cell, c)
    );
    stack.push(...neighbors);
  }
  
  return visited.size === regionCells.length;
};

// Helper function to validate region sizes
const validateRegions = (cells: CellData[][]): string[] => {
  const errors: string[] = [];
  const regions = new Set(cells.flat().map(cell => cell.regionId));
  
  for (const regionId of Array.from(regions)) {
    if (regionId === 0) continue;
    
    const regionCells = getRegionCells(cells, regionId);
    const size = regionCells.length;
    
    if (size > 9) {
      errors.push(`Region ${regionId} is too large (max size is 9)`);
    }
    
    if (!isRegionConnected(cells, regionId)) {
      errors.push(`Region ${regionId} is not connected`);
    }
  }
  
  return errors;
};

// Encode puzzle data to URL hash
const encodePuzzleData = (puzzle: Puzzle, mode: "solver" | "builder"): string => {
  // Create minimal data structure with just what's needed
  const data = {
    w: puzzle.width,
    h: puzzle.height,
    m: mode,
    // Create a flat array of region IDs and values
    r: puzzle.cells.flat().map(cell => cell.regionId),
    v: puzzle.cells.flat().map(cell => cell.value),
    s: puzzle.cells.flat().map(cell => cell.scribbles)
  };
  return btoa(JSON.stringify(data));
};

// Decode puzzle data from URL hash
const decodePuzzleData = (hash: string): { puzzle: Puzzle; mode: "solver" | "builder" } | null => {
  try {
    const data = JSON.parse(atob(hash));
    
    // Create cells array
    const cells: CellData[][] = Array(data.h).fill(null).map((_, row) =>
      Array(data.w).fill(null).map((_, col) => {
        const idx = row * data.w + col;
        return {
          id: `${row}-${col}`,
          row,
          col,
          regionId: data.r[idx],
          value: data.v[idx],
          scribbles: data.s[idx]
        };
      })
    );

    return {
      puzzle: { width: data.w, height: data.h, cells },
      mode: data.m
    };
  } catch (e) {
    console.error("Failed to decode puzzle data:", e);
    return null;
  }
};

const TectonicGrid = ({
  initialWidth = 5,
  initialHeight = 5,
  initialMode = "builder", // Default to builder when no hash present
}: TectonicGridProps) => {
  const { toast } = useToast();
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  // Set initial mode based on whether there's a hash in the URL
  const [mode, setMode] = useState<"solver" | "builder">(() => {
    // If there's a hash in the URL, start in solver mode
    return window?.location?.hash ? "solver" : initialMode;
  });
  const [cells, setCells] = useState<CellData[][]>(createGrid(width, height));
  const [selectedCell, setSelectedCell] = useState<CellID | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [availableRegions, setAvailableRegions] = useState<Set<number>>(new Set([1]));

  // Debug cell updates
  useEffect(() => {
    if (selectedCell) {
      const [row, col] = selectedCell.split("-").map(Number);
      console.log("Selected Cell:", cells[row][col]);
    }
  }, [cells, selectedCell]);
  // Initialize auto-save
  const { saveState } = useAutoSave({
    puzzle: getPuzzleState(width, height, cells),
    mode,
    availableRegions: Array.from(availableRegions),
  });

  // Save state when it changes
  useEffect(() => {
    saveState({
      puzzle: getPuzzleState(width, height, cells),
      mode,
      availableRegions: Array.from(availableRegions),
    });
  }, [cells, width, height, mode, availableRegions]);
  // Load puzzle from URL hash if present
  useEffect(() => {
    const loadPuzzleFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the # character
      if (hash) {
        const data = decodePuzzleData(hash);
        if (data) {
          setWidth(data.puzzle.width);
          setHeight(data.puzzle.height);
          setMode(data.mode);
          setCells(data.puzzle.cells);
          // Extract available regions from the loaded puzzle
          const regions = new Set(data.puzzle.cells.flat().map(cell => cell.regionId).filter(id => id > 0));
          setAvailableRegions(regions);
          toast({
            description: "Puzzle loaded from shared link",
            duration: 3000
          });
        }
      }
    };

    // Load puzzle on initial mount
    loadPuzzleFromHash();

    // Add event listener for hash changes
    window.addEventListener('hashchange', loadPuzzleFromHash);

    // Clean up event listener
    return () => window.removeEventListener('hashchange', loadPuzzleFromHash);
  }, [toast]);

  // Share puzzle function
  const handleSharePuzzle = useCallback(() => {
    const puzzle = getPuzzleState(width, height, cells);
    const hash = encodePuzzleData(puzzle, mode);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(url).then(() => {
      toast({
        description: "Shareable link copied to clipboard!",
        duration: 3000
      });
    });
  }, [width, height, cells, mode]);

  const initializeGrid = useCallback((w: number, h: number) => {
    setCells(createGrid(w, h));
    setSelectedCell(null);
    setSelectedRegion(null);
    setAvailableRegions(new Set([1]));
  }, []);

  const handleReset = useCallback(() => {
    initializeGrid(width, height);
  }, [width, height, initializeGrid]);

  const handleWidthChange = useCallback(
    (w: number) => {
      setWidth(w);
      initializeGrid(w, height);
    },
    [height, initializeGrid]
  );

  const handleHeightChange = useCallback(
    (h: number) => {
      setHeight(h);
      initializeGrid(width, h);
    },
    [width, initializeGrid]
  );

  const handleAddRegion = useCallback(() => {
    const newRegionNumber = Math.max(...Array.from(availableRegions)) + 1;
    setAvailableRegions((prev) => new Set(Array.from(prev).concat([newRegionNumber])));
    setSelectedRegion(newRegionNumber);
  }, [availableRegions]);

  const handleRemoveRegion = useCallback(
    (region: number) => {
      setCells((prev) => {
        const newCells = prev.map((row) =>
          row.map((cell) => (cell.regionId === region ? { ...cell, regionId: 0 } : cell))
        );
        return newCells;
      });
      setAvailableRegions((prev) => {
        const newRegions = new Set(prev);
        newRegions.delete(region);
        return newRegions;
      });
      if (selectedRegion === region) {
        setSelectedRegion(null);
      }
    },
    [selectedRegion]
  );  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    const cellId: CellID = `${row}-${col}`;
    setSelectedCell(cellId);

    if (mode === "builder" && selectedRegion !== null) {
      setCells((prev) => {
        const newCells = prev.map((r) => [...r]);
        const cell = newCells[row][col];
        
        // Update region in builder mode
        const oldRegionId = cell.regionId;
        cell.regionId = selectedRegion;
        
        // Validate the change
        const errors = validateRegions(newCells);
        if (errors.length > 0) {
          // Revert the change if it creates invalid regions
          cell.regionId = oldRegionId;
          console.warn("Invalid region change:", errors);
          return prev;
        }
        
        return newCells;
      });
    }
  };

  const handleNumberInput = (num: number, isScribble: boolean = false) => {
    if (!selectedCell || mode !== "solver") return;
    
    const [row, col] = selectedCell.split("-").map(Number);
    
    setCells(prev => {
      // Create a proper deep copy
      const newCells = prev.map(row => row.map(cell => ({...cell})));
      const cell = newCells[row][col];

      if (isScribble) {
        if (cell.value !== null) return prev;
        // Toggle scribble number
        cell.scribbles = cell.scribbles.includes(num)
          ? cell.scribbles.filter(n => n !== num)
          : [...cell.scribbles, num].sort((a, b) => a - b);
      } else {
        // Set final number or clear if same number
        cell.value = cell.value === num ? null : num;
        cell.scribbles = []; // Clear scribbles when setting a final number
      }

      return newCells;
    });
  };

  const renderGrid = () => (
    <div className="grid gap-0.5 bg-muted p-0.5 rounded-lg mx-auto select-none"
         style={{
           gridTemplateColumns: `repeat(${width}, 50px)`,
           gridTemplateRows: `repeat(${height}, 50px)`,
           width: 'fit-content'
         }}>
      {cells.map((row, rowIndex) =>
        row.map((cell) => (
          <MotionDiv
            key={cell.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: (rowIndex * width + cell.col) * 0.03 }}              className={`
              flex items-center justify-center text-lg font-medium
              cursor-pointer transition-all relative
              ${cell.regionId > 0 ? getRegionColor(cell.regionId) : "bg-card"}
              ${selectedCell === cell.id ? "ring-2 ring-primary" : ""}
              ${cell.value === null ? "hover:bg-accent/50" : ""}
              hover:scale-105
            `}
            onClick={() => handleCellClick(cell.row, cell.col)}
          >            {mode === "solver" && (
              <span className="font-bold">
                {cell.value !== null ? cell.value : ""}
              </span>
            )}{cell.scribbles.length > 0 && mode === "solver" && cell.value === null && (              <div className="absolute inset-1 grid grid-cols-3 gap-0.5 text-xs">
                {cell.scribbles.map((num) => (
                  <div key={num} className="text-center text-white">
                    {num}
                  </div>
                ))}
              </div>
            )}
          </MotionDiv>
        ))
      )}
    </div>
  );

  const renderNumberControls = () => mode === "solver" && (
    <div className="space-y-3 max-w-md mx-auto mt-6 mb-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
         
          <div className="flex gap-2 flex-1 justify-center">
            {Array.from({length: Math.min(9, Math.max(width, height))}, (_, i) => i + 1).map((num) => (              <Button
                key={num}
                variant="default"
                size="sm"
                className={`w-10 h-10 font-bold ${
                  selectedCell && 
                  cells.flat().find(c => c.id === selectedCell)?.value === num
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/80 text-primary-foreground hover:bg-primary"
                }`}
                onClick={() => handleNumberInput(num)}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          
          <div className="flex gap-2 flex-1 justify-center">
            {Array.from({length: Math.min(9, Math.max(width, height))}, (_, i) => i + 1).map((num) => (                <Button
                key={num}
                variant="outline"
                size="sm"
                className={`w-10 h-10 font-bold ${
                  selectedCell && 
                  cells.flat().find(c => c.id === selectedCell)?.scribbles.includes(num)
                    ? "bg-accent hover:bg-accent/80"
                    : ""
                }`}
                onClick={() => handleNumberInput(num, true)}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex gap-6 max-w-[1200px] mx-auto">
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <GridControls
            width={width}
            height={height}
            mode={mode}
            onWidthChange={handleWidthChange}
            onHeightChange={handleHeightChange}
            onModeChange={setMode}
            onReset={handleReset}
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleSharePuzzle}
            className="h-9 w-9 shrink-0"
            title="Share Puzzle"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {renderGrid()}

        {mode === "builder" && (
          <RegionList
            regions={availableRegions}
            selectedRegion={selectedRegion}
            onRegionSelect={setSelectedRegion}
            onAddRegion={() => {
              const newRegionNumber = Math.max(...Array.from(availableRegions)) + 1;
              setAvailableRegions(prev => new Set(Array.from(prev).concat([newRegionNumber])));
              setSelectedRegion(newRegionNumber);
            }}
            onRemoveRegion={(region: number) => {
              setCells(prev => prev.map(row => 
                row.map(cell => 
                  cell.regionId === region ? { ...cell, regionId: 0 } : cell
                )
              ));
              setAvailableRegions(prev => {
                const newRegions = new Set(prev);
                newRegions.delete(region);
                return newRegions;
              });
              if (selectedRegion === region) {
                setSelectedRegion(null);
              }
            }}
          />
        )}
        
        {renderNumberControls()}
      </div>      {mode === "solver" && (
        <div className="w-80 flex flex-col sticky top-24">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Solving Steps</h3>
              <p className="text-sm text-muted-foreground">
                Get hints and guidance for solving this puzzle
              </p>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">
                  First, look for cells that can only contain one possible number based on their region size.
                </p>
              </div>

              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-sm">
                  The region in the top-left corner has size 3, meaning it can only contain numbers 1, 2, and 3.
                </p>
              </div>
            </div>

            <div className="p-4 border-t">
              <Button variant="default" className="w-full" size="sm">
                Show Next Step
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TectonicGrid;