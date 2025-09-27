import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Award, Users, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AboutContent {
  title: string;
  content: string;
  image_url: string;
}

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('section', 'about')
        .single();

      if (error) throw error;
      setAboutContent(data);
    } catch (error) {
      console.error('Error fetching about content:', error);
      // Fallback to default content
      setAboutContent({
        title: 'Our Sweet Story',
        content: 'For over 70 years, Sweet Dreams Confectionery has been crafting the finest sweets with passion and dedication. Our master confectioners use only the highest quality ingredients, combining traditional techniques with innovative flavors to create unforgettable experiences. From our signature chocolates to our delicate pastries, every creation is a testament to our commitment to excellence and the joy of sharing something truly special.',
        image_url: '/src/assets/chocolates.jpg'
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

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
              {aboutContent?.title || 'Three Generations of Sweet Perfection'}
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {aboutContent?.content || 'For over 70 years, Sweet Dreams Confectionery has been crafting the finest sweets with passion and dedication. Our master confectioners use only the highest quality ingredients, combining traditional techniques with innovative flavors to create unforgettable experiences. From our signature chocolates to our delicate pastries, every creation is a testament to our commitment to excellence and the joy of sharing something truly special.'}
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