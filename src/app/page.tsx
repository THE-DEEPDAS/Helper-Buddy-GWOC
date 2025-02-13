"use client";

import SearchBar from "@/components/ui/SearchBar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Service } from "@/lib/types";
import ServiceCard from "@/components/ui/ServiceCard";
import jwt from "jsonwebtoken";
import Loader from "../../public/assets/Loader.gif";

const JWT_SECRET = process.env.JWT_SECRET!;

// Sample data - Replace with actual API call
const sampleServices: Service[] = [
  {
    id: "1",
    title: "House Cleaning",
    description: "Professional house cleaning services",
    price: 999,
    category: "Cleaning",
    availablePincodes: ["400001", "400002"],
  },
  {
    id: "2",
    title: "Plumbing",
    description: "Expert plumbing services",
    price: 599,
    category: "Plumbing",
    availablePincodes: ["400001", "400003"],
  },
  {
    id: "3",
    title: "Carpentry",
    description: "Expert carpentry services",
    price: 1099,
    category: "Carpentry",
    availablePincodes: ["400001", "400005"],
  },
  {
    id: "4",
    title: "Appliance Repairing",
    description: "Repairing and Service of Appliances",
    price: 1099,
    category: "Repairing",
    availablePincodes: ["400003", "400005"],
  },
];

export default function Home() {
  const [services, setServices] = useState<Service[]>(sampleServices);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        const user = JSON.parse(userData);
        setUser(user);

        // Redirect service providers to their dashboard
        if (user.userType === "serviceProvider") {
          router.push("/provider/dashboard");
        }

        // Extend token expiration to 20 days
        const newToken = jwt.sign(
          { id: decoded.id, email: decoded.email, userType: decoded.userType },
          JWT_SECRET,
          { expiresIn: "20d" }
        );
        localStorage.setItem("token", newToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    // Hide loader after 2 seconds
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [router]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Image src={Loader} alt="Loading..." width={100} height={100} />
        </div>
      ) : (
        <div className="container">
          {/* Background Image with Search Section Overlay */}
          <section className="relative w-full h-auto my-10">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
              {/* Search Bar (55% width on medium+ screens, full width on small screens) */}
              <div className="w-full md:w-7/12 text-center">
                <h1 className="mt-10 text-3xl font-bold">
                  Find Trusted Service Providers
                </h1>
                <h5 className="mt-3 text-lg text-gray-600">
                  Book reliable services at your doorstep
                </h5>
                <div className="mt-5 flex justify-center">
                  <form className="flex w-3/4" role="search">
                    <input
                      className="flex-grow p-2 rounded-l-lg border border-gray-300"
                      type="search"
                      placeholder="What are you looking for?"
                      aria-label="Search"
                    />
                    <button className="px-4 py-2 bg-green-500 text-white rounded-r-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#fff"
                      >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>

              {/* Image (45% width on medium+ screens, hidden on small screens) */}
              <div className="hidden md:flex md:w-5/12 justify-center">
                <Image
                  src="/assets/undraw_booking_1ztt.svg"
                  alt="book"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </section>

          {/* Service Cards Section */}
          <section className="relative mt-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Available Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="relative mt-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    What is HelperBuddy?
                  </h5>
                  <p className="text-gray-600">
                    HelperBuddy is a cleaning service that helps keep your home
                    and office clean. We also clean air conditioning units. Our
                    goal is to make your spaces fresh and healthy.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    What cleaning services do you offer?
                  </h5>
                  <p className="text-gray-600">
                    We offer a variety of cleaning services, including home
                    cleaning, office cleaning, and AC cleaning. Whether you need
                    a deep clean or regular maintenance, we’ve got you covered.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    How do I book a cleaning service?
                  </h5>
                  <p className="text-gray-600">
                    Booking is easy! Just give us a call or fill out our online
                    form. We’ll set up a time that works best for you.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    How much does your service cost?
                  </h5>
                  <p className="text-gray-600">
                    The cost depends on the size of your home or office and the
                    type of cleaning you need. We have options for every budget.
                    For exact prices, check our pricing page/contact us.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    Is HelperBuddy the best cleaning service in India?
                  </h5>
                  <p className="text-gray-600">
                    Many of our customers think so! We pride ourselves on
                    quality service and customer satisfaction. Check our reviews
                    to see what others are saying.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h5 className="text-xl font-semibold mb-2">
                    How can I find good cleaning services near me?
                  </h5>
                  <p className="text-gray-600">
                    If you're looking for reliable cleaning services nearby,
                    Helper Buddy is the answer. We connect you with experienced
                    cleaners who can handle everything from regular home
                    cleaning to deep cleaning. Simply book through our platform,
                    and we’ll send a trusted professional to your home.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="relative mt-16 px-4 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              Get in touch!
            </h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    id="name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    id="email"
                    autoComplete="email"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    We'll never share your email with anyone else.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    id="phone"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    id="desc"
                    rows={4}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </div>
      )}
    </>
  );
}