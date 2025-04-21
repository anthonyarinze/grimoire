import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOutUser } from "../lib/auth/signout";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/auth/login");
    },
  });

  return { logout, isPending };
}
