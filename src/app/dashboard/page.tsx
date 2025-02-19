'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { ServiceRequest } from '@/lib/types';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, isServiceProvider } = useAuth();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  const fetchServiceRequests = useCallback(async () => {
    try {
      const response = await fetch(`/api/service-requests?providerId=${user?.id}`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setServiceRequests(data);
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isServiceProvider) {
      fetchServiceRequests();
    }
  }, [isServiceProvider, fetchServiceRequests]);

  const handleRequestAction = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      const response = await fetch(`/api/service-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action === 'accept' ? 'accepted' : 'rejected' }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} request`);
      fetchServiceRequests(); // Refresh the list
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Service Requests</h1>
      <div className="grid gap-4">
        {serviceRequests.map((request) => (
          <div key={request.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Service ID: {request.serviceId}</p>
                <p>Date: {new Date(request.dateTime).toLocaleString()}</p>
                <p>Pincode: {request.pincode}</p>
                <p>Status: {request.status}</p>
              </div>
              {request.status === 'pending' && (
                <div className="space-x-2">
                  <Button onClick={() => handleRequestAction(request.id, 'accept')}>Accept</Button>
                  <Button variant="secondary" onClick={() => handleRequestAction(request.id, 'reject')}>Reject</Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
