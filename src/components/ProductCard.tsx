import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  return (
    <Card className="group product-card overflow-hidden border-0 bg-card">
      <div className="relative overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground"
        >
          {product.category}
        </Badge>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Overlay with Add to Cart */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            onClick={handleAddToCart}
            className="btn-sweet transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleAddToCart}
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;