import React from 'react';
import { FinancialProfile } from '../../types';
import { CheckCircle, DollarSign, MapPin, Target, TrendingUp } from 'lucide-react';

interface ReviewStepProps {
  formData: Partial<FinancialProfile>;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData }) => {
  const totalExpenses = Object.values(formData.otherExpenses || {}).reduce((sum, val) => sum + val, 0);
  const monthlyAfterExpenses = (formData.monthlyIncome || 0) - (formData.rent || 0) - totalExpenses;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Let's make sure everything looks correct before we create your plan</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-emerald-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Income & Housing</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>Annual Income: <span className="font-semibold">${formData.annualIncome?.toLocaleString()}</span></p>
            <p>Monthly Income: <span className="font-semibold">${formData.monthlyIncome?.toLocaleString()}</span></p>
            <p>Monthly Rent: <span className="font-semibold">${formData.rent?.toLocaleString()}</span></p>
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {formData.city}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Financial Goals</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>Emergency Fund: <span className="font-semibold">${formData.financialGoals?.emergencyFund?.toLocaleString() || '0'}</span></p>
            <p>Yearly Investment: <span className="font-semibold">${formData.financialGoals?.yearlyInvestment?.toLocaleString() || '0'}</span></p>
            {formData.financialGoals?.specificGoals && formData.financialGoals.specificGoals.length > 0 && (
              <div>
                <p className="font-medium mb-1">Specific Goals:</p>
                <ul className="space-y-1">
                  {formData.financialGoals.specificGoals.map((goal, index) => (
                    <li key={index} className="text-xs text-gray-600">• {goal}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="font-semibold text-gray-900">Investment Profile</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p>Risk Tolerance: <span className="font-semibold capitalize">{formData.riskTolerance}</span></p>
            <p>Experience: <span className="font-semibold capitalize">{formData.investmentExperience}</span></p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Summary</h3>
          <div className="space-y-2 text-sm">
            <p>Total Expenses: <span className="font-semibold">${(totalExpenses + (formData.rent || 0)).toLocaleString()}</span></p>
            <p>Available for Goals: <span className="font-semibold text-emerald-600">${monthlyAfterExpenses.toLocaleString()}</span></p>
            <p className="text-xs text-gray-600">
              {monthlyAfterExpenses > 0 ? 'Great! You have money available for savings and investments.' : 'Consider reviewing your expenses to free up money for your goals.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Build Your Financial Plan!</h3>
        <p className="opacity-90">
          We'll create a personalized budget, recommend investments, and help you achieve your financial goals.
        </p>
      </div>
    </div>
  );
};

export default ReviewStep;