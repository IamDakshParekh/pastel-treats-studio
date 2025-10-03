import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
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
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const customOrderSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(1, 'Phone is required').max(20),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

const Products = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setProducts(data || []);
      
      // Extract unique categories from products
      const uniqueCategories = ['all', ...new Set((data || []).map(product => product.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  const getProductCount = (category: string) => {
    if (category === 'all') return products.length;
    return products.filter(product => product.category === category).length;
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

  if (loading) {
    return (
      <section id="products" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-sweet text-4xl md:text-5xl text-foreground mb-4">
            Our Sweet Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted confections, made with love and the finest ingredients
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="capitalize sweet-hover"
            >
              {category === 'all' ? 'All Products' : category.replace('-', ' ')} 
              <span className="ml-2 text-xs bg-primary/20 px-2 py-1 rounded-full">
                {getProductCount(category)}
              </span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">
                No products found in this category
              </p>
            </div>
          )}
        </div>

        {/* Custom Orders Banner */}
        <div className="mt-16 p-8 bg-primary/10 rounded-2xl text-center">
          <h3 className="font-sweet text-2xl md:text-3xl text-primary mb-4">
            Custom Orders Available! 🎂
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Looking for something special? We create custom confections for weddings, birthdays, and special events.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gold">
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
                  <Label htmlFor="product-name">Name</Label>
                  <Input
                    id="product-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-email">Email</Label>
                  <Input
                    id="product-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-phone">Phone</Label>
                  <Input
                    id="product-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-message">Message</Label>
                  <Textarea
                    id="product-message"
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
        </div>
      </div>
    </section>
  );
};

export default Products;