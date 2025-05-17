"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GridControlsProps {
  width: number;
  height: number;
  mode: "solver" | "builder";
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onModeChange: (mode: "solver" | "builder") => void;
  onReset: () => void;
}

export default function GridControls({
  width,
  height,
  mode,
  onWidthChange,
  onHeightChange,
  onModeChange,
  onReset,
}: GridControlsProps) {
  return (    <div className="w-full max-w-[350px] mx-auto mb-8 bg-card rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="width" className="text-sm">Width</Label>
          <Input
            id="width"
            type="number"
            min={3}
            max={10}
            value={width}
            onChange={(e) => onWidthChange(parseInt(e.target.value) || 3)}
            className="h-9"
          />
        </div>
        <div>
          <Label htmlFor="height" className="text-sm">Height</Label>
          <Input
            id="height"
            type="number"
            min={3}
            max={10}
            value={height}
            onChange={(e) => onHeightChange(parseInt(e.target.value) || 3)}
            className="h-9"
          />
        </div>
      </div>      <div className="flex gap-3 items-center">
        <Tabs 
          value={mode} 
          onValueChange={(value) => onModeChange(value as "solver" | "builder")} 
          className="flex-1"
        >
          <TabsList className="w-full grid grid-cols-2 bg-muted">
            <TabsTrigger 
              value="builder" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              Builder
            </TabsTrigger>
            <TabsTrigger 
              value="solver"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
            >
              Solver
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="icon" onClick={onReset} title="Reset Grid" className="h-9 w-9 shrink-0">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
