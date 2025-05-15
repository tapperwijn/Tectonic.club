"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Mock data for the chart
const generateData = () => {
  const data = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
  
  for (let i = 0; i < months.length; i++) {
    data.push({
      name: months[i],
      "Top Player": Math.floor(Math.random() * 500) + 9500,
      "Average": Math.floor(Math.random() * 300) + 5000,
      "You": Math.floor(Math.random() * 400) + 4500,
    });
  }
  
  return data;
};

const ScoreChart = () => {
  const [data, setData] = useState(generateData());
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <div className="h-80 w-full bg-card/50 animate-pulse rounded-lg"></div>;
  
  return (
    <div className="h-80 w-full bg-card p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Score Progression</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#60697b" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            stroke="#60697b" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#60697b" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              borderColor: 'hsl(var(--border))', 
              borderRadius: 'var(--radius)' 
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Top Player" 
            stroke="hsl(var(--primary))" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="Average" 
            stroke="#FFA500" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="You" 
            stroke="#00CED1" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;