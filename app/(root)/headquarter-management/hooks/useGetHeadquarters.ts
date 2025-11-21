"use client";

import { useQuery } from "@tanstack/react-query";
import { getHeadquarters } from "../api/getHeadquarters";

export function useGetHeadquarters() {
  return useQuery({
    queryKey: ["headquarters"],
    queryFn: getHeadquarters,
  });
}
