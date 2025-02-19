/*
  # Fix jewelry table schema

  1. Changes
    - Drop existing jewelry table
    - Create new jewelry table with correct fields
    - Add proper RLS policies
    
  2. New Fields
    - reference_name (text, required)
    - category (text, required)
    - weight (numeric)
    - finish (text)
    - size (text)
    - designer (text)
    - target_audience (text)
    - client_name (text)
    - observations (text)
    - stones (jsonb)
    - image_url (text)
    - user_id (uuid, required, references auth.users)
    - created_at (timestamptz)

  3. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own jewelry
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS jewelry;

-- Create new jewelry table with correct schema
CREATE TABLE jewelry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_name text NOT NULL,
  category text NOT NULL,
  weight numeric,
  finish text,
  size text,
  designer text,
  target_audience text,
  client_name text,
  observations text,
  stones jsonb,
  image_url text,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE jewelry ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own jewelry"
  ON jewelry
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jewelry"
  ON jewelry
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jewelry"
  ON jewelry
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jewelry"
  ON jewelry
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create storage bucket for jewelry images
INSERT INTO storage.buckets (id, name)
VALUES ('jewelry-images', 'jewelry-images')
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies
CREATE POLICY "Authenticated users can upload jewelry images"
ON storage.objects FOR INSERT TO authenticated WITH CHECK (
  bucket_id = 'jewelry-images'
);

CREATE POLICY "Authenticated users can update their jewelry images"
ON storage.objects FOR UPDATE TO authenticated USING (
  bucket_id = 'jewelry-images'
);

CREATE POLICY "Anyone can view jewelry images"
ON storage.objects FOR SELECT TO public USING (
  bucket_id = 'jewelry-images'
);