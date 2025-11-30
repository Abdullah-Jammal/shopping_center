import { useQuery } from "@tanstack/react-query";
import { GetStatistics } from "../api/GetStatistics";

export const UseGetStatistics = () => {
  return useQuery({
    queryKey: ["get-statistics"],
    queryFn: GetStatistics,
  });
};
