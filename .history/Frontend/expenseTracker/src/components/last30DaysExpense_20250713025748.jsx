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
import CustomTooltip from '../Charts/CustomTooltip';

function CustomChartExpense({ data }) {
  const getBarColor = (index) => {
    return index % 2 === 0 ? '#875cf5' : '#cfbefb';
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6 w-full max-w-[90vw]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#555' }} />
          <YAxis tick={{ fontSize: 12, fill: '#555' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            activeBar={{ fill: '#ffae42' }}
          >
            {data.map((entry, index) => (
              <Cell key={`Cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomChartExpense;
