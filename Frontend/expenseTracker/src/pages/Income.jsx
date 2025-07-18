import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import IncomeOverview from '../components/Income Components/IncomeOverview'
import axios from 'axios'
import Model from '../components/Model'
import AddIncomeForm from '../components/Income Components/AddIncomeForm'
import toast from 'react-hot-toast'
import IncomeList from '../components/Income Components/IncomeList'
import DeleteAlert from '../components/Income Components/DeleteAlert'
import AddGoalForm from '../components/Income Components/AddGoalForm'

function Income() {
  const [incomeData, setincomeData] = useState([])
  const [loading, setloading] = useState(false)
  const [OpenAddIncomeModel, setOpenAddIncomeModel] = useState(false)
  const [IncomeGoalModel, setIncomeGoalModel] = useState(false)
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
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      alert("Source Required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number and greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/income/addIncome",
        { source, amount, date, icon },
        { withCredentials: true }
      );

      setOpenAddIncomeModel(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    } catch (error) {
      console.log("Error in adding income:", error.response?.data || error.message);
      toast.error("Failed to add income");
    }
  };

  //goal
  const addGoal = async ({ incomeGoal, month, year }) => {
    if (!incomeGoal) {
      toast.error("Enter a goal for income this month");
      return;
    }

    if (isNaN(incomeGoal)) {
      toast.error("Goal should be a number this month");
      return;
    }

    try {


      const response = await axios.post(
        "http://localhost:3000/goal/set",
        { incomeGoal: Number(incomeGoal), month, year },
        {
          withCredentials: true
        }
      );
      console.log("Income goal", response)

      setIncomeGoalModel(false);
      toast.success("Income goal set successfully!");
    } catch (error) {
      console.log("Error in setting income goal:", error.response?.data || error.message);
      toast.error("Failed to set income goal");
    }
  };


  const deleteData = async (id) => {

    try {
      await axios.delete(`http://localhost:3000/income/${id}`, {
        withCredentials: true
      })
      setonDeleteAlert({ data: null, show: false })
      toast.success("Income Deleted Successfully")
      fetchIncomeData()
    } catch (error) {
      console.log("error in deleteing income", error)
      toast.error("Error in Deleteing Income")
    }

  }
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3000/income/incomePdf", {
        responseType: "blob",
        withCredentials: true
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Income_Report.pdf';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading expense PDF:", error);
      toast.error("Failed to download expense report");
    }
  }


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
              onIncomeGoal={() => setIncomeGoalModel(true)}
            />
          </div>
        </div>
      </div>
      <div className='w-[70vw]'>
        <IncomeList
          transaction={incomeData}
          onDelete={(id) => {
            setonDeleteAlert({ show: true, data: id })
          }}
          onDownload={handleDownloadIncomeDetails}

        />
      </div>

      <Model
        isOpen={OpenAddIncomeModel}
        onClose={() => setOpenAddIncomeModel(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={addIncomeData} />
      </Model>

      <Model
        isOpen={IncomeGoalModel}
        onClose={() => setIncomeGoalModel(false)}
        title="Add Income Goal"
      >
        <AddGoalForm onIncomeGoal={addGoal} />
      </Model>

      <Model
        isOpen={onDeleteAlert.show}
        onClose={() => setonDeleteAlert({
          show: false, data: null
        })}
        title="Delete Income"
      >
        <DeleteAlert conetent="Are you sure to delete this income"
          onDelete={() => deleteData(onDeleteAlert.data)}
        />
      </Model>
    </DashboardLayout>
  )
}

export default Income