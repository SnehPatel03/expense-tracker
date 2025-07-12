import React from 'react';
import CustomPieChart from './CustomPieChart';

function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
  // Full pie chart data including balance
  const pieData = [
    { name: 'Balance', amount: totalBalance },
    { name: 'Income', amount: totalIncome },
    { name: 'Expense', amount: totalExpense }
  ];

  // Colors: Balance (blue), Income (green), Expense (red)
  const colors = ['#60a5fa', '#4ade80', '#f87171'];

  return (
    <div className="w-full md:w-[40vw] bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Finance Overview</h2>

      <CustomPieChart
        data={pieData}
        colors={colors}
        totalAmount={totalBalance}
        showTextAnchor={true}
      />

      {/* Labels Summary */}
      <div className="mt-4 space-y-2 text-sm text-gray-700 font-medium">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-blue-400"></span>
          Balance: ${totalBalance}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          Income: ${totalIncome}
        </div>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          Expense: ${totalExpense}
        </div>
      </div>
    </div>
  );
}

export default FinanceOverview;
