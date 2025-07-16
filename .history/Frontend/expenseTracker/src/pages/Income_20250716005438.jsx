import React from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import IncomeOverview from '../components/Income Components/IncomeOverview'
import axios from 'axios'
import { data } from 'react-router-dom'

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
    if (loading) return

    setloading(true)
    try {
      const response = await axios.get("http://localhost:3000/income/AllIncome", {
        withCredentials: true,
      })
      console.log("data of income", data)
      if (response.data) {
        setincomeData(response.data)
      }
    } catch (error) {
      console.log("There is error in income fetching", error)
    }finally{setloading(false)}


  }
  const addIncomeData = async (income) => { }
  const deleteData = async (id) => { }
  const handleDownloadIncomeDetails = async () => { }

  const [setOpenAddIncomeModel, setSetOpenAddIncomeModel] = useState(false)


  useEffect(() => {
   fet
  }, [data])
  
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