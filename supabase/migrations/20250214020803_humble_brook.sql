/*
  # Create jewelry table

  1. New Tables
    - `jewelry`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `description` (text)
      - `image_url` (text, required)
      - `price` (numeric, required)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `jewelry` table
    - Add policies for:
      - Authenticated users can read all jewelry
      - Users can only insert/update their own jewelry
*/

CREATE TABLE IF NOT EXISTS jewelry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text NOT NULL,
  price numeric NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE jewelry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jewelry"
  ON jewelry
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own jewelry"
  ON jewelry
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jewelry"
  ON jewelry
  FOR UPDATE
  USING (auth.uid() = user_id);