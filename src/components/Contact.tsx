import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const customOrderSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

interface StoreInfo {
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp_number: string | null;
  map_link: string | null;
}

interface SocialLink {
  platform: string;
  url: string;
}

const Contact = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const hours = [
    { day: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 6:00 PM' }
  ];

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      
      // Fetch store info
      const { data: storeData } = await supabase
        .from('store_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (storeData) {
        setStoreInfo(storeData);
      }

      // Fetch social links
      const { data: socialData } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (socialData) {
        setSocialLinks(socialData);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);

      // Validate form data
      const validatedData = customOrderSchema.parse(formData);

      // Save to Supabase
      const { error } = await supabase
        .from('custom_orders')
        .insert([validatedData]);

      if (error) throw error;

      toast({
        title: 'Thank you! Your custom order request has been received 🎉',
        description: "We'll get back to you soon!",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsDialogOpen(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.issues[0].message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to submit your request. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('facebook')) return <Facebook className="h-5 w-5" />;
    if (lowerPlatform.includes('instagram')) return <Instagram className="h-5 w-5" />;
    if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x')) return <Twitter className="h-5 w-5" />;
    return <span className="text-xl">{platform[0]}</span>;
  };

  const contactInfo = storeInfo ? [
    ...(storeInfo.address ? [{
      icon: MapPin,
      title: 'Visit Our Shop',
      details: storeInfo.address,
      action: 'Get Directions',
      onClick: () => storeInfo.map_link && window.open(storeInfo.map_link, '_blank')
    }] : []),
    ...(storeInfo.phone ? [{
      icon: Phone,
      title: 'Call Us',
      details: storeInfo.phone,
      action: 'Call Now',
      onClick: () => window.location.href = `tel:${storeInfo.phone}`
    }] : []),
    ...(storeInfo.email ? [{
      icon: Mail,
      title: 'Email Us',
      details: storeInfo.email,
      action: 'Send Email',
      onClick: () => window.location.href = `mailto:${storeInfo.email}`
    }] : [])
  ] : [];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-sweet text-4xl md:text-5xl text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions about our products or want to place a custom order.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <>
                <Card className="border-0 bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-9 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-9 w-32" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {contactInfo.map((info, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors flex-shrink-0">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2 text-foreground">
                            {info.title}
                          </h3>
                          <p className="text-muted-foreground mb-3">
                            {info.details}
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={info.onClick}
                            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground"
                          >
                            {info.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* WhatsApp Quick Contact */}
                {storeInfo?.whatsapp_number && (
                  <Card className="bg-accent/20 border-accent/30">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/30 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">Quick WhatsApp Order</h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            Send us a message for instant responses and quick orders
                          </p>
                          <Button 
                            className="btn-gold"
                            onClick={() => window.open(`https://wa.me/${storeInfo.whatsapp_number?.replace(/\D/g, '')}`, '_blank')}
                          >
                            Chat on WhatsApp
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Hours & Info */}
          <div className="space-y-6">
            {/* Store Hours */}
            <Card className="border-0 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Store Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm font-medium">{schedule.day}</span>
                    <span className="text-sm text-primary font-semibold">{schedule.time}</span>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-border">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    💝 Same-day delivery available
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Custom Orders */}
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🎂</div>
                <h3 className="font-sweet text-xl text-primary mb-2">Custom Orders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Planning a wedding, birthday, or corporate event? We create custom confections just for you!
                </p>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                      Contact Us for Custom Orders
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Request a Custom Order</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and we'll get back to you within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCustomOrderSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your custom order..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Social Media */}
            {(loading || socialLinks.length > 0) && (
              <Card className="border-0 bg-card">
                <CardHeader>
                  <CardTitle className="text-center">Follow Our Sweet Journey</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center space-x-4">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </div>
                  ) : (
                    <div className="flex justify-center flex-wrap gap-4">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => window.open(social.url, '_blank')}
                        >
                          {getSocialIcon(social.platform)}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl text-center border border-secondary/30">
          <h3 className="font-sweet text-2xl md:text-3xl text-primary mb-4">
            Stay Sweet with Our Newsletter 📬
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Get exclusive offers, new product announcements, and sweet recipes delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button className="btn-sweet px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;