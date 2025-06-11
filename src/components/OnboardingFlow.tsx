import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { FinancialProfile } from '../types';
import IncomeStep from './onboarding/IncomeStep';
import ExpensesStep from './onboarding/ExpensesStep';
import GoalsStep from './onboarding/GoalsStep';
import RiskProfileStep from './onboarding/RiskProfileStep';
import ReviewStep from './onboarding/ReviewStep';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const OnboardingFlow: React.FC = () => {
  const { saveProfile } = useFinance();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<FinancialProfile>>({
    otherExpenses: {
      car: 0,
      studentLoans: 0,
      insurance: 0,
      utilities: 0,
      groceries: 0,
      other: 0,
    },
    financialGoals: {
      emergencyFund: 0,
      yearlyInvestment: 0,
      specificGoals: [],
    },
    riskTolerance: 'balanced',
    investmentExperience: 'novice',
  });

  const steps = [
    { title: 'Income', component: IncomeStep },
    { title: 'Expenses', component: ExpensesStep },
    { title: 'Goals', component: GoalsStep },
    { title: 'Risk Profile', component: RiskProfileStep },
    { title: 'Review', component: ReviewStep },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    if (formData.annualIncome && formData.rent && formData.city) {
      setLoading(true);
      try {
        const monthlyIncome = formData.annualIncome / 12;
        const completeProfile: FinancialProfile = {
          ...formData,
          monthlyIncome,
        } as FinancialProfile;
        
        await saveProfile(completeProfile);
      } catch (error) {
        console.error('Failed to save profile:', error);
        // Handle error (show toast, etc.)
      } finally {
        setLoading(false);
      }
    }
  };

  const updateFormData = (data: Partial<FinancialProfile>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to MoneyWise</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's create your personalized financial plan in just a few steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                    index <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-2 mx-4 rounded-full transition-colors duration-300 ${
                      index < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <CurrentStepComponent 
            formData={formData} 
            updateFormData={updateFormData}
            onNext={handleNext}
            onComplete={handleComplete}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          {currentStep < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium transition-all duration-200 hover:bg-emerald-700 shadow-lg hover:shadow-xl"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={loading}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Saving...' : 'Complete Setup'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;