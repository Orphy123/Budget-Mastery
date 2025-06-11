import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Settings, Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  const { state, dispatch } = useFinance();

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-2 rounded-xl">
              <span className="text-xl font-bold">💰</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MoneyWise</h1>
              <p className="text-sm text-gray-600">Smart Financial Planning</p>
            </div>
          </div>

          <div className="hidden md:flex items-center text-sm text-gray-600">
            <span>Monthly Income: </span>
            <span className="font-semibold text-emerald-600 ml-1">
              ${state.profile?.monthlyIncome.toLocaleString()}
            </span>
            <span className="mx-2">•</span>
            <span>City: </span>
            <span className="font-semibold text-blue-600 ml-1">
              {state.profile?.city}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleReset}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;