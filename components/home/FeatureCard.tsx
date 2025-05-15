"use client";

import Link from "next/link";
import Image from "next/image";
import { DivideIcon as LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl?: string;
  link: string;
  linkText: string;
  index: number;
}

const MotionDiv = motion.div;

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  imageUrl,
  link,
  linkText,
  index,
}: FeatureCardProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-blue transition-all duration-300"
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            className="object-cover transition-transform duration-500 hover:scale-105"
            fill
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 p-2 rounded-md">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button asChild variant="outline" className="w-full justify-center group">
          <Link href={link}>
            {linkText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </MotionDiv>
  );
};

export default FeatureCard;