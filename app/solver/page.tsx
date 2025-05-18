"use client";

import TectonicGrid from "@/components/tectonic-grid/TectonicGrid";

export default function SolverPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tectonic Solver</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your Tectonic puzzle and get a solution with step-by-step explanations.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <br />
            1. Built the regions in builder mode. <br />
            2. Input the givens, numbers and or scribbles in the solver mode.
            <br />
            3. Finally click show next step to get the solution!
          </p>
        </div>
        <div className="flex justify-center mb-12">
          <TectonicGrid initialMode="solver" initialWidth={6} initialHeight={6} />
        </div>
      </div>
    </div>
  );
}