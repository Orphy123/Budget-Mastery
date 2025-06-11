import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { FinancialProfile, BudgetAllocation } from '../types';

interface FinanceState {
  profile: FinancialProfile | null;
  currentStep: number;
  budgetAllocation: BudgetAllocation | null;
}

type FinanceAction =
  | { type: 'SET_PROFILE'; payload: FinancialProfile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<FinancialProfile> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_BUDGET_ALLOCATION'; payload: BudgetAllocation }
  | { type: 'RESET' };

const initialState: FinanceState = {
  profile: null,
  currentStep: 0,
  budgetAllocation: null,
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
} | null>(null);

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: state.profile ? { ...state.profile, ...action.payload } : null,
      };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_BUDGET_ALLOCATION':
      return { ...state, budgetAllocation: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}