import React, { useEffect, useState } from 'react';
import { LuPlus } from "react-icons/lu";
import { prepareIncomeChart2 } from '../../data';
import CustomChartIncome2 from '../../Charts/CustomChartIncome2';

function IncomeOverview({ transaction, onAddIncome,onIncomeGoal }) {
  const [chartData, setchartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeChart2(transaction);
    setchartData(result);
  }, [transaction]);

  return (
    <div className="w-[87vw] sm:w-[70vw] px-4 sm:px-6 mt-6 ">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-800 bg-gray-200/55 border border-gray-100 shadow-sm rounded-xl p-4">
        <div className="font-semibold flex flex-col">
          <span className="text-base sm:text-lg">Incomes</span>
          <p className="text-gray-500 text-sm mt-1">
            Track your earnings over time and analyze your income trends
          </p>
        </div>

        <button
          onClick={onIncomeGoal}
          className="mt-4 sm:mt-0 flex items-center justify-center bg-gray-100 text-sm sm:text-[0.9vw] font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
        >
          ADD INCOME GOAL
          <LuPlus className="ml-2 text-base" />
        </button>
        <button
          onClick={onAddIncome}
          className="mt-4 sm:mt-0 flex items-center justify-center bg-gray-100 text-sm sm:text-[0.9vw] font-bold tracking-wide hover:text-purple-700 hover:bg-purple-200 border border-gray-300 rounded-xl px-4 py-2 transition-all"
        >
          ADD INCOME
          <LuPlus className="ml-2 text-base" />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center w-full">
        <CustomChartIncome2 data={chartData} />
      </div>
    </div>
  );
}

export default IncomeOverview;
