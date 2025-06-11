import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { calculateBudgetAllocation } from '../../utils/calculations';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BudgetOverview: React.FC = () => {
  const { state } = useFinance();
  
  if (!state.profile) return null;

  const allocation = calculateBudgetAllocation(state.profile);
  
  const pieData = [
    { name: 'Needs', value: allocation.needs, color: '#ef4444' },
    { name: 'Wants', value: allocation.wants, color: '#f97316' },
    { name: 'Savings', value: allocation.savings, color: '#10b981' },
    { name: 'Investments', value: allocation.investments, color: '#6366f1' },
  ];

  const barData = [
    { category: 'Needs', budgeted: allocation.needs, actual: allocation.needs * 0.95 },
    { category: 'Wants', budgeted: allocation.wants, actual: allocation.wants * 1.1 },
    { category: 'Savings', budgeted: allocation.savings, actual: allocation.savings * 0.8 },
    { category: 'Investments', budgeted: allocation.investments, actual: allocation.investments * 1.05 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Budget Overview</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Monthly Budget</p>
          <p className="text-2xl font-bold text-emerald-600">
            ${state.profile.monthlyIncome.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Allocation Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget vs Actual</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Legend />
                <Bar dataKey="budgeted" fill="#10b981" name="Budgeted" />
                <Bar dataKey="actual" fill="#6366f1" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mt-6">
        {pieData.map(({ name, value, color }) => (
          <div key={name} className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <div className={`w-4 h-4 rounded-full mr-2`} style={{ backgroundColor: color }} />
              <span className="text-sm font-medium text-gray-700">{name}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${value.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {((value / state.profile!.monthlyIncome) * 100).toFixed(1)}% of income
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetOverview;