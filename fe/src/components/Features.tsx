"use client"

import React from 'react';
import { CheckCircle, BrainCircuit, Upload, Pencil, Share2, Database } from 'lucide-react';

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "AI Script Generation",
    description: "Generate engaging video scripts tailored for short-form content that captures audience attention.",
    color: "bg-congen-100 text-congen-600"
  },
  {
    icon: <Pencil className="w-6 h-6" />,
    title: "Brain Rot Clip Library",
    description: "Access thousands of trending clips to pair with your scripts for maximum engagement.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: <Upload className="w-6 h-6" />,
    title: "Automated Editing",
    description: "Automatically combine scripts with relevant video clips for seamless content creation.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Multi-platform Publishing",
    description: "Publish directly to TikTok, Instagram, YouTube Shorts, and other social platforms.",
    color: "bg-orange-100 text-orange-600"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Zora Integration",
    description: "Mint your content as NFTs directly to Zora for additional monetization opportunities.",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Performance Analytics",
    description: "Track engagement, views, and growth metrics across all your published content.",
    color: "bg-red-100 text-red-600"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All-in-One <span className="gradient-text">Content Creation</span> Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, edit, and publish viral short-form content, powered by advanced AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 border border-border shadow-sm card-hover"
            >
              <div className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;