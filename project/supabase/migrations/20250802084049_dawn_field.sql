/*
  # Remove Pooja Collections Table

  1. Changes
    - Drop `pooja_collections` table completely
    - Remove all associated policies and constraints
    - Clean up any references

  2. Reason
    - Pooja collection feature has been removed from the website
    - No payment-related functionality needed
    - Keeping database clean and focused on core features

  3. Tables Affected
    - `pooja_collections` - DROPPED
*/

-- Drop the pooja_collections table completely
DROP TABLE IF EXISTS pooja_collections CASCADE;

-- Note: CASCADE will automatically remove any dependent objects like policies, constraints, etc.