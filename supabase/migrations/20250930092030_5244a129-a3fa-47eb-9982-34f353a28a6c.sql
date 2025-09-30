-- Create custom_orders table
CREATE TABLE public.custom_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.custom_orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert custom orders
CREATE POLICY "Anyone can create custom orders"
ON public.custom_orders
FOR INSERT
WITH CHECK (true);

-- Create store_info table
CREATE TABLE public.store_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT,
  phone TEXT,
  email TEXT,
  whatsapp_number TEXT,
  map_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.store_info ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read store info
CREATE POLICY "Store info is viewable by everyone"
ON public.store_info
FOR SELECT
USING (true);

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read social links
CREATE POLICY "Social links are viewable by everyone"
ON public.social_links
FOR SELECT
USING (is_active = true);

-- Create trigger for store_info updated_at
CREATE TRIGGER update_store_info_updated_at
BEFORE UPDATE ON public.store_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for social_links updated_at
CREATE TRIGGER update_social_links_updated_at
BEFORE UPDATE ON public.social_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();