'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { ServiceRequest } from '@/lib/types';
import Button from '@/components/ui/Button';

export default function ServiceRequests() {
  const { user } = useAuth();
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);

  const fetchPendingRequests = useCallback(async () => {
    try {
      const response = await fetch(`/api/provider/requests?status=pending&providerId=${user?.id}`);
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setPendingRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchPendingRequests();
    }
  }, [user, fetchPendingRequests]);

  const handleRequestAction = async (requestId: string, action: 'accept' | 'reject') => {
    try {
      const response = await fetch(`/api/provider/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action === 'accept' ? 'ACCEPTED' : 'REJECTED' }),
      });

      if (!response.ok) throw new Error(`Failed to ${action} request`);
      fetchPendingRequests(); // Refresh the list
    } catch (error) {
      console.error(`Error ${action}ing request:`, error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Service Requests</h1>
      <div className="grid gap-4">
        {pendingRequests.map((request) => (
          <div key={request.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Service: {request.serviceId}</p>
                <p>Requested for: {new Date(request.dateTime).toLocaleString()}</p>
                <p>Location: {request.pincode}</p>
              </div>
              <div className="space-x-2">
                <Button onClick={() => handleRequestAction(request.id, 'accept')}>
                  Accept
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => handleRequestAction(request.id, 'reject')}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
