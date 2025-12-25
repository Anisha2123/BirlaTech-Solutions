import React from "react";
import {
  FaCalendarAlt,
  FaWhatsapp,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const VISIBLE_COUNT = 3;




const services = [
  {
    title: "Basic Website",
    priceLabel: "From",
    price: "₹2K+",
    popular: false,
    description:
      "Clean, fast, and responsive websites for individuals, startups, and early-stage brands.",
    features: [
      "Responsive UI (Mobile & Desktop)",
      "Landing Page or Portfolio Website",
      "Contact Form Integration",
      "Basic SEO & Performance Setup",
    ],
    stacks: ["HTML", "CSS", "JavaScript", "React"],
  },

  {
    title: "Professional Web App",
    priceLabel: "Projects from",
    price: "₹8K+",
    popular: true,
    description:
      "Full-stack web applications built for real users, real data, and real business needs.",
    features: [
      "Authentication & Authorization",
      "Admin Dashboard & User Management",
      "Payment Gateway Integration",
      "REST APIs & Database Design",
    ],
    stacks: ["MERN", "MEAN", "Next.js", "MongoDB", "SQL"],
  },

  {
    title: "Startup MVP Development",
    priceLabel: "Starting at",
    price: "₹20K+",
    popular: false,
    description:
      "Rapid MVP development to validate ideas, attract users, and secure early traction.",
    features: [
      "Product Architecture & Planning",
      "Core Feature Development",
      "Authentication & API Setup",
      "MVP Deployment & Handover",
    ],
    stacks: ["React", "Node.js", "MongoDB", "Firebase"],
  },

  {
    title: "E-Commerce Solutions & Support",
    priceLabel: "From",
    price: "₹40K+",
    popular: false,
    description:
      "Secure and scalable e-commerce platforms tailored for modern online businesses.",
    features: [
      "Product & Order Management",
      "Payment Gateway Integration",
      "User Accounts & Checkout Flow",
      "Admin Dashboard & Analytics",
    ],
    stacks: ["Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
  },

  {
    title: "Advanced Scalable Systems",
    priceLabel: "Enterprise",
    price: "Custom Quote",
    popular: false,
    description:
      "Production-grade systems designed for scalability, security, and long-term growth.",
    features: [
      "Cloud Deployment (AWS)",
      "Scalable Backend Architecture",
      "Role-Based Access Control",
      "Performance & Security Optimization",
    ],
    stacks: ["Next.js", "Node.js", "MongoDB", "AWS", "SQL"],
  },
  {
  title: "Ongoing Support & Optimization",
  priceLabel: "From",
  price: "₹20k / month",
  popular: false,
  description:
    "Continuous maintenance, performance tuning, security updates, and feature improvements for live production systems.",
  features: [
    "Bug Fixes & Monitoring",
    "Performance & SEO Optimization",
    "Security Patches & Backups",
    "Minor Feature Enhancements",
  ],
  stacks: ["AWS", "Node.js", "MongoDB", "React", "CloudFront"],
}

];


const Services = () => {
      const [showAll, setShowAll] = useState(false);

  const visibleServices = showAll
    ? services
    : services.slice(0, VISIBLE_COUNT);

  // Smooth scroll back when collapsing (enterprise UX)
  useEffect(() => {
    if (!showAll) {
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAll]);

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
          Services Offered
        </h2>
        <p className="text-center text-gray-500 text-base max-w-2xl mx-auto mb-16 leading-relaxed">
  Professional web development solutions designed for startups,
  businesses, and scalable products.
</p>
 {/* Animated Height Wrapper */}
        <motion.div
          layout
          initial={false}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {/* Services Grid */}
          <motion.div
            layout
            className="grid gap-10 md:grid-cols-3 py-10"
          >
            <AnimatePresence>
              {visibleServices.map((service) => (
                <motion.div
                  key={service.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative bg-white rounded-3xl border p-8 flex flex-col justify-between
                    ${
                      service.popular
                        ? "border-blue-500 shadow-xl scale-[1.03]"
                        : "border-gray-200 shadow-md hover:shadow-xl"
                    }`}
                >
                  {/* Most Popular Badge */}
                  {service.popular && (
                    <span className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow">
                      Most Popular
                    </span>
                  )}

                  {/* Content */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>

                    <p className="text-3xl font-bold text-blue-600 mb-4">
                      {service.priceLabel} {service.price}
                    </p>

                    <p className="text-gray-900 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-gray-700 text-sm"
                        >
                          <FaCheckCircle className="text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {service.stacks.map((stack) => (
                        <span
                          key={stack}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href="https://calendly.com/birlaani/new-meeting"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                    >
                      <FaCalendarAlt />
                      Book a Call
                    </a>

                    <a
                      href="https://wa.me/916307255290"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 hover:border-green-500 hover:text-green-600 font-semibold transition"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Toggle Button (kept OUTSIDE animated container) */}
        {services.length > VISIBLE_COUNT && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setShowAll(prev => !prev)}
              className="px-8 py-3 rounded-full
                border border-gray-300
                text-gray-800 font-semibold
                hover:border-blue-600 hover:text-blue-600
                transition-all duration-300"
            >
              {showAll ? "Show Less Services" : "View All Services"}
            </button>
          </div>
        )}

        {/* Services Grid */}
       

      </div>
    </section>
  );
};

export default Services;
