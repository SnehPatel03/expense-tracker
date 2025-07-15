import React from 'react';
import {
  LuTrash2,
  LuTrendingUp,
  LuTrendingDown,
  LuUtensils,
} from 'react-icons/lu';

function TransactionInfoCard({
  title,
  icon,
  amount,
  type,
  date,
  hideDeleteBtn = false,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between gap-4 w-[85vw] sm:w-[40vw] ml-2 mt-3 p-4 rounded-lg hover:bg-gray-100 shadow-sm bg-white transition">

      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-200 rounded-full shrink-0">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        <p className="text-sm font-medium text-gray-700 truncate capitalize">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

  
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-white text-xs font-semibold ${
            type === 'income' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {type === 'income' ? '+' : '-'}₹ {parseFloat(amount).toFixed(2)}
          {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {!hideDeleteBtn && (
          <button
            onClick={onDelete}
            className="text-gray-500 hover:text-red-500 transition-colors"
            aria-label="Delete Transaction"
          >
            <LuTrash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionInfoCard;