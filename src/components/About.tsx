import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Award, Users, Clock } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every sweet is handcrafted with passion and attention to detail by our skilled artisans.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We use only the finest ingredients sourced from trusted suppliers around the world.'
    },
    {
      icon: Users,
      title: 'Family Tradition',
      description: 'Our recipes have been passed down through three generations of confectionery masters.'
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'All our products are made fresh daily to ensure the perfect taste and texture.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <Badge variant="secondary" className="mb-6 bg-primary/20 text-primary">
              Our Story
            </Badge>
            
            <h2 className="font-sweet text-4xl md:text-5xl text-primary mb-6">
              Three Generations of Sweet Perfection
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 1952 by Grandma Rose, Sweet Dreams began as a small neighborhood bakery 
                with a simple mission: to bring joy to people's lives through exceptional confections.
              </p>
              
              <p>
                Today, we continue her legacy using the same time-honored recipes and traditional 
                techniques, while incorporating modern innovations to create the perfect balance 
                of nostalgia and contemporary taste.
              </p>
              
              <p>
                Every macaron, chocolate, and sweet treat that leaves our kitchen carries with it 
                the love, care, and expertise that has been refined over seven decades.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center">
                <div className="font-sweet text-3xl text-primary mb-2">70+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="font-sweet text-3xl text-primary mb-2">50k+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/20">
            <h3 className="font-sweet text-2xl md:text-3xl text-primary mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "To create moments of pure joy through exceptional confections that celebrate life's 
              sweetest moments, while preserving the artisanal traditions that make each treat 
              a work of edible art."
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <span className="text-2xl">👑</span>
              <span className="font-sweet text-lg text-primary">- The Sweet Dreams Family</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;