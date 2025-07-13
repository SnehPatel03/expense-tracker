import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import CustomTooltip from './CustomTooltip';

function Custom({ data = [] }) {
  console.log("data", data);

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#7C3AED" : "#E9D5FF";
  };

  return (
    <div className='bg-white mt-6 rounded-lg shadow-md p-4 w-[85vw] sm:w-[33.7vw] '>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="source" tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomChartExpence;
