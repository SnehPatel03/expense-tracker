import React, { useEffect, useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import axios from 'axios';
import Card from '../components/Card';
import { BsCreditCardFill } from "react-icons/bs";
import { RiWallet3Fill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverView from '../components/FinanceOverView';
import ExpenseTransaction from '../components/ExpenseTransaction';
import Last30DaysExpense from '../components/last30DaysExpense';
import IncomeTransaction from '../components/IncomeTransaction';
import Last60DaysIncome from '../components/Last60DaysIncome';


function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate()

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await axios.get(, {
        withCredentials: true,"http://localhost:3000/"
      });
      if (data.data) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in fetch of dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard" >
      <div className='flex mt-15'>
        <div className="p-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <Card
            label="Balance"
            value={dashboardData?.totalBalance || 0}
            icon={BsCreditCardFill}
            color="purple"
          />
          <Card
            label="Income"
            value={dashboardData?.totalIncome || 0}
            icon={RiWallet3Fill}
            color="orange"
          />
          <Card
            label="Expense"
            value={dashboardData?.totalExpense || 0}
            icon={GrMoney}
            color="red"
          />
        </div>
        <div>
        </div>
      </div>
      <div className='flex flex-col mt-3 md:flex-row  md:justify-center md: gap-8'>
        <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onseeMore={
            () => navigateTo("/expense")
          }
        />
        <FinanceOverView
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />
      </div>
      <div className='mt-10 flex flex-col lg:flex-row'>
        <ExpenseTransaction
          transactions={dashboardData?.last30DaysExpense.transactions}
          onseeMore={
            () => navigateTo("/expense")
          }
        />
        <Last30DaysExpense
        data={dashboardData?.last30DaysExpense.transactions}
        />
      </div>

      <div className='    flex flex-col lg:flex-row'>
        <Last60DaysIncome
        data={dashboardData?.last60DaysIncome.transactions}
        />
        <IncomeTransaction
          transactions={dashboardData?.last60DaysIncome.transactions}
          onseeMore={
            () => navigateTo("/income")
          }
        />
      </div>
        


    </DashboardLayout>
  );
}

export default Home;
