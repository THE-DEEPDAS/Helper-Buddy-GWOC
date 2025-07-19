'use client';

import { useState, useEffect } from 'react';

interface WalletData {
  totalReferrals: number;
  totalEarnings: number;
  totalWithdrawals: number;
  balance: number;
}

export default function AdminWallet() {
  const [walletData, setWalletData] = useState<WalletData>({
    totalReferrals: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
    balance: 0
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulating data fetch
    const fetchWalletData = () => {
      setWalletData({
        totalReferrals: 50,
        totalEarnings: 10000,
        totalWithdrawals: 5000,
        balance: 5000
      });
    };

    fetchWalletData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Wallet Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Referrals</h2>
          <p className="text-2xl font-bold">{walletData.totalReferrals}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Earnings</h2>
          <p className="text-2xl font-bold">₹{walletData.totalEarnings}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Total Withdrawals</h2>
          <p className="text-2xl font-bold">₹{walletData.totalWithdrawals}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-gray-500">Balance</h2>
          <p className="text-2xl font-bold">₹{walletData.balance}</p>
        </div>
      </div>
    </div>
  );
}
