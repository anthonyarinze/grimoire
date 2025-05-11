import React from "react";
import Link from "next/link";
import { FaSearch, FaBook, FaChartLine } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={28} />,
    title: "Discover Books",
    description:
      "Search for books across genres and find your next favorite read.",
    href: "/explore",
  },
  {
    icon: <FaBook size={28} />,
    title: "Track Your Progress",
    description:
      "Add books to your library and organize them by reading status.",
    href: "/library",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Meet Your Goals",
    description: "Set reading goals and watch your progress grow.",
    href: "/account",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-12 text-center bg-white text-black dark:bg-gray-900 dark:text-gray-300">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, idx) => (
          <Link
            key={idx}
            href={step.href}
            className="flex flex-col items-center p-6 rounded-lg bg-white text-gray-800 shadow-md
                      dark:bg-gray-800 dark:text-gray-200 dark:shadow-lg border border-gray-200 dark:border-gray-700
                      transition-transform transform hover:scale-105 hover:brightness-105 hover:shadow-lg dark:hover:shadow-xl"
          >
            <div className="bg-ceruleanBlue text-white rounded-full p-4 mb-4 shadow-md">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              {step.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
