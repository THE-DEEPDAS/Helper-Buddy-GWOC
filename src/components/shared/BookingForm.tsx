'use client';

import { useState } from 'react';
import { Service } from '@/lib/types';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface BookingFormProps {
  service: Service;
  onSubmit: (data: { dateTime: Date; remarks: string }) => void;
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [dateTime, setDateTime] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTime) {
      alert('Please select a date and time');
      return;
    }
    onSubmit({ dateTime: new Date(dateTime), remarks });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="datetime-local"
          label="Select Date and Time"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Input
          label="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Any specific requirements..."
        />
      </div>
      <Button type="submit">Confirm Booking</Button>
    </form>
  );
}
