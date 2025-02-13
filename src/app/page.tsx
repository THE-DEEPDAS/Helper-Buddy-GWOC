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
          <section className="container relative mt-16 px-4">
            <h2 className="text-center">Frequently Asked Questions</h2>
            <div className="container mt-4">
              <div className="row d-flex justify-content-center g-3">
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>What is HelperBuddy?</h5>
                    <p>
                      HelperBuddy is a cleaning service that helps keep your
                      home and office clean. We also clean air conditioning
                      units. Our goal is to make your spaces fresh and healthy.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>What cleaning services do you offer?</h5>
                    <p>
                      We offer a variety of cleaning services, including home
                      cleaning, office cleaning, and AC cleaning. Whether you
                      need a deep clean or regular maintenance, we’ve got you
                      covered.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center g-3">
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>How do I book a cleaning service?</h5>
                    <p>
                      Booking is easy! Just give us a call or fill out our
                      online form. We’ll set up a time that works best for you.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>How much does your service cost?</h5>
                    <p>
                      The cost depends on the size of your home or office and
                      the type of cleaning you need. We have options for every
                      budget. For exact prices, check our pricing page/contact
                      us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center g-3">
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>Is HelperBuddy the best cleaning service in India?</h5>
                    <p>
                      Many of our customers think so! We pride ourselves on
                      quality service and customer satisfaction. Check our
                      reviews to see what others are saying.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="card border-0 p-3">
                    <h5>How can I find good cleaning services near me?</h5>
                    <p>
                      If you're looking for reliable cleaning services nearby,
                      Helper Buddy is the answer. We connect you with
                      experienced cleaners who can handle everything from
                      regular home cleaning to deep cleaning. Simply book
                      through our platform, and we’ll send a trusted
                      professional to your home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="container relative mt-16 px-4">
            <h2 className="text-center">Get in touch!</h2>
            <div className="container" style={{ maxWidth: "60%" }}>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    autoComplete="name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="example@email.com"
                    autoComplete="email"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    autoComplete="tel"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="desc"
                    autoComplete="description"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
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