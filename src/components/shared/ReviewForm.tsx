'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface ReviewFormProps {
  bookingId: string;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export default function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <form className="space-y-4" onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ rating, comment });
    }}>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        className="w-full p-2 border rounded-md"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        rows={4}
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Submit Review
      </button>
    </form>
  );
}
