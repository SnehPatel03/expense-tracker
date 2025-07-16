import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'

function Income() {
  return (
   <DashboardLayout activeMenu={"Income"}>
    <div className='flex mt-15'>
      <div className='grid grid-cols-1 gap-6'>
        <div>
<IncomeOverview
transaction={incomeData}
onAddIncome={() => setOpenAddIncomeModel(true)}
/>
        </div>
      </div>
    </div>
   </DashboardLayout>
  )
}

export default Income