import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Target, PiggyBank, Calendar, CheckCircle } from 'lucide-react';

const GoalsProgress: React.FC = () => {
  const { state } = useFinance();
  
  if (!state.profile) return null;

  const { financialGoals } = state.profile;
  
  // Simulate some progress for demo purposes
  const emergencyFundProgress = Math.min((financialGoals.emergencyFund * 0.3), financialGoals.emergencyFund);
  const investmentProgress = Math.min((financialGoals.yearlyInvestment * 0.4), financialGoals.yearlyInvestment);
  
  const emergencyFundPercent = financialGoals.emergencyFund > 0 
    ? (emergencyFundProgress / financialGoals.emergencyFund) * 100 
    : 0;
  
  const investmentPercent = financialGoals.yearlyInvestment > 0 
    ? (investmentProgress / financialGoals.yearlyInvestment) * 100 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Goals Progress</h2>

      <div className="space-y-6">
        {financialGoals.emergencyFund > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PiggyBank className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-gray-900">Emergency Fund</span>
              </div>
              <span className="text-sm text-gray-600">
                ${emergencyFundProgress.toLocaleString()} / ${financialGoals.emergencyFund.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${emergencyFundPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {emergencyFundPercent.toFixed(1)}% complete • 
              ${(financialGoals.emergencyFund - emergencyFundProgress).toLocaleString()} remaining
            </p>
          </div>
        )}

        {financialGoals.yearlyInvestment > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Target className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">Yearly Investment Goal</span>
              </div>
              <span className="text-sm text-gray-600">
                ${investmentProgress.toLocaleString()} / ${financialGoals.yearlyInvestment.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${investmentPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">
              {investmentPercent.toFixed(1)}% complete • 
              ${((financialGoals.yearlyInvestment - investmentProgress) / 12).toLocaleString()}/month needed
            </p>
          </div>
        )}

        {financialGoals.specificGoals && financialGoals.specificGoals.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center mb-3">
              <Calendar className="w-5 h-5 text-purple-600 mr-2" />
              <span className="font-semibold text-gray-900">Specific Goals</span>
            </div>
            <div className="space-y-2">
              {financialGoals.specificGoals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <span className="text-gray-800">{goal}</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    In Progress
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
        <h4 className="font-semibold text-purple-800 mb-2">Goal Insights</h4>
        <div className="space-y-1 text-purple-700 text-sm">
          <p>• You're making good progress on your financial goals</p>
          <p>• Consider automating savings to stay on track</p>
          <p>• Review and adjust goals quarterly for optimal results</p>
        </div>
      </div>
    </div>
  );
};

export default GoalsProgress;