"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"];

export default function MetricsChart() {
  const [metrics, setMetrics] = useState<
    { title: string; value: number }[]
  >([]);

  const barWidth = 50;
  const chartWidth = metrics.length * barWidth;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASEURL}/contacts/metrics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        if (data.success) {
          setMetrics(data.data);
        }
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="overflow-x-auto bg-white rounded-md p-4">
      <div className="h-[500px]" style={{ minWidth: `${chartWidth}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics}>
            <XAxis dataKey="title" tick={{ fontSize: 12 }} interval={0} />
            <Tooltip />
            <Bar dataKey="value" barSize={barWidth} radius={[8, 8, 0, 0]}>
              {metrics.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
