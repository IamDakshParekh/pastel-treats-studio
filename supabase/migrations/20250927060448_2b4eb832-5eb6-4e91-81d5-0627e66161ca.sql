-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are viewable by everyone
CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews are viewable by everyone
CREATE POLICY "Reviews are viewable by everyone" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create their own reviews" 
ON public.reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update their own reviews" 
ON public.reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete their own reviews" 
ON public.reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Gallery is viewable by everyone
CREATE POLICY "Gallery is viewable by everyone" 
ON public.gallery 
FOR SELECT 
USING (is_active = true);

-- Create content table for about section and other dynamic content
CREATE TABLE public.content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE,
  title TEXT,
  content TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on content
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;

-- Content is viewable by everyone
CREATE POLICY "Content is viewable by everyone" 
ON public.content 
FOR SELECT 
USING (is_active = true);

-- Add triggers for updated_at columns
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at
BEFORE UPDATE ON public.gallery
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_updated_at
BEFORE UPDATE ON public.content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample products data
INSERT INTO public.products (name, description, price, category, image_url, stock) VALUES
('Artisan Dark Chocolate', 'Rich 70% cocoa dark chocolate crafted with premium beans', 12.99, 'chocolates', '/src/assets/chocolates.jpg', 50),
('Vanilla Bean Cupcakes', 'Fluffy vanilla cupcakes with buttercream frosting', 4.50, 'cupcakes', '/src/assets/cupcakes.jpg', 30),
('French Macarons', 'Delicate almond flour cookies with ganache filling', 18.99, 'macarons', '/src/assets/macarons.jpg', 25),
('Premium Gift Box', 'Elegant assortment of our finest confections', 45.99, 'gift-boxes', '/src/assets/gift-boxes.jpg', 15),
('Milk Chocolate Truffles', 'Smooth milk chocolate with various fillings', 16.99, 'chocolates', '/src/assets/chocolates.jpg', 40),
('Red Velvet Cupcakes', 'Classic red velvet with cream cheese frosting', 5.25, 'cupcakes', '/src/assets/cupcakes.jpg', 20),
('Chocolate Macarons', 'Decadent chocolate macarons with dark ganache', 19.99, 'macarons', '/src/assets/macarons.jpg', 30),
('Holiday Special Box', 'Festive collection of seasonal treats', 52.99, 'gift-boxes', '/src/assets/gift-boxes.jpg', 10);

-- Insert content data
INSERT INTO public.content (section, title, content, image_url) VALUES
('hero', 'Sweet Dreams Confectionery', 'Creating moments of pure joy through exceptional confections since 1952. Every sweet tells a story of tradition, quality, and love.', '/src/assets/hero-sweets.jpg'),
('about', 'Our Sweet Story', 'For over 70 years, Sweet Dreams Confectionery has been crafting the finest sweets with passion and dedication. Our master confectioners use only the highest quality ingredients, combining traditional techniques with innovative flavors to create unforgettable experiences. From our signature chocolates to our delicate pastries, every creation is a testament to our commitment to excellence and the joy of sharing something truly special.', '/src/assets/chocolates.jpg');

-- Insert gallery data
INSERT INTO public.gallery (title, description, image_url, display_order) VALUES
('Artisan Chocolates', 'Hand-crafted chocolates made with premium ingredients', '/src/assets/chocolates.jpg', 1),
('Gourmet Cupcakes', 'Freshly baked cupcakes with creative flavors', '/src/assets/cupcakes.jpg', 2),
('French Macarons', 'Delicate macarons in a variety of flavors', '/src/assets/macarons.jpg', 3),
('Gift Collections', 'Beautiful gift boxes for every occasion', '/src/assets/gift-boxes.jpg', 4);