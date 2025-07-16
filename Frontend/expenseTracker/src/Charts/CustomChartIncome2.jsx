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
import CutomTooltipIncome from './cutomeToolTipIncome';

function CustomChartIncome2({ data = [] }) {
  const gradientId = "purpleGradient";

  const getBarColor = (index) => {
    return index % 2 === 0 ? "url(#purpleGradient)" : "#ddd6fe"; 
  };

  return (
    <div className='bg-white rounded-xl shadow-md p-4 w-[85vw] sm:w-[65vw] py-10'>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} barCategoryGap="20%">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.8} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6B7280" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CutomTooltipIncome />} />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            barSize={40}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(index)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomChartIncome2;
