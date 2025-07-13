"use client";
import { useEffect, useState } from "react";
import { CardContent, CardTitle, CardHeader, Card } from "@/components/ui/card";

// 🔹 Status badge color map
const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-green-100 text-green-800",
  PENDING: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

interface Booking {
  _id: string;
  providerId: {
    firstName: string;
    lastName: string;
  };
  status: string;
}

const RecentBooking = () => {
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contacts/all-contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success && Array.isArray(data.data)) {
          const filtered = data.data.filter((b: Booking) => b.status === "pending");
          setPendingBookings(filtered);
        }
      } catch (error) {
        console.error("Failed to load bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Card className="rounded-sm shadow-none">
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingBookings.length > 0 ? (
            pendingBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex items-center justify-between p-4 border rounded-sm"
              >
                <div>
                  <p className="font-medium">
                    {booking.providerId?.firstName} {booking.providerId?.lastName}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${statusStyles["PENDING"]}`}
                >
                  Pending
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No pending bookings found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBooking;
