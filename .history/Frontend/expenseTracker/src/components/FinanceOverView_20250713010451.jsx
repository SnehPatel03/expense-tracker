import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const COLORS = ["87CF5", "#FA2C37", "FF6900"]
function FinanceOverView({ totalBalance, totalIncome, totalExpense }) {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Income", amount: totalIncome },
        { name: "Total Expense", amount: totalExpense },
    ]
    return (
        <div>
            <div className='flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl shadow-sm'>
                <h2 className='text-md font-semibold text-gray-800'>Recent Transactions</h2>
                <button
                    onClick={onseeMore}
                    className='flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline'
                >
                    See All
                    <IoIosArrowForward className='ml-1 text-lg' />
                </button>
            </div>
        <CustomPieChart
        data={balanceData}
            lablel="Total Balance"
            totalAmount={}
        />
        </div>
    )
}

export default FinanceOverView