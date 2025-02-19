'use client';

import { useState, useEffect } from 'react';

interface OrderData {
  id: string;
  service: string;
  customer: string;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

export default function PartnerOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulating data fetch
    const fetchOrders = () => {
      setOrders([
        {
          id: '1',
          service: 'House Cleaning',
          customer: 'John Doe',
          status: 'pending',
          date: '2023-10-01'
        },
        {
          id: '2',
          service: 'Plumbing Service',
          customer: 'Jane Smith',
          status: 'completed',
          date: '2023-09-25'
        }
      ]);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">