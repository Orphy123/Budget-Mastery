import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFinance } from '../context/FinanceContext';
import AuthForm from './auth/AuthForm';
import OnboardingFlow from './OnboardingFlow';
import Dashboard from './Dashboard';

const MainApp: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const { state } = useFinance();

  if (authLoading || state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-4 rounded-xl inline-block mb-4">
            <span className="text-3xl font-bold">💰</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">MoneyWise</h2>
          <p className="text-gray-600">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (!state.profile) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
};

export default MainApp;