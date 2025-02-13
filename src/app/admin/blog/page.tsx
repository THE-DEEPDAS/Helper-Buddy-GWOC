"use client";

// blog adding and management page
import { createBlog } from '@/lib/utils/api';
import React, { useState } from 'react';

export default function AdminBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlog(title, content, imageUrl);
      alert('Blog created successfully!');
      setTitle(''); setContent(''); setImageUrl('');
    } catch {
      alert('Failed to create blog.');
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* ...existing code... */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {/* ...existing code... */}
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {/* ...existing code... */}
        <button type="submit">Create Blog</button>
      </form>
      {/* ...existing code... */}
    </div>
  );
}
// ...existing code...