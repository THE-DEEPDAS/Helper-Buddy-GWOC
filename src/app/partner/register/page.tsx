"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

export default function PartnerRegisterPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    pincodes: "",
    services: "",
  });

  if (user) {
    router.push("/partner/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          pincodes: form.pincodes.split(","),
          services: form.services.split(","),
        }),
      });
      if (!res.ok) {
        throw new Error("Registration failed");
      }
      const data = await res.json();
      await login(data.provider, data.token);
      router.push("/partner/dashboard");
    } catch (error) {
      alert("Registration failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="mb-4 text-2xl">Service Provider Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Provider Name"
          className="w-full border p-2"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Provider Email"
          className="w-full border p-2"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pincodes"
          placeholder="Pincodes (comma-separated)"
          className="w-full border p-2"
          value={form.pincodes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="services"
          placeholder="Services (comma-separated)"
          className="w-full border p-2"
          value={form.services}
          onChange={handleChange}
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
