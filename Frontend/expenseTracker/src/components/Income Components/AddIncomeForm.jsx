import React, { useState } from 'react'
import EmojiPicker from '../EmojiPicker'

function AddIncomeForm({ onAddIncome }) {
    const [income, setincome] = useState([
        {
            source: "",
            amount: "",
            date: "",
            icon: ""

        }
    ])

    const handleChange = (key, value) => setincome({ ...income, [key]: value })
    return (
        <div className="flex flex-col gap-5 text-gray-700">

            <div className="flex flex-col">
<EmojiPicker
icon={income.icon}
onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
/>

                <label className="text-sm mb-1 font-medium">Income Source</label>
                <input
                    type="text"
                    value={income.source}
                    onChange={({ target }) => handleChange("source", target.value)}
                    placeholder="Freelance, Salary, etc."
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
                />
            </div>


            <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">Amount</label>
                <input
                    type="number"
                    value={income.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    placeholder="e.g. 5000"
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
                />
            </div>


            <div className="flex flex-col">
                <label className="text-sm mb-1 font-medium">Date</label>
                <input
                    type="date"
                    value={income.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200 bg-white"
                />
            </div>


            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    onClick={() => onAddIncome(income)}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                    Add Income
                </button>
            </div>
        </div>

    )
}

export default AddIncomeForm