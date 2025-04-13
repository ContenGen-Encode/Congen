import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Congen has completely transformed my content creation process. I'm producing more engaging videos in half the time.",
    author: "Alex Johnson",
    role: "TikTok Creator, 1.2M Followers",
    avatar: "AJ"
  },
  {
    quote: "The AI script generator consistently creates viral-worthy content. My engagement has increased by 300% since using Congen.",
    author: "Samantha Lee",
    role: "Instagram Influencer",
    avatar: "SL"
  },
  {
    quote: "As someone with zero video editing skills, Congen has been a game-changer. The automated editing is seamless and professional.",
    author: "Marcus Williams",
    role: "YouTube Content Creator",
    avatar: "MW"
  },
  {
    quote: "The Zora integration allowed me to monetize my content in ways I never thought possible. Brilliant platform!",
    author: "Taylor Rodriguez",
    role: "Digital Artist & Creator",
    avatar: "TR"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by <span className="gradient-text">Content Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who are transforming their content strategy with Congen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-foreground mb-6 italic">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-congen-500 flex items-center justify-center text-white font-medium mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;