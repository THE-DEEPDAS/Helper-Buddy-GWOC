'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  const { isServiceProvider } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isServiceProvider) {
      router.push('/');
    }
  }, [isServiceProvider, router]);

  if (!isServiceProvider) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav className="space-y-4">
          <a href="/provider/dashboard" className="block hover:text-gray-300">Dashboard</a>
          <a href="/provider/requests" className="block hover:text-gray-300">Service Requests</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
