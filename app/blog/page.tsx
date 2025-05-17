import BlogList from "@/components/blog/BlogList";
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

async function getPosts() {
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
      };
    })
  );
  
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our latest articles, tutorials, and strategies to enhance your puzzle-solving abilities.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </section>
  );
}