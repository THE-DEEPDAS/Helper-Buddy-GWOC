"use client";

import { useState, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  services: string[];
}

export default function PartnerProfile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    services: [],
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    // Simulating data fetch
    const fetchProfile = () => {
      setProfile({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        services: ["House Cleaning", "Plumbing"],
      });
    };

    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Profile and Services Area Settings
      </h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Profile Information</h2>
        <p className="text-gray-600">
          <strong>Name:</strong> {profile.name}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="text-gray-600">
          <strong>Phone:</strong> {profile.phone}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Services Offered</h2>
        <ul className="list-disc list-inside text-gray-600">
          {profile.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
