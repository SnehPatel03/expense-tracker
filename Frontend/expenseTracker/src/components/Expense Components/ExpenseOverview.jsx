import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareExpenseChart2 } from '../../data';
import CustomChartIncome2 from '../../Charts/CustomChartIncome2';
import CustomChartExpense2 from '../../Charts/CustomChartExpense2';

function ExpenseOverview({ transaction, onAddExpense,onExpenseLimit }) {
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseChart2(transaction);
    setchartData(result);
  }, [transaction]);

  return (
    <div className="w-[87vw] sm:w-[70vw] px-4 sm:px-6 mt-6 ">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-800 bg-gray-200/55 border border-gray-100 shadow-sm rounded-xl p-4">
        <div className="font-semibold flex flex-col">
          <span className="text-base sm:text-lg">Expenses</span>
          <p className="text-gray-500 text-sm mt-1">
            Track your spendings over time and analyze your expense trends
          </p>
        </div>

        <button
          onClick={onExpenseLimit}
          className="mt-4 sm:mt-0 flex items-center justify-center bg-gray-100 text-sm sm:text-[0.9vw] font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
        >
          ADD EXPENSE LIMIT
          <LuPlus className="ml-2 text-base" />
        </button>
        <button
          onClick={onAddExpense}
          className="mt-4 sm:mt-0 flex items-center justify-center bg-gray-100 text-sm sm:text-[0.9vw] font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
        >
          ADD EXPENSES
          <LuPlus className="ml-2 text-base" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center w-full">
        <CustomChartExpense2 data={chartData} />
      </div>
    </div>
  );
}

export default ExpenseOverview;
