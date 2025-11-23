"use client";

import { axiosInstance } from "@/lib/axios";

export async function getBranches({
  search,
  pageNumber,
  pageSize,
}: {
  search: string;
  pageNumber: number;
  pageSize: number;
}) {
  const qs = new URLSearchParams();

  if (search) qs.set("Search", search);
  qs.set("PageNumber", String(pageNumber));
  qs.set("PageSize", String(pageSize));

  const res = await axiosInstance.get(`/Branches?${qs.toString()}`);
  return res.data;
}
