"use client";

import { useQuery } from "@tanstack/react-query";
import { getAffiliatedCenters } from "../api/getAffiliatedCenters";

export function useGetAffiliatedCenters() {
  return useQuery({
    queryKey: ["affiliated-centers"],
    queryFn: getAffiliatedCenters,
  });
}
