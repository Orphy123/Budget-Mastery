import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { getInvestmentRecommendations } from '../../utils/calculations';
import { TrendingUp, Shield, Target, Star } from 'lucide-react';

const InvestmentRecommendations: React.FC = () => {
  const { state } = useFinance();
  
  if (!state.profile) return null;

  const recommendations = getInvestmentRecommendations(state.profile);

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <Shield className="w-4 h-4 text-green-600" />;
      case 'medium': return <Target className="w-4 h-4 text-yellow-600" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-red-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 border-green-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'high': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Investment Recommendations</h2>
        <div className="flex items-center text-sm text-gray-600">
          <span className="capitalize">{state.profile.riskTolerance}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{state.profile.investmentExperience}</span>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((investment, index) => (
          <div
            key={index}
            className={`border rounded-xl p-4 transition-all duration-200 hover:shadow-md ${getRiskColor(investment.riskLevel)} ${
              investment.recommended ? 'ring-2 ring-emerald-500' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-semibold text-gray-900 mr-2">{investment.name}</h3>
                  {investment.recommended && (
                    <div className="flex items-center bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Recommended
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{investment.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    {getRiskIcon(investment.riskLevel)}
                    <span className="ml-1 capitalize text-gray-700">{investment.riskLevel} Risk</span>
                  </div>
                  <span className="text-emerald-600 font-medium">{investment.expectedReturn}</span>
                  <span className="text-gray-500">Min: ${investment.minimumAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Investment Strategy</h4>
        <p className="text-blue-700 text-sm">
          Based on your {state.profile.riskTolerance} risk tolerance and {state.profile.investmentExperience} experience level,
          we recommend starting with the highlighted options above. Consider diversifying across multiple investment types
          for optimal risk management.
        </p>
      </div>
    </div>
  );
};

export default InvestmentRecommendations;