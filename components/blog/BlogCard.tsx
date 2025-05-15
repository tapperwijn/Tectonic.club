"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  readingTime: string;
  category: string;
  coverImage: string;
}

interface BlogCardProps {
  post: Post;
}

const MotionDiv = motion.div;

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="group relative rounded-lg overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 bg-card">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <CalendarDays size={16} />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {post.readingTime}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">{post.category}</span>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
};

export default BlogCard;