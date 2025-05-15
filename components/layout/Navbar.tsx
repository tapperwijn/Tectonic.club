"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Grid, BookOpen, PenTool, TowerControl as GameController2, Trophy } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home', icon: <Grid size={18} /> },
    { href: '/blog', label: 'Blog', icon: <BookOpen size={18} /> },
    { href: '/solver', label: 'Solver', icon: <PenTool size={18} /> },
    { href: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={18} /> },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-sm border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-dm-sans font-bold text-xl md:text-2xl text-primary">Tectonic</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent/10 transition-all duration-300 flex items-center space-x-1"
              >
                <span className="hidden lg:inline-block">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <Button className="ml-2" size="sm">
              <GameController2 className="mr-2 h-4 w-4" />
              Play Store
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-accent/10 transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card animate-fadeIn border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-accent/10 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Button className="w-full justify-center" size="sm">
                <GameController2 className="mr-2 h-4 w-4" />
                Play Store
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;