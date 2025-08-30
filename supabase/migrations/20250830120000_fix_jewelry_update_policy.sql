/*
  # Fix RLS for updating jewelry

  - Allow authenticated users to update rows they own
  - Also allow updating rows with NULL user_id (claiming unowned rows)
  - Enforce that after update the row belongs to the current user
*/

-- Drop old update policy if it exists
DROP POLICY IF EXISTS "Users can update their own jewelry" ON jewelry;

-- Create new update policy with USING and WITH CHECK
CREATE POLICY "Users can update or claim jewelry"
  ON jewelry
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id);

