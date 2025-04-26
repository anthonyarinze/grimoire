import React from "react";

interface StatCardProps {
  label: string;
  value: number;
  isLoading: boolean;
}

export default function StatCard({ label, value, isLoading }: StatCardProps) {
  return (
    <div className="bg-white shadow p-4 rounded text-center">
      {isLoading ? (
        <div className="flex justify-center items-center space-x-1 h-6">
          <div className="w-2 h-2 bg-ceruleanBlue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-ceruleanBlue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-ceruleanBlue rounded-full animate-bounce"></div>
        </div>
      ) : (
        <h2 className="text-xl font-semibold text-ceruleanBlue">{value}</h2>
      )}
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}
