import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import IncomeOverview from '../components/Income Components/IncomeOverview'
import axios from 'axios'
import Model from '../components/Model'
import AddIncomeForm from '../components/Income Components/AddIncomeForm'

function Income() {
  const [incomeData, setincomeData] = useState([])
  const [loading, setloading] = useState(false)
  const [OpenAddIncomeModel, setOpenAddIncomeModel] = useState(false)
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

      if (response.data) {
        setincomeData(response.data)
      }
    } catch (error) {
      console.log("There is error in income fetching", error)
    } finally { setloading(false) }


  }
  const addIncomeData = async (income) => {
    const { source, amount, date, icon } = income

    if (!source.trim()) {
      alert("Source Required")
      return
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Amount should be validate number and greater than 0 ")
    }
    if (!date) {
      alert("date is required")
      return
    }

    try {
      await axios.post("http://localhost:3000/income/addIncome", {
        withCredentials: true,
      }, {
        source, amount, date, icon
      })

      setOpenAddIncomeModel(false)
      alert("Income added succesfully")
    } catch (error) {
      console.log("error in adding income", error.response.data)
    }



  }
  const deleteData = async (id) => { }
  const handleDownloadIncomeDetails = async () => { }



  useEffect(() => {
    fetchIncomeData()
  }, [])

  return (
    <DashboardLayout activeMenu={"Income"}>
      <div className='flex mt-15'>
        <div className='grid grid-cols-1 gap-6'>
          <div >
            <IncomeOverview
              transaction={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
      </div>
      <Model
        isOpen={OpenAddIncomeModel}
        onClose={() => setOpenAddIncomeModel(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={addIncomeData} />
      </Model>
    </DashboardLayout>
  )
}

export default Income