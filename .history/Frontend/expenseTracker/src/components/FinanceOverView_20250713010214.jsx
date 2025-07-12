import React from 'react'

const COLORS = ["87CF5","#FA2C37","FF6900"]
function FinanceOverView({totalBalance,totalIncome,totalExpense}) {
    const balanceData = [
        {name:"Total Balance",amount:totalBalance},
        {name:"Total Income",amount:totalIncome},
        {name:"Total Expense",amount:totalExpense},
    ]
  return (
    <div>
        
    </div>
  )
}

export default FinanceOverView