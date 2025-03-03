import { cn } from "@/app/lib/utils"; // Utility function for merging classNames
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition",
        isLoading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" size={18} /> : children}
    </button>
  );
}
