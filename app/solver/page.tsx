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
        </div>
        
        <div className="flex justify-center">
          <TectonicGrid mode="solver" />
        </div>
      </div>
    </div>
  );
}