import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import BlogImage from '@/components/ui/blog-image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import BlogSidebar from '@/components/blog/BlogSidebar';
import { cn } from "@/lib/utils";

interface Post {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readingTime: string;
  content: string;
  slug?: string;
}

async function getAllPosts(): Promise<Post[]> {
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
  
  return posts;
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
  const allPosts = await getAllPosts();
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const contentWithoutTitle = post.content.replace(/^#\s+.*$/m, '').trim();

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== slug)
    .map(p => ({
      title: p.title,
      slug: p.slug!,
      category: p.category
    }));

  const allCategories = Array.from(new Set(allPosts.map(p => p.category)));

  return (    <div className="container mx-auto px-4 py-12 pb-[50px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
        <article className="max-w-3xl mx-auto w-full">
          {/* Header Section */}
          <header className="mb-8">
            <div className={cn(
              "relative w-full overflow-hidden rounded-lg bg-muted",
              "before:block before:pt-[56.25%]" // 16:9 aspect ratio
            )}>              <BlogImage
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                priority
                quality={95}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRsdHR4dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/2wBDAR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR3/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <time dateTime={post.date.toString()} className="font-medium">
                {format(new Date(post.date), 'LLLL d, yyyy')}
              </time>
              <span>•</span>
              <span className="font-medium">{post.readingTime}</span>
              <span>•</span>
              <span className="font-medium">{post.category}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {post.excerpt}
            </p>          </header>

          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none mx-auto">
            <MDXRemote source={contentWithoutTitle} />
          </div>
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start max-w-[300px] mx-auto w-full">
          <BlogSidebar
            currentCategory={post.category}
            relatedPosts={relatedPosts}
            allCategories={allCategories}
          />
        </aside>
      </div>
    </div>
  );
}
