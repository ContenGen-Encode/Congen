"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-6 md:px-10 fixed top-0 bg-background/80 backdrop-blur-md z-50">
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="font-bold text-2xl gradient-text">Congen</Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-congen-500 transition-colors">Features</a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-congen-500 transition-colors">How It Works</a>
          <a href="#testimonials" className="text-foreground/80 hover:text-congen-500 transition-colors">Testimonials</a>
          <a href="#pricing" className="text-foreground/80 hover:text-congen-500 transition-colors">Pricing</a>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline" 
            className="border-primary/20 text-primary hover:bg-primary/10 transition-colors" 
            asChild
          >
            <SignInButton>
              Log in
            </SignInButton>
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors" 
            asChild
          >
            <SignUpButton>
              Get Started
            </SignUpButton>
          </Button>
        </div>
        
        <button className="md:hidden text-foreground" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg p-6 z-50">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className="text-foreground/80 hover:text-congen-500 transition-colors" onClick={toggleMenu}>Features</a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-congen-500 transition-colors" onClick={toggleMenu}>How It Works</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-congen-500 transition-colors" onClick={toggleMenu}>Testimonials</a>
            <a href="#pricing" className="text-foreground/80 hover:text-congen-500 transition-colors" onClick={toggleMenu}>Pricing</a>
            <div className="flex flex-col space-y-2 pt-4">
              <Button 
                variant="outline" 
                className="border-primary/20 text-primary hover:bg-primary/10 transition-colors w-full"
              >
                Log in
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors w-full"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
