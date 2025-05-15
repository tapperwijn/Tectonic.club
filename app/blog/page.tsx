import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";

// Mock blog data (would be fetched from MDX in production)
const posts = [
  {
    title: "How to Solve Tectonic Puzzles: A Beginner's Guide",
    slug: "how-to-solve-tectonic-puzzles",
    excerpt: "Learn the basic techniques and strategies to solve Tectonic puzzles efficiently, even as a complete beginner.",
    date: "May 15, 2025",
    readingTime: "5 min read",
    category: "Tutorial",
    coverImage: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Advanced Tectonic Techniques: Breaking Through Plateaus",
    slug: "advanced-tectonic-techniques",
    excerpt: "Discover expert-level strategies to solve the most challenging Tectonic puzzles and improve your solving speed.",
    date: "May 10, 2025",
    readingTime: "8 min read",
    category: "Strategy",
    coverImage: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "The History of Tectonic Puzzles and Their Evolution",
    slug: "history-of-tectonic-puzzles",
    excerpt: "Explore the origins of Tectonic puzzles, how they evolved over time, and their cultural impact around the world.",
    date: "May 5, 2025",
    readingTime: "6 min read",
    category: "History",
    coverImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Creating Challenging Tectonic Puzzles: Design Principles",
    slug: "creating-challenging-tectonic-puzzles",
    excerpt: "Learn the art of designing Tectonic puzzles that are challenging yet solvable, with balanced difficulty progression.",
    date: "April 28, 2025",
    readingTime: "10 min read",
    category: "Design",
    coverImage: "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "The Psychology Behind Puzzle Solving: Benefits for Your Brain",
    slug: "psychology-behind-puzzle-solving",
    excerpt: "Discover how solving Tectonic puzzles and similar logic games can improve cognitive function and mental well-being.",
    date: "April 20, 2025",
    readingTime: "7 min read",
    category: "Science",
    coverImage: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    title: "Tectonic Puzzles in Education: Teaching Logical Reasoning",
    slug: "tectonic-puzzles-in-education",
    excerpt: "Explore how Tectonic puzzles can be incorporated into educational curricula to develop critical thinking skills.",
    date: "April 15, 2025",
    readingTime: "9 min read",
    category: "Education",
    coverImage: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tectonic Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our articles, tutorials, and insights about the world of Tectonic puzzles.
          </p>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "Tutorial", "Strategy", "History", "Design", "Science", "Education"].map((category) => (
            <Link
              key={category}
              href={category === "All" ? "/blog" : `/blog/category/${category.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm ${
                category === "All" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card hover:bg-primary/10 transition-colors"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              slug={post.slug}
              date={post.date}
              readingTime={post.readingTime}
              category={post.category}
              coverImage={post.coverImage}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}