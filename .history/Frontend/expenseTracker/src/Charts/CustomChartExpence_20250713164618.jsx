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

function CustomChartExpence({ data = [] }) {
  console.log("data", data);

  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  return (
    <div className='bg-white mt-6 rounded-lg shadow-md p-4 sm:w-[85vw] '>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#555" }} />
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
