import { FinancialProfile, BudgetAllocation, Investment } from '../types';

export function calculateBudgetAllocation(profile: FinancialProfile): BudgetAllocation {
  const { monthlyIncome, rent, otherExpenses } = profile;
  
  // Calculate total fixed expenses
  const totalFixedExpenses = rent + Object.values(otherExpenses).reduce((sum, val) => sum + val, 0);
  
  // Available money after fixed expenses
  const availableIncome = monthlyIncome - totalFixedExpenses;
  
  // Apply 50/30/20 rule to available income, with adjustments
  const needs = totalFixedExpenses; // Fixed expenses are "needs"
  const wants = Math.max(0, availableIncome * 0.3);
  const savingsAndInvestments = Math.max(0, availableIncome * 0.7);
  
  // Split savings and investments (60% savings, 40% investments by default)
  const savings = savingsAndInvestments * 0.6;
  const investments = savingsAndInvestments * 0.4;
  
  return {
    needs: Math.round(needs),
    wants: Math.round(wants),
    savings: Math.round(savings),
    investments: Math.round(investments),
  };
}

export function getInvestmentRecommendations(profile: FinancialProfile): Investment[] {
  const { riskTolerance, investmentExperience, monthlyIncome } = profile;
  
  const allInvestments: Investment[] = [
    {
      type: 'High-Yield Savings',
      name: 'High-Yield Savings Account',
      description: 'Safe, liquid savings with competitive interest rates. Perfect for emergency funds.',
      expectedReturn: '4.5-5.0% APY',
      riskLevel: 'low',
      minimumAmount: 100,
      recommended: true,
    },
    {
      type: 'CD',
      name: 'Certificate of Deposit',
      description: 'Fixed-term savings with guaranteed returns. Good for short-term goals.',
      expectedReturn: '4.0-5.5% APY',
      riskLevel: 'low',
      minimumAmount: 500,
      recommended: riskTolerance === 'conservative',
    },
    {
      type: 'IRA',
      name: 'Roth IRA',
      description: 'Tax-advantaged retirement account with tax-free growth and withdrawals.',
      expectedReturn: '7-10% annually',
      riskLevel: 'medium',
      minimumAmount: 0,
      recommended: true,
    },
    {
      type: 'ETF',
      name: 'S&P 500 Index Fund',
      description: 'Diversified fund tracking the S&P 500. Great for long-term growth.',
      expectedReturn: '8-12% annually',
      riskLevel: 'medium',
      minimumAmount: 1,
      recommended: investmentExperience !== 'novice',
    },
    {
      type: 'ETF',
      name: 'Total Stock Market ETF',
      description: 'Broad market exposure with low fees. Excellent for beginners.',
      expectedReturn: '7-11% annually',
      riskLevel: 'medium',
      minimumAmount: 1,
      recommended: investmentExperience === 'novice',
    },
    {
      type: 'Bond Fund',
      name: 'Government Bond ETF',
      description: 'Conservative fixed-income investments for stability and income.',
      expectedReturn: '3-5% annually',
      riskLevel: 'low',
      minimumAmount: 25,
      recommended: riskTolerance === 'conservative',
    },
    {
      type: 'Real Estate',
      name: 'REIT Index Fund',
      description: 'Real estate investment trust for property exposure without direct ownership.',
      expectedReturn: '6-9% annually',
      riskLevel: 'medium',
      minimumAmount: 50,
      recommended: riskTolerance !== 'conservative' && monthlyIncome > 4000,
    },
    {
      type: 'Growth Fund',
      name: 'Technology Sector ETF',
      description: 'Higher growth potential with increased volatility. For aggressive investors.',
      expectedReturn: '10-15% annually',
      riskLevel: 'high',
      minimumAmount: 50,
      recommended: riskTolerance === 'aggressive' && investmentExperience === 'advanced',
    },
  ];

  // Filter recommendations based on risk tolerance and experience
  let recommendations = allInvestments.filter(investment => {
    if (riskTolerance === 'conservative' && investment.riskLevel === 'high') {
      return false;
    }
    if (investmentExperience === 'novice' && investment.riskLevel === 'high') {
      return false;
    }
    return true;
  });

  // Sort by recommended status and risk level
  recommendations.sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return 0;
  });

  return recommendations.slice(0, 6); // Return top 6 recommendations
}

export function calculateCostOfLivingAdjustment(city: string): number {
  // Simplified cost of living multiplier
  // In a real app, this would use actual API data
  const cityMultipliers: { [key: string]: number } = {
    'New York': 1.3,
    'San Francisco': 1.4,
    'Los Angeles': 1.2,
    'Chicago': 1.1,
    'Austin': 1.0,
    'Denver': 1.05,
    'Atlanta': 0.95,
    'Phoenix': 0.9,
    'Dallas': 0.95,
    'Miami': 1.1,
  };

  // Extract city name from "City, State" format
  const cityName = city.split(',')[0].trim();
  return cityMultipliers[cityName] || 1.0;
}

export function generateBudgetRecommendations(profile: FinancialProfile): string[] {
  const allocation = calculateBudgetAllocation(profile);
  const savingsRate = ((allocation.savings + allocation.investments) / profile.monthlyIncome) * 100;
  
  const recommendations: string[] = [];

  if (savingsRate < 15) {
    recommendations.push('Consider increasing your savings rate to at least 15% of income');
  }

  if (profile.rent / profile.monthlyIncome > 0.3) {
    recommendations.push('Your housing costs are high - consider finding more affordable housing');
  }

  if (allocation.investments < 500) {
    recommendations.push('Start with a small investment amount and increase gradually');
  }

  if (profile.financialGoals.emergencyFund === 0) {
    recommendations.push('Build an emergency fund of 3-6 months of expenses');
  }

  return recommendations;
}