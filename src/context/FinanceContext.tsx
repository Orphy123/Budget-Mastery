import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { FinancialProfile, BudgetAllocation } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';

interface FinanceState {
  profile: FinancialProfile | null;
  currentStep: number;
  budgetAllocation: BudgetAllocation | null;
  loading: boolean;
  error: string | null;
}

type FinanceAction =
  | { type: 'SET_PROFILE'; payload: FinancialProfile }
  | { type: 'UPDATE_PROFILE'; payload: Partial<FinancialProfile> }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_BUDGET_ALLOCATION'; payload: BudgetAllocation }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

const initialState: FinanceState = {
  profile: null,
  currentStep: 0,
  budgetAllocation: null,
  loading: false,
  error: null,
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
  saveProfile: (profile: FinancialProfile) => Promise<void>;
} | null>(null);

function financeReducer(state: FinanceState, action: FinanceAction): FinanceState {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, profile: action.payload, error: null };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        profile: state.profile ? { ...state.profile, ...action.payload } : null,
      };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_BUDGET_ALLOCATION':
      return { ...state, budgetAllocation: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  const { user } = useAuth();
  const { profile, loading, error, saveProfile: saveProfileToDb } = useProfile();

  // Sync profile from database
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [loading]);

  useEffect(() => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, [error]);

  useEffect(() => {
    if (profile) {
      dispatch({ type: 'SET_PROFILE', payload: profile });
    } else if (!loading && user) {
      // User is authenticated but has no profile
      dispatch({ type: 'SET_PROFILE', payload: null as any });
    }
  }, [profile, loading, user]);

  const saveProfile = async (profileData: FinancialProfile) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      await saveProfileToDb(profileData);
      dispatch({ type: 'SET_PROFILE', payload: profileData });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save profile';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw err;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <FinanceContext.Provider value={{ state, dispatch, saveProfile }}>
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