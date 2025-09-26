import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import { Product } from '@/contexts/CartContext';
import macaronsImage from '@/assets/macarons.jpg';
import chocolatesImage from '@/assets/chocolates.jpg';
import cupcakesImage from '@/assets/cupcakes.jpg';
import giftBoxesImage from '@/assets/gift-boxes.jpg';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Macarons', 'Chocolates', 'Cupcakes', 'Gift Boxes'];

  const products: Product[] = [
    {
      id: '1',
      name: 'French Macarons Set',
      price: 24.99,
      image: macaronsImage,
      description: 'Delicate almond cookies with silky ganache filling in assorted flavors.',
      category: 'Macarons'
    },
    {
      id: '2',
      name: 'Artisanal Chocolate Box',
      price: 34.99,
      image: chocolatesImage,
      description: 'Premium Belgian chocolates with unique fillings and elegant presentation.',
      category: 'Chocolates'
    },
    {
      id: '3',
      name: 'Vanilla Dream Cupcakes',
      price: 18.99,
      image: cupcakesImage,
      description: 'Fluffy vanilla cupcakes topped with buttercream and edible flowers.',
      category: 'Cupcakes'
    },
    {
      id: '4',
      name: 'Festive Gift Collection',
      price: 49.99,
      image: giftBoxesImage,
      description: 'Elegant gift boxes with assorted confections perfect for special occasions.',
      category: 'Gift Boxes'
    },
    {
      id: '5',
      name: 'Rose Petal Macarons',
      price: 28.99,
      image: macaronsImage,
      description: 'Delicate rose-flavored macarons with real rose petals and pink buttercream.',
      category: 'Macarons'
    },
    {
      id: '6',
      name: 'Dark Chocolate Truffles',
      price: 26.99,
      image: chocolatesImage,
      description: 'Rich dark chocolate truffles dusted with cocoa powder and sea salt.',
      category: 'Chocolates'
    },
    {
      id: '7',
      name: 'Birthday Celebration Set',
      price: 39.99,
      image: cupcakesImage,
      description: 'Colorful birthday cupcakes with rainbow sprinkles and candles included.',
      category: 'Cupcakes'
    },
    {
      id: '8',
      name: 'Premium Holiday Box',
      price: 64.99,
      image: giftBoxesImage,
      description: 'Luxury holiday collection with seasonal treats and premium packaging.',
      category: 'Gift Boxes'
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-sweet text-4xl md:text-5xl text-primary mb-4">
            Our Sweet Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handcrafted selection of premium confections, made with love and the finest ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "btn-sweet" 
                : "border-primary/30 text-primary hover:bg-primary/10 transition-smooth"
              }
            >
              {category}
              {category !== 'All' && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 bg-background/80 text-foreground"
                >
                  {products.filter(p => p.category === category).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="fade-in-up">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try selecting a different category.</p>
          </div>
        )}

        {/* Featured Banner */}
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