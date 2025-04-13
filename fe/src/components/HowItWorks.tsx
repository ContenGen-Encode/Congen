"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Film, Edit, Share } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: <FileText className="w-6 h-6" />,
    title: "Generate Script",
    description: "Enter a topic or prompt and our AI will generate an engaging script optimized for viral short-form content."
  },
  {
    number: "02",
    icon: <Film className="w-6 h-6" />,
    title: "Select Clips",
    description: "Browse our extensive library of brain rot clips or upload your own to match with your script."
  },
  {
    number: "03",
    icon: <Edit className="w-6 h-6" />,
    title: "Automatic Editing",
    description: "Our AI editor combines your script and selected clips into a cohesive video with captions, transitions, and effects."
  },
  {
    number: "04",
    icon: <Share className="w-6 h-6" />,
    title: "Publish & Share",
    description: "Publish directly to multiple social platforms and Zora with customized captions and hashtags."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-secondary">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">Congen</span> Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create viral content in minutes, not hours, with our streamlined AI-powered workflow.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-congen-300 to-accent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border border-border shadow-sm relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-congen-100 text-congen-600 font-bold px-3 py-1 rounded-full text-sm">
                    {step.number}
                  </div>
                  <div className="text-congen-500">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-congen-500 hover:bg-congen-600 text-white">
            Try It Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;