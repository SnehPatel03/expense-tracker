import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import CutomTooltipIncome from './cutomeToolTipIncome';
import CustomTooltip from './CustomTooltip';

function CustomChartExpense2({ data = [] }) {
  const gradientId = "lineGradient";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-5 w-[85vw] sm:w-[60vw] py-10">
      <ResponsiveContainer width="100%" height={330}>
        <LineChart data={data}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity={1} />
              <stop offset="100%" stopColor="#ddd6fe" stopOpacity={1} />
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
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="amount"
            stroke={`url(#${gradientId})`}
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomChartExpense2;
