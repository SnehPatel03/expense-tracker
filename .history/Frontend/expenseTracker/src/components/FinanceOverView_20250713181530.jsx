import React from 'react'
import CustomPieChart from '../Charts/CustomPieChar'


const COLORS =["#875CF5" , "#F12C37" ,"#FF6900"]

function FinanceOverview({
    totalBalance,
    totalIncome,
    totalExpense,
})
{
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense}
    ]
  return (
    <div className='w-[88vw] sm:w-[33vw]  bg-white rounded-xl shadow-md p-4 ml-2 mt-4 flex flex-col justify-center'>
        <div className='flex justify-start items-start mt-3 '>
            <h4 className='text-lg font-semibold text-gray-800 lg:ml-9'> Finance Overview</h4>
        </div>
        <CustomPieChart
        data={balanceData}
        label={`Total Balance : ${totalBalance}`}
        totalAmount={`₹${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview