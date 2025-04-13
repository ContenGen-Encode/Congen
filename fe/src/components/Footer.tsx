"use client"

import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="font-bold text-2xl gradient-text mb-4">Congen</div>
            <p className="text-muted-foreground mb-4">
              AI-powered platform for creating viral brain rot videos and automating content distribution.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Features</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Testimonials</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Changelog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">About</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Partners</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">GDPR</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-congen-500 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Congen. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="mailto:support@congen.ai" className="text-sm text-muted-foreground hover:text-congen-500 transition-colors flex items-center">
              <Mail size={16} className="mr-1" />
              support@congen.ai
            </a>
            <a href="https://github.com/congen" className="text-sm text-muted-foreground hover:text-congen-500 transition-colors flex items-center">
              <Github size={16} className="mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;