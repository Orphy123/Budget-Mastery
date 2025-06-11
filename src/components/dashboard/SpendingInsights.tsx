import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TrendingDown, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react';

const SpendingInsights: React.FC = () => {
  const { state } = useFinance();
  
  if (!state.profile) return null;

  const totalExpenses = Object.values(state.profile.otherExpenses).reduce((sum, val) => sum + val, 0) + state.profile.rent;
  const savingsRate = ((state.profile.monthlyIncome - totalExpenses) / state.profile.monthlyIncome) * 100;

  const insights = [
    {
      type: 'positive',
      icon: TrendingDown,
      title: 'Housing Ratio Optimized',
      description: `Your housing costs are ${((state.profile.rent * 12) / (state.profile.annualIncome) * 100).toFixed(1)}% of income`,
      color: 'emerald',
    },
    {
      type: savingsRate > 20 ? 'positive' : 'warning',
      icon: savingsRate > 20 ? TrendingUp : AlertCircle,
      title: 'Savings Rate',
      description: `You're saving ${savingsRate.toFixed(1)}% of your income monthly`,
      color: savingsRate > 20 ? 'emerald' : 'amber',
    },
    {
      type: 'info',
      icon: Lightbulb,
      title: 'Investment Opportunity',
      description: 'Consider increasing investments by $200/month for better returns',
      color: 'blue',
    },
  ];

  const recommendations = [
    'Automate 15% of income to high-yield savings account',
    'Consider maxing out IRA contributions for tax benefits',
    'Review subscription services for potential savings',
    'Track discretionary spending with budgeting apps',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Financial Insights</h2>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`bg-${insight.color}-50 border border-${insight.color}-200 rounded-xl p-4`}
          >
            <div className="flex items-start">
              <insight.icon className={`w-6 h-6 text-${insight.color}-600 mr-3 mt-1`} />
              <div>
                <h3 className={`font-semibold text-${insight.color}-800 mb-1`}>{insight.title}</h3>
                <p className={`text-sm text-${insight.color}-700`}>{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Smart Recommendations</h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start bg-gray-50 rounded-lg p-3">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700 text-sm">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700 font-medium">Housing</span>
              <span className="font-semibold text-red-600">${state.profile.rent.toLocaleString()}</span>
            </div>
            {Object.entries(state.profile.otherExpenses).map(([key, value]) => {
              if (value > 0) {
                return (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-semibold text-gray-800">${value.toLocaleString()}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;