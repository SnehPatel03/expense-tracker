import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import CustomTooltip from './CustomTooltip';

function CustomPieChart({
  data,
  label ,
  totalAmount,
  colors,
  showTextAnchor = true
}) {
  return (
    <div className="bg-white rounded-xl p-4 pt-3 w-full h-[57vh] sm:w-[30vw] md:w-[24vw] lg:w-[3vw]">
      <h3 className="text-md font-semibold text-center text-gray mb-4 ">
        {label}
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={65}
            labelLine={false}
            // paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={16} iconSize={12} />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-10}
                textAnchor="middle"
                fill="#666"
                fontSize="13px"
              >
                Total
              </text>
              <text
                x="50%"
                y="50%"
                dy={10}
                textAnchor="middle"
                fill="#333"
                fontSize="20px"
                fontWeight="bold"
              >
                {totalAmount || 0}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomPieChart;
