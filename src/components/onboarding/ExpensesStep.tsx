import React from 'react';
import { FinancialProfile } from '../../types';
import { Car, GraduationCap, Shield, Zap, ShoppingCart, MoreHorizontal } from 'lucide-react';

interface ExpensesStepProps {  
  formData: Partial<FinancialProfile>;
  updateFormData: (data: Partial<FinancialProfile>) => void;
}

const ExpensesStep: React.FC<ExpensesStepProps> = ({ formData, updateFormData }) => {
  const updateExpense = (category: keyof FinancialProfile['otherExpenses'], value: number) => {
    updateFormData({
      otherExpenses: {
        ...formData.otherExpenses!,
        [category]: value,
      },
    });
  };

  const expenses = [
    { key: 'car' as const, label: 'Car Payment & Gas', icon: Car, placeholder: '400' },
    { key: 'studentLoans' as const, label: 'Student Loans', icon: GraduationCap, placeholder: '200' },
    { key: 'insurance' as const, label: 'Insurance', icon: Shield, placeholder: '150' },
    { key: 'utilities' as const, label: 'Utilities', icon: Zap, placeholder: '120' },
    { key: 'groceries' as const, label: 'Groceries', icon: ShoppingCart, placeholder: '300' },
    { key: 'other' as const, label: 'Other Monthly Expenses', icon: MoreHorizontal, placeholder: '200' },
  ];

  const totalExpenses = Object.values(formData.otherExpenses || {}).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Monthly Expenses</h2>
        <p className="text-gray-600">Help us understand your regular monthly commitments</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {expenses.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              {label}
            </label>
            <div className="relative">
              <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                value={formData.otherExpenses?.[key] || ''}
                onChange={(e) => updateExpense(key, parseFloat(e.target.value) || 0)}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        ))}
      </div>

      {totalExpenses > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Expense Summary</h3>
          <div className="space-y-1 text-blue-700">
            <p>Total Monthly Expenses: <span className="font-semibold">${totalExpenses.toLocaleString()}</span></p>
            {formData.monthlyIncome && (
              <p>
                This represents {((totalExpenses / formData.monthlyIncome) * 100).toFixed(1)}% of your monthly income
              </p>
            )}
          </div>
        </div>
      )}

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> Don't worry about being exact - you can always adjust these later. 
          We're looking for rough estimates to create your initial budget plan.
        </p>
      </div>
    </div>
  );
};

export default ExpensesStep;