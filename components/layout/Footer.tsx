import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-dm-sans font-bold text-xl">
              Tectonic
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              A challenging puzzle game that tests your logical thinking and pattern recognition abilities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-dm-sans font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground/70 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/solver" className="text-foreground/70 hover:text-primary transition-colors">
                  Solver
                </Link>
              </li>
              <li>
                <Link href="/builder" className="text-foreground/70 hover:text-primary transition-colors">
                  Builder
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-foreground/70 hover:text-primary transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-dm-sans font-semibold text-lg mb-4">Download</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get Tectonic on your mobile device and play anywhere, anytime.
            </p>
            <div className="space-y-2">
              <Link href="#" className="inline-block bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                Google Play Store
              </Link>
              <Link href="#" className="inline-block bg-foreground text-background px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
                Apple App Store
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Tectonic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;