import React from 'react'
import { data } from 'react-router-dom'
import { Bar, BarChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'

function CustomChartExpence() {
    return (
        <div className='bg-white mt-6 '>
            <ResponsiveContainer width="100%" height={300} />
            <BarChart data={data}>
                <CartesianGrid stroke='none' />
                <XAxis dataKey="month" tick={{fontSize:12,fill:"#555"}}  stroke="none"/>
                <YAxis  tick={{fontSize:12,fill:"#555"}}  stroke="none"/>
                <Tooltip content={CustomTooltip}/>
                <Bar
                    dataKey="amount"    
                    fill="#FF8043"
                    radius={[10,10,0,0]}
                    ac
                    >
                </Bar>
            </BarChart>

        </div>
    )
}

export default CustomChartExpence