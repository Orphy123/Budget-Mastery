import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import MainApp from './components/MainApp';

function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
        <MainApp />
      </div>
    </FinanceProvider>
  );
}

export default App;