import React from 'react'
import CustomPieChar from '../Charts/CustomPieChart'

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
    <div className='w-[88vw] sm:w-[36vw]  bg-white rounded-xl shadow-md p-4 ml-2 mt-4 flex flex-col justify-center'>
        <div className='flex justify-center items-center'>
            <h4 className='text-lg font-semibold text-gray-800'> Finance Overview</h4>
        </div>
        <CustomPieChar
        data={balanceData}
        label={`Total Balance : ${totalBalance}`}
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview