import React from 'react';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const item = payload[0];

    return (
      <div className="bg-white border border-gray-300 shadow-md rounded-md px-3 py-2 text-sm text-gray-800">
        <p className="font-semibold">{item.name}</p>
        <p className="text-xs text-gray-600">S: ₹{parseFloat(item.value).toFixed(2)}</p>
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
