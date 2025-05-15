import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const files = await fs.readdir(postsDirectory);
  
  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        ...data,
        slug: filename.replace('.mdx', ''),
      } as Post;
    })
  );
  
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}