

import React from 'react';
import {
  LuTrash2,
  LuTrendingUp,
  LuTrendingDown,
  LuUtensils,
} from 'react-icons/lu';

function TransactionInfoCardIimport React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { prepareDataForExpenseChart } from '../data'
import CustomChartExpence from '../Charts/CustomChartExpence'

export const Last30DaysExpense =({ data }) => {
    const [chartdata, setChartdata] = useState([])

    useEffect(() => {
        const result = prepareDataForExpenseChart
        (data)
        setChartdata(result)

    }, [data])


    return (
        <div className='ml-10 mt-6.5'>
            <div className='flex justify-between text-gray-800 items-center w-[55vw] mt-3 p-3 ml-2 pr-3 h-13 bg-gray-200/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[34vw] sm:h-[10vh] sm:pr-2'>
                <div className='ml-1 font-semibold'>Expense of last 30 Days</div>
                <button

                    className='flex justify-center text-gray-800 items-center text-sm hover:text-purple-700  border-gray-200/50 rounded-xl mr-2 py-2 px-3 hover:bg-purple-200 duration-700'
                >
                    See All
                    <IoIosArrowForward className='ml-2 text-md' />
                </button>
            </div>
            <CustomChartExpence  data={chartdata}/>
        </div>
    )
}

export default Last30DaysExpense;ncome({
  title,
  icon,
  amount,
  type,
  date,
  hideDeleteBtn = false,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between gap-4 w-[40vw] ml-2 mt-3 p-4 rounded-lg hover:bg-gray-100 shadow-sm bg-white transition">

      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full shrink-0">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        <p className="text-sm font-medium text-gray-700 truncate capitalize">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

  
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-semibold ${
            type === 'income' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {type === 'income' ? '+' : '-'}${parseFloat(amount).toFixed(2)}
          {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete Transaction"
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionInfoCardIncome;