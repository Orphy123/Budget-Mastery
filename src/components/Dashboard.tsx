import React from 'react';
import { useFinance } from '../context/FinanceContext';
import Header from './dashboard/Header';
import BudgetOverview from './dashboard/BudgetOverview';
import InvestmentRecommendations from './dashboard/InvestmentRecommendations';
import GoalsProgress from './dashboard/GoalsProgress';
import SpendingInsights from './dashboard/SpendingInsights';

const Dashboard: React.FC = () => {
  const { state } = useFinance();

  if (!state.profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <BudgetOverview />
        <div className="grid lg:grid-cols-2 gap-8">
          <InvestmentRecommendations />
          <GoalsProgress />
        </div>
        <SpendingInsights />
      </main>
    </div>
  );
};

export default Dashboard;