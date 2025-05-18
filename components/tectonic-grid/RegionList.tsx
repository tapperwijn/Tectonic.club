"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface RegionListProps {
  regions: Set<number>;
  selectedRegion: number | null;
  onRegionSelect: (region: number) => void;
  onAddRegion: () => void;
  onRemoveRegion: (region: number) => void;
}

export default function RegionList({
  regions,
  selectedRegion,
  onRegionSelect,
  onAddRegion,
  onRemoveRegion,
}: RegionListProps) {
  const sortedRegions = Array.from(regions).sort((a, b) => a - b);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Regions</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddRegion}
          className="h-8"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Region
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sortedRegions.map((region) => (
          <div
            key={region}
            className="flex items-center gap-1"
          >
            <Button
              variant={selectedRegion === region ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-8 px-3",
                selectedRegion === region && "ring-2 ring-primary"
              )}
              onClick={() => onRegionSelect(region)}
            >
              Region {region}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => onRemoveRegion(region)}
            >
              ×
            </Button>
          </div>
        ))}
      </div><br />
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Add regions, and click on a region number to activate, then click a cell to assign it to that region</p>
        
        
    </div>
  );
}
