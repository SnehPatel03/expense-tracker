import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu"
import { prepareIncomeChart2 } from '../../data';
import CustomChartIncome from '../../Charts/CustomChartIncome';
import CustomChartIncome2 from '../../Charts/CustomChartIncome2';

function IncomeOverview({ transaction, onAddIncome }) {

  const [chartData, setchartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeChart2(transaction);
    console.log("result",result)
    setchartData(result)
  }, [transaction])

  return (
    <div className='w-full sm:w-[70vw] mt-6 ml-6'>
      <div className='flex justify-between text-gray-800 items-center w-[90vw] mt-4 p-3 ml-2 pr-3 h-13 bg-gray-100/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[74vw] sm:h-[13vh] sm:pr-2'>
        <div className='ml-1 font-semibold flex flex-col'>Incomes
          <h1 className='font-medium text-gray-500 text-sm capitalize mt-1 '>Track your earnings over time and analyze your income Trade</h1>
        </div>

        <button

          className='flex justify-center text-gray-800 items-center bg-gray-300 text-[0.9vw] font-extrabold tracking-wide hover:text-purple-700  border-gray-200/50 rounded-xl mr-2 py-2 px-3 hover:bg-purple-200 duration-700'
        >
          ADD INCOME
          <LuPlus className='ml-2 text-md' />
        </button>
      </div>
        <div className='mt-4  ml-7 flex items-center justify-center'>
          <CustomChartIncome2 data={chartData}/>
        </div>
    </div>
  )
}

export default IncomeOverview   