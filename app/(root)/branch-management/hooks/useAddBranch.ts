"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { AddBranchSchema } from "../schema/addBranchSchema";
import { toast } from "sonner";

export function useAddBranch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddBranchSchema) =>
      axiosInstance.post("/Branches", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      toast.success("The branch created successfuly");
    },
  });
}
