import React from 'react'
import { BsDownload } from 'react-icons/bs'
import TransactionInfoCard from '../TransactionInfoCard'
import moment from 'moment'


function ExpenseList({ transaction, onDelete, onDownload }) {
    return (
        <div>
            <div className='flex justify-between text-gray-800 items-center w-[85vw] mt-10 p-3 ml-5 pr-3 h-13 bg-gray-200/55 border-gray-100 shadow-gray-400 rounded-xl sm:w-[68vw] px-5 sm:h-[10vh] sm:pr-2'>
                <div className='ml-1 font-semibold text-sm sm:text-md'>Expense Categories</div>
                <button
                onClick={onDownload}

                    className='flex justify-center text-gray-800 items-center text-sm hover:text-purple-700  border-gray-200/50 rounded-xl mr-2 py-2 px-3 hover:bg-purple-200 duration-700'
                >
                    <h1 className='text-md font-medium'>Download </h1>
                    <BsDownload className='ml-3 font-bold text-lg' />
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-[98vw] sm:w-[68vw] ml-3'>
                {transaction?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MM YYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList