"use client";

import { HelpCircle, Zap, Settings, BookText, Download } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Beginners Guide How to Play",
    description: "Learn the rules of Tectonic puzzles and how to master Tectonic puzzles and improve your logical thinking.",
    icon: HelpCircle,
    imageUrl: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/blog/how-to-play",
    linkText: "Learn More",
  },
  {
    title: "Advanced tactics & strategies",
    description: "Explore our latest articles, tips, and strategies to enhance your puzzle-solving abilities.",
    icon: BookText,
    imageUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/blog",
    linkText: "Read Blog",
  },
  {
    title: "Tectonic Solver",
    description: "Stuck on a puzzle? Use our advanced solver to find solutions and understand the solving techniques.",
    icon: Zap,
    imageUrl: "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/solver",
    linkText: "Use Solver",
  },

];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Tectonic Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to enjoy, learn, and master the Tectonic puzzle game experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              imageUrl={feature.imageUrl}
              link={feature.link}
              linkText={feature.linkText}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;