import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export function useDeleteAccount() {
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/users/delete-account", {
        method: "DELETE",
      });
      const data = await res.json();

      // Throw error to let React Query handle it
      if (!res.ok) {
        throw new Error(data.message);
      }

      // Return data
      return data;
    },

    onSuccess: () => {
      signOut({ callbackUrl: "/login" });
    },
  });

  // Return mutation
  return { mutation };
}
