'use client';

import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Puzzle } from "@/types/grid";

interface SavedPuzzleState {
  puzzle: Puzzle;
  mode: "solver" | "builder";
  availableRegions: number[];
  lastSaved: string;
}

export function useAutoSave(initialState: Omit<SavedPuzzleState, 'lastSaved'>) {
  const { toast } = useToast();
  const [lastSaved, setLastSaved] = useState<string>('');
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout>();

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tectonicPuzzleState');
      if (saved) {
        const parsedState = JSON.parse(saved) as SavedPuzzleState;
        // Only restore if grid dimensions match
        if (parsedState.width === initialState.width && parsedState.height === initialState.height) {
          initialState.grid = parsedState.grid;
          initialState.regions = parsedState.regions;
          initialState.mode = parsedState.mode;
          initialState.availableRegions = parsedState.availableRegions;
          setLastSaved(parsedState.lastSaved);
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, []);

  // Auto-save function
  const saveState = (state: Omit<SavedPuzzleState, 'lastSaved'>) => {
    // Clear existing timeout
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }

    // Set new timeout to save after 1 second of inactivity
    const timeout = setTimeout(() => {
      try {
        const timestamp = new Date().toLocaleTimeString();
        const saveData: SavedPuzzleState = {
          ...state,
          lastSaved: timestamp
        };
        localStorage.setItem('tectonicPuzzleState', JSON.stringify(saveData));
        setLastSaved(timestamp);
        toast({
          description: `Puzzle auto-saved at ${timestamp}`,
          duration: 2000
        });
      } catch (error) {
        console.error('Error saving state:', error);
        toast({
          variant: "destructive",
          title: "Error saving puzzle",
          description: "There was a problem saving your progress.",
        });
      }
    }, 1000);

    setSaveTimeout(timeout);
  };

  return { saveState, lastSaved };
}
