"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface StatsChartProps {
  data: {
    totalServiceProviders: number;
    totalCustomers: number;
    totalCategories: number;
    totalLocations: number;
  };
}

const COLORS = ["#34D399", "#60A5FA", "#A78BFA", "#F87171"];

const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const chartData = [
    {
      name: "Categories",
      value: data.totalCategories,
    },
    {
      name: "Providers",
      value: data.totalServiceProviders,
    },
    {
      name: "Customers",
      value: data.totalCustomers,
    },
    {
      name: "Locations",
      value: data.totalLocations,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto mt-12">
      <h3 className="text-xl font-semibold text-center mb-4 text-slate-900">
        Overview Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
