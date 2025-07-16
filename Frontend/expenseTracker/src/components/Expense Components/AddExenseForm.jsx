import React, { useState } from 'react';
import EmojiPicker from '../EmojiPicker';


function AddExpenseForm({ onAddExpense }) {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: ""
  });

  const handleChange = (key, value) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-5 text-gray-700 w-[75vw] sm:w-full">
      <div className="flex flex-col">
        <EmojiPicker
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <label className="text-sm mb-1 font-medium">Expense Category</label>
        <input
          type="text"
          value={expense.category || ''}
          onChange={({ target }) => handleChange("category", target.value)}
          placeholder="Dinner,Shopping, etc."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={expense.amount || ''}
          onChange={({ target }) => handleChange("amount", target.value)}
          placeholder="e.g. 5000"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm mb-1 font-medium">Date</label>
        <input
          type="date"
          value={expense.date || ''}
          onChange={({ target }) => handleChange("date", target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddExpense(expense)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default AddExpenseForm;
