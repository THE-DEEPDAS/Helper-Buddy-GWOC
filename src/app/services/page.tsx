"use client";

import SearchBar from "@/components/ui/SearchBar";
import ServiceCard from "@/components/ui/ServiceCard";
import ServiceFilter from "@/components/shared/ServiceFilter";
import { useState, useEffect } from "react";
import { Service } from "@/lib/types";
import ServiceProviderForm from "@/components/ui/ServiceProviderForm";
import { useAuth } from "@/lib/auth";

// Sample data - Replace with actual API call
const sampleServices: Service[] = [
  {
    id: "1",
    title: "House Cleaning",
    description: "Professional house cleaning services",
    price: 999,
    category: "Cleaning",
    availablePincodes: ["400001", "400002"],
    image: "/images/cleaning.jpg",
  },
  {
    id: "2",
    title: "Plumbing",
    description: "Expert plumbing services",
    price: 599,
    category: "Plumbing",
    availablePincodes: ["400001", "400003"],
    image: "/images/plumbing.jpg",
  },
  // Add more sample services
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(sampleServices);
  const { user, isServiceProvider } = useAuth();

  const handleSearch = (query: string) => {
    if (!query) {
      setServices(sampleServices);
      return;
    }

    const filtered = sampleServices.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase())
    );
    setServices(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isServiceProvider && (
        <ServiceProviderForm
          onSubmit={() => {
            /* Implement your submit logic here */
          }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <ServiceFilter
            onFilter={(filters) => {
              // Implement your filter logic here
              const filtered = sampleServices.filter((service) => {
                const matchesCategory = filters.category
                  ? service.category === filters.category
                  : true;
                const matchesPincode = filters.pincode
                  ? service.availablePincodes.includes(filters.pincode)
                  : true;
                return matchesCategory && matchesPincode;
              });
              setServices(filtered);
            }}
          />
        </aside>

        <main className="md:col-span-3">
          <div className="mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search services..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
