import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { prepareDataForImportChart } from '../data'
import CustomChartExpence from '../Charts/CustomChartExpence'
import CustomChartIncome from '../Charts/CustomChartIncome'

function Last60DaysIncome({ data }) {
    const [chartdata, setChartdata] = useState([])
    
    useEffect(() => {
        const result = prepareDataForImportChart(data);
        console.log("result", result)
        setChartdata(result)
    }, [data])
   


    return (
        <div className=' ml-2 mt-6.5'>
            <div className='flex justify-between text-gray-800 items-center w-[85vw]  mt-3 p-3  h-13 bg-gray-200/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[35vw] sm:h-[10vh] sm:pr-2'>
                <div className='ml-1 font-semibold'>Income of last 60 Days</div>
                <button

                    className='flex justify-center text-gray-800 items-center text-sm hover:text-purple-700  border-gray-200/50 rounded-xl mr-2 py-2 px-3 hover:bg-purple-200 duration-700'
                >
                    See All
                    <IoIosArrowForward className='ml-2 text-md' />
                </button>
            </div>
            <CustomChartIncome data={chartdata} />
        </div>
    )
}

export default Last60DaysIncome