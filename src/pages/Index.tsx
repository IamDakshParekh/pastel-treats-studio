import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';
import Cart from '@/components/Cart';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Products />
      <About />
      <Reviews />
      <Contact />
      <Cart />
      
      {/* Footer */}
      <footer className="bg-foreground/5 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center sweet-shadow">
                  <span className="text-xl">🍭</span>
                </div>
                <h3 className="font-sweet text-2xl text-primary">Sweet Dreams</h3>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Creating moments of pure joy through exceptional confections since 1952. 
                Every sweet tells a story of tradition, quality, and love.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  📘
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  📷
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  🐦
                </button>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>📍 123 Sweet Street</li>
                <li>📞 +1 (555) 123-SWEET</li>
                <li>✉️ hello@sweetdreams.com</li>
                <li>🕒 Mon-Fri: 8AM-8PM</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Sweet Dreams Confectionery. All rights reserved. Made with 💖 for sweet lovers everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
