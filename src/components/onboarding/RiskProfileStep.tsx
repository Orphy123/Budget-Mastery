import React from 'react';
import { FinancialProfile } from '../../types';
import { Shield, TrendingUp, Activity } from 'lucide-react';

interface RiskProfileStepProps {
  formData: Partial<FinancialProfile>;
  updateFormData: (data: Partial<FinancialProfile>) => void;
}

const RiskProfileStep: React.FC<RiskProfileStepProps> = ({ formData, updateFormData }) => {
  const riskOptions = [
    {
      value: 'conservative' as const,
      title: 'Conservative',
      icon: Shield,
      description: 'Prefer stability and capital preservation',
      returns: '3-5% annually',
      color: 'green',
    },
    {
      value: 'balanced' as const,
      title: 'Balanced',
      icon: TrendingUp,
      description: 'Mix of growth and stability',
      returns: '6-8% annually',
      color: 'blue',
    },
    {
      value: 'aggressive' as const,
      title: 'Aggressive',
      icon: Activity,
      description: 'Seek higher returns, accept more risk',
      returns: '8-12% annually',
      color: 'purple',
    },
  ];

  const experienceOptions = [
    {
      value: 'novice' as const,
      title: 'Novice',
      description: 'New to investing, prefer simple options',
    },
    {
      value: 'intermediate' as const,
      title: 'Intermediate',
      description: 'Some experience with basic investments',
    },
    {
      value: 'advanced' as const,
      title: 'Advanced',
      description: 'Experienced with various investment types',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Investment Profile</h2>
        <p className="text-gray-600">Help us recommend the right investment strategy for you</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Tolerance</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {riskOptions.map(({ value, title, icon: Icon, description, returns, color }) => (
              <button
                key={value}
                onClick={() => updateFormData({ riskTolerance: value })}
                className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  formData.riskTolerance === value
                    ? `border-${color}-500 bg-${color}-50 shadow-md`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <Icon className={`w-8 h-8 mb-3 ${
                  formData.riskTolerance === value ? `text-${color}-600` : 'text-gray-400'
                }`} />
                <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <p className="text-xs font-medium text-emerald-600">Expected: {returns}</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Experience</h3>
          <div className="space-y-3">
            {experienceOptions.map(({ value, title, description }) => (
              <button
                key={value}
                onClick={() => updateFormData({ investmentExperience: value })}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  formData.investmentExperience === value
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-600">{description}</p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    formData.investmentExperience === value
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {formData.riskTolerance && formData.investmentExperience && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
          <h3 className="font-semibold text-indigo-800 mb-2">Your Investment Profile</h3>
          <p className="text-indigo-700">
            Based on your {formData.riskTolerance} risk tolerance and {formData.investmentExperience} experience level,
            we'll recommend suitable investment options that match your comfort level and goals.
          </p>
        </div>
      )}
    </div>
  );
};

export default RiskProfileStep;