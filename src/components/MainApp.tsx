import React from 'react';
import { useFinance } from '../context/FinanceContext';
import OnboardingFlow from './OnboardingFlow';
import Dashboard from './Dashboard';

const MainApp: React.FC = () => {
  const { state } = useFinance();

  if (!state.profile) {
    return <OnboardingFlow />;
  }

  return <Dashboard />;
};

export default MainApp;