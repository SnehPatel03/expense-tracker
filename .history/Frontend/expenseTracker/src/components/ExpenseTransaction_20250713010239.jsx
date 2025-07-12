import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

function ExpenseTransaction({ transactions, onseeMore }) {
 
  return (
    <div className='w-full sm:w-[80vw] mx-auto mt-6'>

      <div className='flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl shadow-sm'>
        <h2 className='text-md font-semibold text-gray-800'>Recent Transactions</h2>
        <button
          onClick={onseeMore}
          className='flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline'
        >
          See All
          <IoIosArrowForward className='ml-1 text-lg' />
        </button>
      </div>

      {/* Transactions */}
      <div className='mt-4 flex flex-col gap-3'>
        {isValidArray && transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.category}
              icon={item.icon}
              amount={item.amount}
              type="expense"
              date={moment(item.date).format("Do MMM YYYY")}
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4 ml-2">No expense transactions found.</p>
        )}
      </div>
    </div>
  );
}

export default ExpenseTransaction;
