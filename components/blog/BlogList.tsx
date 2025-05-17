"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
interface Post {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  slug: string;
}

interface BlogListProps {
  posts: Post[];
}

export default function BlogList({ posts }: BlogListProps) {
  const uniqueCategories = Array.from(new Set(posts.map(post => post.category)));
  const categories = ["All", ...uniqueCategories];

  return (
    <Tabs defaultValue="All" className="mb-8">
      <div className="flex justify-center mb-8">
        <TabsList className="bg-muted/50 p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="data-[state=active]:bg-background relative px-6 py-2"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {categories.map((category) => (
        <TabsContent
          key={category}
          value={category}
          className="mt-0 focus-visible:outline-none focus-visible:ring-0"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {posts
                .filter(post => category === "All" || post.category === category)                .map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BlogCard post={post} priority={index < 3} />
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
