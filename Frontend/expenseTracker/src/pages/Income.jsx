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
  const [dashboardData, setdashboardData] = useState([])
  const [IncomeGoal, setIncomeGoal] = useState("")
  const [goal, setgoal] = useState("")
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
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/income/AllIncome", {
        withCredentials: true,
      })

      if (response.data) {
        setincomeData(response.data)
      }
    } catch (error) {
      console.log("There is error in income fetching", error)
    } finally { setloading(false) }
  }

  //Dashboard Data
  const fetchDashboardData = async () => {

    try {
      const data = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/", {
        withCredentials: true,
      });

      if (data.data) {
        setdashboardData(data.data);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in fetch of dashboard");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  //Dashboard data End


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
        "https://expense-tracker-backend-jkhf.onrender.com/income/addIncome",
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

  const totalIncome = dashboardData.totalIncome
  console.log(totalIncome)

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
        "https://expense-tracker-backend-jkhf.onrender.com/goal/set",
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

  useEffect(() => {
    const fetchIncomeGoal = async () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      try {
        const res = await axios.get(
          `https://expense-tracker-backend-jkhf.onrender.com/goal/get?month=${currentMonth}&year=${currentYear}`,
          { withCredentials: true }
        );
        console.log("fetchingIncomeGoal", res);
        setIncomeGoal(res.data.goal.incomeGoal);
        console.log("res.data.goal.incomeGoal", res.data.goal.incomeGoal)
      } catch (err) {
        console.log("Error fetching INcome Goal", err.response?.data);
      }
    };

    fetchIncomeGoal();
  }, []);

  console.log("totalIncome", totalIncome)
  console.log("IncomeGoal",IncomeGoal)

  useEffect(() => {
    if (IncomeGoal != 0 && totalIncome != null) {
      if (totalIncome > IncomeGoal) {
        console.log("🎉 You've achive Your monthly Income Goal")
        setgoal("Congrats!!! 🎉 You've achive Your Monthly Income Goal");
      }
    }
  }, [IncomeGoal, totalIncome]);

  const deleteData = async (id) => {

    try {
      await axios.delete(`https://expense-tracker-backend-jkhf.onrender.com/income/${id}`, {
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
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/income/incomePdf", {
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
             <div>
              {goal && (
                <h2 className="fixed w-[100vw] sm:w-[125vw] top-16 left-1/2 sm:top-17 sm:left-190 transform -translate-x-1/2 bg-blue-50/70 backdrop-blur-sm text-blue-700 text-sm px-4 py-2 rounded-md shadow-md z-10 transition-all duration-300 ease-linear font-medium flex items-center justify-center text-center">
                  {goal}
                </h2>
              )}
            </div>
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