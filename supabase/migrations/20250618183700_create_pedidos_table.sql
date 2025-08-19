/*
  # Create pedidos table

  1. New Tables
    - `pedidos`
      - `id` (uuid, primary key)
      - `imagem` (text, optional)
      - `nome_cliente` (text, required)
      - `categoria` (text, required)
      - `tamanho` (text)
      - `descricao` (text, required)
      - `aramado` (boolean, default false)
      - `galeria` (boolean, default false)
      - `para_render` (boolean, default false)
      - `data_created` (timestamptz, default now())
      - `data_prevista_entrega` (timestamptz, optional)
      - `stones` (jsonb, for storing stone data)
      - `referencia_modelo` (jsonb, for storing model reference)
      - `riscado` (boolean, default false)
      - `prioridade` (integer, default 1)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `pedidos` table
    - Add policies for users to manage their own pedidos
*/

-- Drop table if exists to recreate with correct structure
DROP TABLE IF EXISTS pedidos;

CREATE TABLE pedidos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  imagem text,
  nome_cliente text NOT NULL,
  categoria text NOT NULL,
  tamanho text NOT NULL,
  descricao text NOT NULL,
  aramado boolean DEFAULT false,
  galeria boolean DEFAULT false,
  para_render boolean DEFAULT false,
  data_created timestamptz DEFAULT now(),
  data_prevista_entrega timestamptz,
  stones jsonb DEFAULT '[]'::jsonb,
  referencia_modelo jsonb DEFAULT '{}'::jsonb,
  riscado boolean DEFAULT false,
  prioridade integer DEFAULT 1,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own pedidos"
  ON pedidos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own pedidos"
  ON pedidos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pedidos"
  ON pedidos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pedidos"
  ON pedidos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pedidos_updated_at
    BEFORE UPDATE ON pedidos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
