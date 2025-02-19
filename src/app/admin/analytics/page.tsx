"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  totalUsers: number;
  totalServices: number;
  totalBookings: number;
  revenue: number;
}

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 0,
    totalServices: 0,
    totalBookings: 0,
    revenue: 0,
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulating data fetch
    const fetchAnalytics = () => {
      setAnalytics({
        totalUsers: 150,
        totalServices: 25,
        totalBookings: 300,
        revenue: 45000,
      });
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="text-2xl font-bold">{analytics.totalUsers}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Services</h2>
          <p className="text-2xl font-bold">{analytics.totalServices}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Bookings</h2>
          <p className="text-2xl font-bold">{analytics.totalBookings}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Revenue</h2>
          <p className="text-2xl font-bold">₹{analytics.revenue}</p>
        </div>
      </div>
    </div>
  );
}
