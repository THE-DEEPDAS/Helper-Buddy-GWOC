"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";

// Define a type for service requests
interface ServiceRequest {
  _id: string;
  serviceCategory: string;
  requestedPincode: string;
  dateTime: string;
}

export default function PartnerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `/api/service-requests?providerId=${user.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }
        const data: ServiceRequest[] = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequests();
  }, [user]);

  const handleAccept = async (requestId: string) => {
    try {
      const response = await fetch("/api/service-requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, providerId: user?.id }),
      });
      if (!response.ok) {
        throw new Error("Failed to accept request");
      }
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <p>Please log in as a Service Provider to view dashboard.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Partner Dashboard</h1>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        <ul className="space-y-2">
          {requests.map((req) => (
            <li
              key={req._id}
              className="p-4 border rounded flex items-center justify-between"
            >
              <div>
                <p className="font-bold">{req.serviceCategory}</p>
                <p className="text-sm">Pincode: {req.requestedPincode}</p>
                <p className="text-sm">
                  Date: {new Date(req.dateTime).toLocaleString()}
                </p>
              </div>
              <button
                className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                onClick={() => handleAccept(req._id)}
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
