import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../lib/auth/getcurrentuser";
import { User } from "firebase/auth";

export function useUser() {
  const { isLoading, data: currentUser } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user: currentUser,
    isAuthenticated: !!currentUser?.uid,
  };
}
