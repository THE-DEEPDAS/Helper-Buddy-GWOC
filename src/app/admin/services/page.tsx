"use client";

import { useState } from "react";

interface ServiceData {
  id: string;
  name: string;
  status: "active" | "inactive";
  category: string;
  price: number;
}

export default function AdminServices() {
  const [services] = useState<ServiceData[]>([
    {
      id: "1",
      name: "House Cleaning",
      status: "active",
      category: "Cleaning",
      price: 999,
    },
    {
      id: "2",
      name: "Plumbing Service",
      status: "active",
      category: "Plumbing",
      price: 599,
    },
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Services Management</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Service Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {service.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {service.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${service.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
