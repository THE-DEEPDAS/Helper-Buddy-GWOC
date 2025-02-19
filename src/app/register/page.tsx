'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('user');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, phone, userType }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/services');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration error');
    }
  };

  return (
    <div className='container-fluid my-10' style={{maxWidth: '60%'}}>
      <h1 className='text-center'>Sign Up</h1>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} placeholder='example@email.com' onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div className="mb-3">
          <label className="form-label">Login as?</label>
          <select className="form-select" aria-label="Default select example" value={userType} onChange={(e) => setUserType(e.target.value)} autoComplete="off">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}