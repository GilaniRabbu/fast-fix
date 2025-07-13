"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react";
// import { CalendarDays, MapPin, Heart, TrendingUp } from "lucide-react"
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const icons = [
  {
    title: "Total Service Requests",
   
    icon: ClipboardList,
  },
  {
    title: "Pending Requests",
  
    icon: Clock,
  },
  {
    title: "Completed Services",
   
    icon: CheckCircle,
  },
  {
    title: "Cancelled Services",
    
    icon: XCircle,
  },
];

export default function UserOverview() {
  const [metrics, setMetrics] = useState<
      { title: string; value: number }[]
    >([]);
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
        // Merge the icons based on matching title
        const merged = data.data.map((metric: { title: string; value: number }) => {
          const match = icons.find((icon) => icon.title === metric.title);
          return {
            ...metric,
            icon: match?.icon,
          };
        });

        setMetrics(merged);
      }
    } catch (error) {
      console.error("Failed to load metrics:", error);
    }
  };

  fetchMetrics();
}, []);


  return (
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {metrics.map((metric) => {
    const Icon = metric.icon;
    return (
      <Card
        key={metric.title}
        className="relative overflow-hidden rounded-sm shadow-none"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {metric.title}
          </CardTitle>
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{metric.value}</div>
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>

  )
}

