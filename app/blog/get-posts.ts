import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  slug: string;
}

export async function getPosts(): Promise<Post[]> {
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
