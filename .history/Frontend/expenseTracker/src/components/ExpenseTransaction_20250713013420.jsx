import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import TransactionInfoCard from './TransactionInfoCard';
import moment from 'moment';

function ExpenseTransaction({ transactions=[] , onseeMore }) {
  return (
    <div className='w-full sm:w-[40vw] mt-6'>

       <div className='ml-1 font-semibold'>Recent Transactions</div>
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
            title={item.category}
            icon={item.icon}
            amount={item.amount}
            type="expense"
            date={moment(item.date).format("Do MMM YYYY")}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseTransaction;
