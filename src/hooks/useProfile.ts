import { useState, useEffect } from 'react';
import { supabase, Database } from '../lib/supabase';
import { useAuth } from './useAuth';
import { FinancialProfile } from '../types';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
type UserExpenses = Database['public']['Tables']['user_expenses']['Row'];
type FinancialGoals = Database['public']['Tables']['financial_goals']['Row'];

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FinancialProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (!profileData) {
        setProfile(null);
        setLoading(false);
        return;
      }

      // Fetch expenses
      const { data: expensesData, error: expensesError } = await supabase
        .from('user_expenses')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (expensesError && expensesError.code !== 'PGRST116') {
        throw expensesError;
      }

      // Fetch financial goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (goalsError && goalsError.code !== 'PGRST116') {
        throw goalsError;
      }

      // Combine data into FinancialProfile format
      const combinedProfile: FinancialProfile = {
        annualIncome: profileData.annual_income,
        monthlyIncome: profileData.monthly_income,
        rent: profileData.rent,
        city: profileData.city,
        riskTolerance: profileData.risk_tolerance,
        investmentExperience: profileData.investment_experience,
        otherExpenses: {
          car: expensesData?.car || 0,
          studentLoans: expensesData?.student_loans || 0,
          insurance: expensesData?.insurance || 0,
          utilities: expensesData?.utilities || 0,
          groceries: expensesData?.groceries || 0,
          other: expensesData?.other || 0,
        },
        financialGoals: {
          emergencyFund: goalsData?.emergency_fund || 0,
          yearlyInvestment: goalsData?.yearly_investment || 0,
          specificGoals: goalsData?.specific_goals || [],
        },
      };

      setProfile(combinedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (profileData: FinancialProfile) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      // Upsert user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || null,
          annual_income: profileData.annualIncome,
          monthly_income: profileData.monthlyIncome,
          rent: profileData.rent,
          city: profileData.city,
          risk_tolerance: profileData.riskTolerance,
          investment_experience: profileData.investmentExperience,
        });

      if (profileError) throw profileError;

      // Upsert expenses
      const { error: expensesError } = await supabase
        .from('user_expenses')
        .upsert({
          user_id: user.id,
          car: profileData.otherExpenses.car,
          student_loans: profileData.otherExpenses.studentLoans,
          insurance: profileData.otherExpenses.insurance,
          utilities: profileData.otherExpenses.utilities,
          groceries: profileData.otherExpenses.groceries,
          other: profileData.otherExpenses.other,
        });

      if (expensesError) throw expensesError;

      // Upsert financial goals
      const { error: goalsError } = await supabase
        .from('financial_goals')
        .upsert({
          user_id: user.id,
          emergency_fund: profileData.financialGoals.emergencyFund,
          yearly_investment: profileData.financialGoals.yearlyInvestment,
          specific_goals: profileData.financialGoals.specificGoals,
        });

      if (goalsError) throw goalsError;

      setProfile(profileData);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile');
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    saveProfile,
    refetch: fetchProfile,
  };
}