
IncomeTransaction
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

function IncomeTransaction({ transactions = [], onseeMore }) {
  return (
    <div className='w-full sm:w-[40vw] mt-6 ml-3'>
      <div className='flex justify-between text-gray-800 items-center w-[85vw] mt-4 p-3 ml-2 pr-3 h-13 bg-gray-200/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[40vw] sm:h-[10vh] sm:pr-2'>
        <div className='ml-1 font-semibold'>Incomes</div>
        <button
          onClick={onseeMore}
          className='flex justify-center text-gray-800 items-center text-sm hover:text-purple-700  border-gray-200/50 rounded-xl mr-2 py-2 px-3 hover:bg-purple-200 duration-700'
        >
          See All
          <IoIosArrowForward className='ml-2 text-md' />
        </button>
      </div>

      <div className='mt-4 flex flex-col gap-3'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            amount={item.amount}
            type="income"
            date={moment(item.date).format("Do MMM YYYY")}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default IncomeTransaction;
