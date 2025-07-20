"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, Layers, MapPin, Users } from "lucide-react";
import axios from "axios";
import StatsChart from "./StatsChart";

interface StatisticsData {
  totalServiceProviders: number;
  totalCustomers: number;
  totalCategories: number;
  totalLocations: number;
}

const Statistics = () => {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/users/statistics`
        );

        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-6 text-gray-600">
        Loading statistics...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-6 text-red-500">Failed to load data.</div>
    );
  }

  const stats = [
    {
      id: 1,
      label: "Service Categories",
      value: data.totalCategories,
      icon: <Layers className="w-6 h-6 text-primary" />,
      bg: "bg-green-100 dark:bg-slate-700",
    },
    {
      id: 2,
      label: "Active Providers",
      value: data.totalServiceProviders,
      icon: <Users className="w-6 h-6 text-primary" />,
      bg: "bg-green-100 dark:bg-slate-700",
    },
    {
      id: 3,
      label: "Total Customers",
      value: data.totalCustomers,
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      bg: "bg-green-100 dark:bg-slate-700",
    },
    {
      id: 4,
      label: "Locations Covered",
      value: data.totalLocations,
      icon: <MapPin className="w-6 h-6 text-primary" />,
      bg: "bg-green-100 dark:bg-slate-700",
    },
  ];

  return (
    <div className="w-full">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div key={item.id} className="rounded-xl p-6 border">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <StatsChart data={data} />
      </div>
    </div>
  );
};

export default Statistics;
