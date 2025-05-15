"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readingTime: string;
  category: string;
  coverImage: string;
  index: number;
}

const MotionDiv = motion.div;

const BlogCard = ({
  title,
  excerpt,
  slug,
  date,
  readingTime,
  category,
  coverImage,
  index,
}: BlogCardProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-blue transition-all duration-300"
    >
      <Link href={`/blog/${slug}`} className="group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
          />
          <div className="absolute top-0 left-0 m-4">
            <span className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md">
              {category}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
          <div className="flex items-center text-xs text-muted-foreground space-x-4">
            <div className="flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};

export default BlogCard;