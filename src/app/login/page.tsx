'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, userType }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.userType === 'serviceProvider') {
          router.push('/provider/dashboard');
        } else {
          router.push('/services');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  return (
    <div className="container-fluid my-10 p-4 max-w-md mx-auto">
      <h1 className="text-center">Sign In</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            value={email} 
            placeholder="example@email.com" 
            onChange={(e) => setEmail(e.target.value)} 
            autoComplete="email" 
            aria-describedby="emailHelp" 
          />
          <div id="emailHelp" className="form-text">
            We&apos;ll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            autoComplete="current-password" 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Login as?</label>
          <select 
            className="form-select" 
            aria-label="Default select example" 
            value={userType} 
            onChange={(e) => setUserType(e.target.value)} 
            autoComplete="off"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="serviceProvider">Service Provider</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
