-- Create health resources table for Kenya
CREATE TABLE IF NOT EXISTS public.health_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('clinic', 'hospital', 'mental-health', 'program', 'pharmacy')),
  address TEXT NOT NULL,
  county TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  hours TEXT,
  services TEXT[] NOT NULL DEFAULT '{}',
  cost TEXT NOT NULL DEFAULT 'Free',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (though this is public data, good practice)
ALTER TABLE public.health_resources ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read health resources (public data)
CREATE POLICY "health_resources_select_all"
  ON public.health_resources FOR SELECT
  USING (is_active = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_health_resources_type ON public.health_resources(type);
CREATE INDEX IF NOT EXISTS idx_health_resources_county ON public.health_resources(county);
CREATE INDEX IF NOT EXISTS idx_health_resources_location ON public.health_resources(latitude, longitude);
