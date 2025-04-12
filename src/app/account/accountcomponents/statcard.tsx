import React from "react";

interface StatCardProps {
  label: string;
  value: number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      <h2 className="text-xl font-semibold text-ceruleanBlue">{value}</h2>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
