"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Grid, BookOpen, PenTool, TowerControl as GameController2 } from "lucide-react";

const MotionDiv = motion.div;

const HeroSection = () => {
  return (
    <section className="hero-section relative overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Challenge Your Mind with{" "}
              <span className="text-primary">Tectonic</span>
            </h1>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              A modern puzzle game that tests your logical thinking and pattern recognition abilities. Solve puzzles, build your own, and compete globally.
            </p>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto">
              Start Playing <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn How
            </Button>
          </MotionDiv>
          
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto"
          >
            <div className="flex flex-col items-center">
              <div className="bg-card p-3 rounded-full mb-2">
                <Grid className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-foreground/70">100+ Puzzles</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-card p-3 rounded-full mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-foreground/70">Weekly Tips</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-card p-3 rounded-full mb-2">
                <PenTool className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-foreground/70">Custom Builder</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-card p-3 rounded-full mb-2">
                <GameController2 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm text-foreground/70">Mobile App</span>
            </div>
          </MotionDiv>
        </div>
      </div>
      
      {/* Background blur elements */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;