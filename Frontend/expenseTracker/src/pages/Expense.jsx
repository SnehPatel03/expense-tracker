import React, { useContext, useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import axios from 'axios'
import Model from '../components/Model'
import toast from 'react-hot-toast'
import DeleteAlert from '../components/Income Components/DeleteAlert'
import AddExpenseForm from '../components/Expense Components/AddExenseForm'
import ExpenseOverview from '../components/Expense Components/ExpenseOverview'
import ExpenseList from '../components/Expense Components/ExpenseList'
import AddExpenseLimit from '../components/Expense Components/AddExpenseLimit'
import { WarningOfLimit } from '../Contexts/WarningOfLimit'

function Expense() {
  const [expenseData, setexpenseData] = useState([])
  const [loading, setloading] = useState(false)
  const [OpenAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [ExpenseLimitModel, setExpenseLimitModel] = useState(false)
  const [expenseLimitData, setExpenseLimitData] = useState(null);
  const [dashboardData, setdashboardData] = useState([])
  const [warning, setwarning] = useContext(WarningOfLimit)
  const [onDeleteAlert, setonDeleteAlert] = useState(
    {
      show: false,
      data: null
    }
  )

 
  const fetchExpenseData = async () => {
    if (loading) return

    setloading(true)
    try {
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/expense/AllExpense", {
        withCredentials: true,
      })

      if (response.data) {
        setexpenseData(response.data)
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
  //Dashboard data end

  const totalExpense = dashboardData.totalExpense || 0;



  const addExpenseData = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      alert("Category Required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Amount should be a valid number and greater than 0");
      return;
    }
    if (!date) {
      alert("Date is required");
      return;
    }

    try {
      await axios.post(
        "https://expense-tracker-backend-jkhf.onrender.com/expense/addexpense",
        { category, amount, date, icon },
        { withCredentials: true }
      );

      setOpenAddExpenseModel(false);
      toast.success("Expense added successfully");
      fetchExpenseData();
    } catch (error) {
      console.log("Error in adding Expense:", error.response.data || error.message);
      toast.error("Failed to add Expense");
    }
  };


  //goal
  const addGoal = async ({ expenseLimit, month, year }) => {
    if (!expenseLimit) {
      toast.error("Enter a Limit for Expense this Month");
      return;
    }

    if (isNaN(expenseLimit)) {
      toast.error("Limit should be a number");
      return;
    }

    try {
      const response = await axios.post(
        "https://expense-tracker-backend-jkhf.onrender.com/goal/set",
        { expenseLimit: Number(expenseLimit), month, year },
        {
          withCredentials: true
        }
      );
      console.log("Expense goal", response)
      setExpenseLimitModel(false);
      toast.success("ExpenseLimit  set successfully!");
    } catch (error) {
      console.log("Error in setting ExpenseLimit:", error.response?.data || error.message);
      toast.error("Failed to set ExpenseLimit");
    }
  };



  useEffect(() => {
    const fetchExpenseLimit = async () => {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      try {
        const res = await axios.get(
          `https://expense-tracker-backend-jkhf.onrender.com/goal/get?month=${currentMonth}&year=${currentYear}`,
          { withCredentials: true }
        );
        console.log("fetchingDataOfLimitexpense", res);
        setExpenseLimitData(res.data.goal.expenseLimit);
        console.log("res.data.goal.expenseLimit", res.data.goal.expenseLimit)
      } catch (err) {
        console.log("Error fetching expense limit", err.response?.data);
      }
    };

    fetchExpenseLimit();
  }, []);

  console.log("totalExpense", totalExpense)

  useEffect(() => {
    if (expenseLimitData != 0 && totalExpense != 0) {
      if (totalExpense > expenseLimitData) {
        setwarning("👀 You've crossed your Monthly Expense Limit!");
      }
    }
  }, [expenseLimitData, totalExpense]);


  const deleteData = async (id) => {

    try {
      await axios.delete(`https://expense-tracker-backend-jkhf.onrender.com/expense/${id}`, {
        withCredentials: true
      })
      setonDeleteAlert({ data: null, show: false })
      toast.success("Expense Deleted Successfully")
      fetchExpenseData()
    } catch (error) {
      console.log("error in deleteing expense", error)
      toast.error("Error in Deleteing Expense")
    }

  }
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/expense/expensePdf", {
        responseType: "blob", 
        withCredentials: true 
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Expense_Report.pdf';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading expense PDF:", error);
      toast.error("Failed to download expense report");
    }
  };



  useEffect(() => {
    fetchExpenseData()
  }, [])

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className='flex mt-15'>
        <div className='grid grid-cols-1 gap-6'>
          <div >
            <div>
              {warning && (
                <h2 className="fixed w-[135vw] top-17 left-1/2 sm:top-17 sm:left-190 transform -translate-x-1/2 bg-red-50/70 backdrop-blur-sm text-red-700 text-sm px-4 py-2 rounded-md shadow-md z-10 transition-all duration-300 ease-linear font-semibold flex items-center justify-center">
                  {warning}
                </h2>
              )}
            </div>
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
              onExpenseLimit={() => setExpenseLimitModel(true)}
            />
          </div>
        </div>
      </div>
      <div className=' flex items-center '>
        <ExpenseList
          transaction={expenseData}
          onDelete={(id) => {
            setonDeleteAlert({ show: true, data: id })
          }}
          onDownload={handleDownloadExpenseDetails}

        />
      </div>


      <Model
        isOpen={ExpenseLimitModel}
        onClose={() => setExpenseLimitModel(false)}
        title="Add Expense Limit"
      >
        <AddExpenseLimit onExpenseLimit={addGoal} />
      </Model>


      <Model
        isOpen={OpenAddExpenseModel}
        onClose={() => setOpenAddExpenseModel(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={addExpenseData} />
      </Model>

      <Model
        isOpen={onDeleteAlert.show}
        onClose={() => setonDeleteAlert({
          show: false, data: null
        })}
        title="Delete Expense"
      >
        <DeleteAlert conetent="Are you sure to delete this Expense"
          onDelete={() => deleteData(onDeleteAlert.data)}
        />
      </Model>
    </DashboardLayout>
  )
}

export default Expense