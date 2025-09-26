import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Shop',
      details: '123 Sweet Street, Confection City, CC 12345',
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-SWEET',
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@sweetdreams.com',
      action: 'Send Email'
    }
  ];

  const hours = [
    { day: 'Monday - Friday', time: '8:00 AM - 8:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 9:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 6:00 PM' }
  ];

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
                    <Button className="btn-gold">
                      Chat on WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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

            {/* Special Notice */}
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-sweet text-xl text-primary mb-2">Special Events</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Planning a wedding, birthday, or corporate event? We offer special packages and bulk discounts.
                </p>
                <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-center">Follow Our Sweet Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    📘
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    📷
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    🐦
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    📌
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  @sweetdreamsbakery
                </p>
              </CardContent>
            </Card>
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