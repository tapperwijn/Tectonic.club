"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Post {
  title: string;
  slug: string;
  category: string;
}

interface BlogSidebarProps {
  currentCategory: string;
  relatedPosts: Post[];
  allCategories: string[];
}

export default function BlogSidebar({
  currentCategory,
  relatedPosts,
  allCategories
}: BlogSidebarProps) {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {allCategories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className={`block px-3 py-2 rounded-md transition-colors ${
                category === currentCategory
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      </Card>

      {relatedPosts.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
          <div className="space-y-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block hover:text-primary transition-colors"
              >
                {post.title}
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
