'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentModalProps {
  amount: number;
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ amount, isOpen, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const initializePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });
      const order = await response.json();
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: async () => {
          // Handle payment success
          router.push(`/booking/success?orderId=${order.id}`);
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
        <p className="mb-4">Amount to pay: ₹{amount}</p>
        <div className="flex gap-4">
          <button
            onClick={initializePayment}
            disabled={loading}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
