import React, { useState } from 'react';
import { FinancialProfile } from '../../types';
import { Target, PiggyBank, Plus, X } from 'lucide-react';

interface GoalsStepProps {
  formData: Partial<FinancialProfile>;
  updateFormData: (data: Partial<FinancialProfile>) => void;
}

const GoalsStep: React.FC<GoalsStepProps> = ({ formData, updateFormData }) => {
  const [newGoal, setNewGoal] = useState('');

  const updateGoals = (updates: Partial<FinancialProfile['financialGoals']>) => {
    updateFormData({
      financialGoals: {
        ...formData.financialGoals!,
        ...updates,
      },
    });
  };

  const addSpecificGoal = () => {
    if (newGoal.trim()) {
      const currentGoals = formData.financialGoals?.specificGoals || [];
      updateGoals({
        specificGoals: [...currentGoals, newGoal.trim()],
      });
      setNewGoal('');
    }
  };

  const removeSpecificGoal = (index: number) => {
    const currentGoals = formData.financialGoals?.specificGoals || [];
    updateGoals({
      specificGoals: currentGoals.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Goals</h2>
        <p className="text-gray-600">What would you like to achieve with your money?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Emergency Fund Target
          </label>
          <div className="relative">
            <PiggyBank className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.financialGoals?.emergencyFund || ''}
              onChange={(e) => updateGoals({ emergencyFund: parseFloat(e.target.value) || 0 })}
              placeholder="10000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <p className="text-sm text-gray-500">
            Recommended: 3-6 months of expenses
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Yearly Investment Goal
          </label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.financialGoals?.yearlyInvestment || ''}
              onChange={(e) => updateGoals({ yearlyInvestment: parseFloat(e.target.value) || 0 })}
              placeholder="5000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          <p className="text-sm text-gray-500">
            How much would you like to invest annually?
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Specific Goals
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addSpecificGoal()}
            placeholder="e.g., Save for vacation, Buy a car, Pay off debt"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={addSpecificGoal}
            className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {formData.financialGoals?.specificGoals && formData.financialGoals.specificGoals.length > 0 && (
          <div className="space-y-2">
            {formData.financialGoals.specificGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-gray-800">{goal}</span>
                <button
                  onClick={() => removeSpecificGoal(index)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {formData.monthlyIncome && (formData.financialGoals?.emergencyFund || formData.financialGoals?.yearlyInvestment) && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <h3 className="font-semibold text-purple-800 mb-2">Goal Analysis</h3>
          <div className="space-y-1 text-purple-700 text-sm">
            {formData.financialGoals?.emergencyFund && (
              <p>
                Emergency Fund: ${formData.financialGoals.emergencyFund.toLocaleString()} 
                ({(formData.financialGoals.emergencyFund / formData.monthlyIncome).toFixed(1)} months of income)
              </p>
            )}
            {formData.financialGoals?.yearlyInvestment && (
              <p>
                Investment Goal: ${(formData.financialGoals.yearlyInvestment / 12).toLocaleString()}/month 
                ({((formData.financialGoals.yearlyInvestment / 12) / formData.monthlyIncome * 100).toFixed(1)}% of income)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsStep;