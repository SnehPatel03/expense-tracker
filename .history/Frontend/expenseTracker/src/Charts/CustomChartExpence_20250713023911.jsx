import React from 'react'
import { data } from 'react-router-dom'
import { Bar, BarChart, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function CustomChartExpence() {
    return (
        <div className='bg-white mt-6 '>
            <ResponsiveContainer width="100%" height={300} />
            <BarChart data={data}>
                <CartesianGrid stroke='none' />
                <XAxis dataKey="month" tick={{fontSize:12,fill:"#555" stroke:"none"}}/>
            </BarChart>

        </div>
    )
}

export default CustomChartExpence