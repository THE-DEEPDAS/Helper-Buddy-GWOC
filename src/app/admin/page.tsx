"use client";

// admin dashboard main page
import React, { useState } from 'react';

export default function AdminDashboardPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'register', email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      alert(data.message);
    } catch {
      alert('Registration error');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      alert(data.message);
    } catch {
      alert('Login error');
    }
  };

  return (
    <div>
      {/* ...existing code... */}
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* ...existing code... */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ...existing code... */}
        <button type="submit">Register</button>
      </form>

      <h2>Sign In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* ...existing code... */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* ...existing code... */}
        <button type="submit">Login</button>
      </form>
      {/* ...existing code... */}
    </div>
  );
}
// ...existing code...
