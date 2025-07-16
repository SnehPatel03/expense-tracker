import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import IncomeOverview from '../components/Income Components/IncomeOverview'

function Income() {
  const [incomeData, setincomeData] = useState([])
  const [loading, setloading] = useState(false)
  const [onDeleteAlert, setonDeleteAlert] = useState(
    {
      show: false,
      data: null
    }
  )

  const fetchIncomeData = async () => { 
if(loading) return

setloading(true)
try {
  const response =
} catch (error) {
  
}


  }
  const addIncomeData = async (income) => { }
  const deleteData = async (id) => { }
  const handleDownloadIncomeDetails = async () => { }

  const [setOpenAddIncomeModel, setSetOpenAddIncomeModel] = useState(false)

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