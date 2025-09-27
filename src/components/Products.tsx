import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [loading, setLoading] = useState(true);
  
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
          <Button className="btn-gold">
            Contact Us for Custom Orders
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;