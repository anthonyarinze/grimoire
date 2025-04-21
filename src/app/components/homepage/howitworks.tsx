import React from "react";
import { FaSearch, FaBook, FaChartLine } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch size={28} />,
    title: "Discover Books",
    description:
      "Search for books across genres and find your next favorite read.",
  },
  {
    icon: <FaBook size={28} />,
    title: "Track Your Progress",
    description:
      "Add books to your library and organize them by reading status.",
  },
  {
    icon: <FaChartLine size={28} />,
    title: "Meet Your Goals",
    description: "Set reading goals and watch your progress grow.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="px-6 py-12 text-center text-black bg-white">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid gap-8 sm:grid-cols-3">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center text-gray-700">
            <div className="bg-ceruleanBlue text-white rounded-full p-4 mb-4">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
