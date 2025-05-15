import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Post {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  content: string;
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'app/blog/posts');
  const files = await fs.readdir(postsDirectory);
  return files.map((file) => ({
    slug: file.replace('.mdx', ''),
  }));
}

async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(process.cwd(), 'app/blog/posts', `${slug}.mdx`);
  
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
      // Make sure date is in ISO format
    const dateStr = data.date instanceof Date 
      ? data.date.toISOString()
      : new Date(data.date).toISOString();

    return {
      title: data.title,
      date: dateStr,
      excerpt: data.excerpt,
      category: data.category,
      coverImage: data.coverImage,
      readingTime: data.readingTime,
      content: content,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const slug = await Promise.resolve(params.slug);
  const post = await getPost(slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="aspect-w-16 aspect-h-9 relative mb-6 h-[400px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>        <div className="flex items-center gap-4 text-muted-foreground">
          <time dateTime={post.date.toString()}>
            {format(new Date(post.date), 'LLLL d, yyyy')}
          </time>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <span>{post.category}</span>
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
