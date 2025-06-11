import React from 'react';
import { FinancialProfile } from '../../types';
import { DollarSign, MapPin } from 'lucide-react';

interface IncomeStepProps {
  formData: Partial<FinancialProfile>;
  updateFormData: (data: Partial<FinancialProfile>) => void;
}

const IncomeStep: React.FC<IncomeStepProps> = ({ formData, updateFormData }) => {
  const handleIncomeChange = (value: string) => {
    const annualIncome = parseFloat(value) || 0;
    updateFormData({ 
      annualIncome,
      monthlyIncome: annualIncome / 12 
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your income</h2>
        <p className="text-gray-600">This helps us create accurate budget recommendations</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Annual Income
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.annualIncome || ''}
              onChange={(e) => handleIncomeChange(e.target.value)}
              placeholder="75000"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
          {formData.annualIncome && (
            <p className="text-sm text-gray-500">
              Monthly: ${(formData.annualIncome / 12).toLocaleString()}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Monthly Rent/Housing
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={formData.rent || ''}
              onChange={(e) => updateFormData({ rent: parseFloat(e.target.value) || 0 })}
              placeholder="1200"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          City
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={formData.city || ''}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="New York, NY"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
        </div>
        <p className="text-sm text-gray-500">
          We'll use this to adjust recommendations based on cost of living
        </p>
      </div>

      {formData.annualIncome && formData.rent && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h3 className="font-semibold text-emerald-800 mb-2">Quick Preview</h3>
          <p className="text-emerald-700">
            Your housing costs are {((formData.rent * 12) / formData.annualIncome * 100).toFixed(1)}% of your income
            {(formData.rent * 12) / formData.annualIncome > 0.3 && (
              <span className="block text-amber-600 text-sm mt-1">
                ⚠️ Consider this is above the recommended 30% threshold
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default IncomeStep;