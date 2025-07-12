import React from 'react';
import { IoIosArrowForward } from "react-icons/io";
import moment from 'moment';
import TransactionInfoCard from './TransactionInfoCard'; // Make sure this is correctly imported
import { useNavigate } from 'react-router-dom';

function RecentTransactions({ transactions = [], onseeMore }) {
 
  return (
    <div className='w-[88vw] sm:w-[38.4vw] h-auto bg-white rounded-xl shadow-md p-4 ml-2 mt-4 flex flex-col '>

      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold text-gray-800'>
          Recent Transactions
        </h2>
        <button className='flex items-center text-sm font-semibold text-gray-800 hover:text-purple-700 hover:border-gray-200/50 rounded-xl py-2 px-3 hover:bg-purple-100 duration-700'>
          See All
          <IoIosArrowForward className='ml-2 text-md' />
        </button>
      </div>


      <div className='flex flex-col gap-3'>
        {transactions.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            amount={item.amount}
            type={item.type}
            date={moment(item.date).format("Do MMM YYYY")}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>

  );



}
export default RecentTransactions;
