import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { prepareDataForExpenseChart } from '../data'
import CustomChartExpence from '../Charts/CustomChartExpence'

function Last30DaysExpense({ data }) {
    const [chartdata, setChartdata] = useState([])

    useEffect(() => {
        const result = prepareDataForExpenseChart
        (data)
        setChartdata(result)

    }, [data])


    return (
        <div className='flex items-end'>
            <div className='flex justify-between text-gray-800 items-center w-[55vw] mt-4 p-3 ml-2 pr-3 h-13 bg-gray-200/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[30vw] sm:h-[10vh] sm:pr-2'>
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

export default Last30DaysExpense