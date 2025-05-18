"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

const MotionDiv = motion.div;

const HeroSection = () => {
  return (
    <section className="hero-section relative overflow-hidden py-4 md:py-6">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center max-w-6xl mx-auto mb-16">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                Challenge Your Mind with{" "}
                <span className="text-primary">Tectonic</span>
              </h1>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-lg text-foreground/80 mb-6">
                A modern puzzle game that tests your logical thinking and pattern recognition abilities. Solve puzzles, build your own, and compete globally.
              </p>
            </MotionDiv>
            
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Start Playing <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn How
              </Button>
            </MotionDiv>
          </div>

          {/* Right Column - Phone Image */}
          <MotionDiv
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[360px] h-[640px] sm:w-[480px] sm:h-[800px]">
              <Image
                src="/phone-mockup.png"
                alt="Tectonic Puzzle on Phone"
                fill
                className="object-contain"
                priority
              />
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