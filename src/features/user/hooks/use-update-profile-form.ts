"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { updateProfileSchema } from "@/features/user/lib/schema/update-profile.schema";
import {
  IProfileResponse,
  IUpdateProfileSchema,
} from "@/features/user/lib/types/user";
import { IUser } from "@/features/auth/lib/types/user";

interface UseUpdateProfileFormProps {
  initialData?: IUser;
}

export default function useUpdateProfileForm({
  initialData,
}: UseUpdateProfileFormProps) {
  // Form setup
  const form = useForm<IUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
    },
  });

  // Sync external data → form
  useEffect(() => {
    if (!initialData) return;

    form.reset({
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      username: initialData.username || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
    });
  }, [initialData]);

  // Update profile mutation
  const mutation = useMutation({
    mutationFn: async (values: IUpdateProfileSchema) => {
      const res = await fetch("/api/users/update-profile", {
        method: "PATCH",
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: IProfileResponse = await res.json();

      if (!data.status) {
        throw new Error(data.message);
      }

      return data;
    },
  });

  function onSubmit(values: IUpdateProfileSchema) {
    mutation.mutate(values);
  }

  return {
    form,
    onSubmit,
    mutation,
  };
}
