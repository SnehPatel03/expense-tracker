import React, { useEffect, useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';
import axios from 'axios';
import Card from '../components/Card';
import { BsCreditCardFill } from "react-icons/bs";
import { RiWallet3Fill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";


function Home() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await axios.get("http://localhost:3000/", {
        withCredentials: true,
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
    <div className='flex w-full h-screen  '>
      <DashboardLayout activeMenu="Dashboard" >
        <div className="p-2  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <Card
            label="Balance"
            value={dashboardData?.totalBalance || 0 }
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
      </DashboardLayout>
    </div>
  );
}

export default Home;
