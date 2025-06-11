/*
  # Create user profiles and financial data tables

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `annual_income` (numeric)
      - `monthly_income` (numeric)
      - `rent` (numeric)
      - `city` (text)
      - `risk_tolerance` (text)
      - `investment_experience` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_expenses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `car` (numeric, default 0)
      - `student_loans` (numeric, default 0)
      - `insurance` (numeric, default 0)
      - `utilities` (numeric, default 0)
      - `groceries` (numeric, default 0)
      - `other` (numeric, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `financial_goals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `emergency_fund` (numeric, default 0)
      - `yearly_investment` (numeric, default 0)
      - `specific_goals` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `budget_allocations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `needs` (numeric)
      - `wants` (numeric)
      - `savings` (numeric)
      - `investments` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  annual_income numeric DEFAULT 0,
  monthly_income numeric DEFAULT 0,
  rent numeric DEFAULT 0,
  city text DEFAULT '',
  risk_tolerance text DEFAULT 'balanced' CHECK (risk_tolerance IN ('conservative', 'balanced', 'aggressive')),
  investment_experience text DEFAULT 'novice' CHECK (investment_experience IN ('novice', 'intermediate', 'advanced')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_expenses table
CREATE TABLE IF NOT EXISTS user_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  car numeric DEFAULT 0,
  student_loans numeric DEFAULT 0,
  insurance numeric DEFAULT 0,
  utilities numeric DEFAULT 0,
  groceries numeric DEFAULT 0,
  other numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create financial_goals table
CREATE TABLE IF NOT EXISTS financial_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  emergency_fund numeric DEFAULT 0,
  yearly_investment numeric DEFAULT 0,
  specific_goals text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create budget_allocations table
CREATE TABLE IF NOT EXISTS budget_allocations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  needs numeric DEFAULT 0,
  wants numeric DEFAULT 0,
  savings numeric DEFAULT 0,
  investments numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_allocations ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create policies for user_expenses
CREATE POLICY "Users can manage own expenses"
  ON user_expenses
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for financial_goals
CREATE POLICY "Users can manage own goals"
  ON financial_goals
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create policies for budget_allocations
CREATE POLICY "Users can manage own budget"
  ON budget_allocations
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Create function to handle updated_at timestamp
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER user_expenses_updated_at
  BEFORE UPDATE ON user_expenses
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER financial_goals_updated_at
  BEFORE UPDATE ON financial_goals
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();