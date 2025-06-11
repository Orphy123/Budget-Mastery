import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          annual_income: number;
          monthly_income: number;
          rent: number;
          city: string;
          risk_tolerance: 'conservative' | 'balanced' | 'aggressive';
          investment_experience: 'novice' | 'intermediate' | 'advanced';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          annual_income?: number;
          monthly_income?: number;
          rent?: number;
          city?: string;
          risk_tolerance?: 'conservative' | 'balanced' | 'aggressive';
          investment_experience?: 'novice' | 'intermediate' | 'advanced';
        };
        Update: {
          email?: string;
          full_name?: string | null;
          annual_income?: number;
          monthly_income?: number;
          rent?: number;
          city?: string;
          risk_tolerance?: 'conservative' | 'balanced' | 'aggressive';
          investment_experience?: 'novice' | 'intermediate' | 'advanced';
        };
      };
      user_expenses: {
        Row: {
          id: string;
          user_id: string;
          car: number;
          student_loans: number;
          insurance: number;
          utilities: number;
          groceries: number;
          other: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          car?: number;
          student_loans?: number;
          insurance?: number;
          utilities?: number;
          groceries?: number;
          other?: number;
        };
        Update: {
          car?: number;
          student_loans?: number;
          insurance?: number;
          utilities?: number;
          groceries?: number;
          other?: number;
        };
      };
      financial_goals: {
        Row: {
          id: string;
          user_id: string;
          emergency_fund: number;
          yearly_investment: number;
          specific_goals: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          emergency_fund?: number;
          yearly_investment?: number;
          specific_goals?: string[];
        };
        Update: {
          emergency_fund?: number;
          yearly_investment?: number;
          specific_goals?: string[];
        };
      };
      budget_allocations: {
        Row: {
          id: string;
          user_id: string;
          needs: number;
          wants: number;
          savings: number;
          investments: number;
          created_at: string;
        };
        Insert: {
          user_id: string;
          needs: number;
          wants: number;
          savings: number;
          investments: number;
        };
        Update: {
          needs?: number;
          wants?: number;
          savings?: number;
          investments?: number;
        };
      };
    };
  };
}