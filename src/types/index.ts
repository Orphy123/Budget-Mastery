export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FinancialProfile {
  annualIncome: number;
  monthlyIncome: number;
  rent: number;
  city: string;
  otherExpenses: {
    car: number;
    studentLoans: number;
    insurance: number;
    utilities: number;
    groceries: number;
    other: number;
  };
  financialGoals: {
    emergencyFund: number;
    yearlyInvestment: number;
    specificGoals: string[];
  };
  riskTolerance: 'conservative' | 'balanced' | 'aggressive';
  investmentExperience: 'novice' | 'intermediate' | 'advanced';
}

export interface BudgetAllocation {
  needs: number;
  wants: number;
  savings: number;
  investments: number;
}

export interface Investment {
  type: string;
  name: string;
  description: string;
  expectedReturn: string;
  riskLevel: 'low' | 'medium' | 'high';
  minimumAmount: number;
  recommended: boolean;
}

export interface CityData {
  name: string;
  costOfLivingIndex: number;
  averageRent: number;
  state: string;
}

export interface BudgetRecommendation {
  category: string;
  amount: number;
  description: string;
  priority: 'high' | 'medium' | 'low';
}