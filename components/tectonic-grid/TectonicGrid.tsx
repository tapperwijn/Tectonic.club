"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trash2, Save, RefreshCw } from "lucide-react";

interface TectonicGridProps {
  size?: number;
  mode: "solver" | "builder";
}

const MotionDiv = motion.div;

const TectonicGrid = ({ size = 5, mode }: TectonicGridProps) => {
  // Create empty grid
  const [grid, setGrid] = useState<(number | null)[][]>(
    Array(size).fill(null).map(() => Array(size).fill(null))
  );
  
  // For builder mode: regions
  const [regions, setRegions] = useState<number[][]>(
    Array(size).fill(null).map(() => Array(size).fill(1))
  );
  
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  
  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
    
    if (mode === "solver") {
      // In solver mode, we'll cycle through values 1-size or empty
      setGrid(prev => {
        const newGrid = [...prev.map(r => [...r])];
        const currentValue = newGrid[row][col];
        
        if (currentValue === null) {
          newGrid[row][col] = 1;
        } else if (currentValue < size) {
          newGrid[row][col] = currentValue + 1;
        } else {
          newGrid[row][col] = null;
        }
        
        return newGrid;
      });
    } else {
      // In builder mode, we'll modify regions
      // This is a simplified implementation
      setRegions(prev => {
        const newRegions = [...prev.map(r => [...r])];
        const currentRegion = newRegions[row][col];
        
        newRegions[row][col] = currentRegion < 9 ? currentRegion + 1 : 1;
        
        return newRegions;
      });
    }
  };
  
  // Reset grid
  const resetGrid = () => {
    setGrid(Array(size).fill(null).map(() => Array(size).fill(null)));
    setRegions(Array(size).fill(null).map(() => Array(size).fill(1)));
    setSelectedCell(null);
  };
  
  // Determine cell color based on region in builder mode
  const getRegionColor = (region: number) => {
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
    
    return colors[(region - 1) % colors.length];
  };
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="tectonic-grid my-8"
        style={{ 
          gridTemplateColumns: `repeat(${size}, 50px)`,
          gridTemplateRows: `repeat(${size}, 50px)` 
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <MotionDiv
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: (rowIndex * size + colIndex) * 0.03 }}
              className={`tectonic-cell ${
                mode === "builder" ? getRegionColor(regions[rowIndex][colIndex]) : "bg-card"
              } ${
                selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex 
                  ? "ring-2 ring-primary" 
                  : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== null && cell}
            </MotionDiv>
          ))
        )}
      </div>
      
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={resetGrid}>
          <RefreshCw className="mr-2 h-4 w-4" /> Reset
        </Button>
        
        <Button variant="outline">
          <Trash2 className="mr-2 h-4 w-4" /> Clear
        </Button>
        
        <Button>
          <Save className="mr-2 h-4 w-4" /> {mode === "solver" ? "Solve" : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default TectonicGrid;