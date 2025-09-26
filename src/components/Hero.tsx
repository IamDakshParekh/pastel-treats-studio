import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-sweets.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Premium artisanal sweets and confections" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40 hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 bounce-in">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Handcrafted with Love</span>
          </div>

          {/* Headline */}
          <h1 className="font-sweet text-5xl md:text-7xl lg:text-8xl text-primary mb-6 fade-in-up">
            Sweet Dreams
          </h1>
          
          <h2 className="font-sweet text-2xl md:text-4xl text-accent mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            Artisanal Confections
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up" style={{ animationDelay: '0.4s' }}>
            Indulge in our handcrafted collection of premium sweets, chocolates, and confections. 
            Made with the finest ingredients and traditional techniques passed down through generations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="btn-sweet group px-8 py-4 text-lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-4 text-lg transition-smooth"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Our Story
            </Button>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 opacity-30 float" style={{ animationDelay: '1s' }}>
            <div className="text-6xl">🧁</div>
          </div>
          <div className="absolute top-40 right-20 opacity-30 float" style={{ animationDelay: '1.5s' }}>
            <div className="text-5xl">🍫</div>
          </div>
          <div className="absolute bottom-40 left-20 opacity-30 float" style={{ animationDelay: '2s' }}>
            <div className="text-4xl">🍭</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;