"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Video, Sparkles, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 hero-gradient">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block bg-congen-100 rounded-full px-4 py-1 text-congen-600 font-medium mb-2">
              <span className="flex items-center gap-1">
                <Sparkles size={16} />
                AI-Powered Content Creation
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Create Viral <span className="gradient-text">Brain Rot</span> Videos with AI
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl">
              Generate engaging video scripts, automate content creation, and publish directly to social platforms and Zora with our all-in-one AI solution.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/20 text-primary hover:bg-primary/10 transition-colors"
              >
                Watch Demo
                <Video className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs">JD</div>
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">SK</div>
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">RL</div>
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">+5</div>
              </div>
              <p className="text-sm">Join 5,000+ content creators</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden animate-float border border-white">
              <div className="bg-gradient-to-r from-congen-400 to-accent h-2"></div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap size={20} className="text-congen-500" />
                    <h3 className="font-semibold">AI Script Generator</h3>
                  </div>
                  <div className="bg-muted p-4 rounded-lg text-sm">
                    <p className="text-muted-foreground mb-2">{"//"} Generate a viral brain rot video script</p>
                    <p><span className="text-congen-500">Generate</span>(&quot;A funny video about cats reacting to cucumber pranks&quot;)</p>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <p className="text-sm font-medium mb-2">Generated Script:</p>
                    <div className="space-y-2 text-sm">
                      <p>1. Start with a cat sleeping peacefully</p>
                      <p>2. Caption: &quot;Cats have never evolved to fear cucumbers&quot;</p>
                      <p>3. Show cucumber being placed behind cat</p>
                      <p>4. Caption: &quot;So why do they jump like this?&quot;</p>
                      <p>5. Show cat jumping reaction with funny sound effect</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
                    >
                      Create Video
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-6 -right-6 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-congen-400/20 rounded-full filter blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
