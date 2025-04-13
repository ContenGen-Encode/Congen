"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const benefits = [
  "Create viral-worthy content in minutes",
  "Access to thousands of trending clips",
  "Publish to multiple platforms with one click",
  "Mint content as NFTs on Zora",
  "Track performance analytics"
];

const CTA = () => {
  return (
    <section id="pricing" className="py-20 px-6 hero-gradient">
      <div className="container max-w-7xl mx-auto">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-congen-400/10 rounded-full filter blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Creating <span className="gradient-text">Viral Content</span> Today
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of content creators who are revolutionizing their workflow with Congen&apos;s AI-powered platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="bg-secondary rounded-lg p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">Pro Plan</h3>
                  <div className="bg-congen-100 text-congen-600 font-medium px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-congen-500 mr-2 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button size="lg" className="w-full bg-congen-500 hover:bg-congen-600">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Input Your Zapier Webhook</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect Congen to your preferred apps and automate your workflow using Zapier.
                </p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Enter your Zapier webhook URL" 
                    className="w-full px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-congen-500"
                  />
                  <Button variant="outline" className="w-full border-congen-400 text-congen-500 hover:bg-congen-100">
                    Connect with Zapier
                  </Button>
                </div>
              </div>
              
              <div className="bg-congen-100 rounded-lg p-6">
                <h4 className="font-semibold text-congen-800 mb-2">Free Trial Available</h4>
                <p className="text-sm text-congen-700">
                  Try Congen free for 7 days. No credit card required. Experience the full power of AI-driven content creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;