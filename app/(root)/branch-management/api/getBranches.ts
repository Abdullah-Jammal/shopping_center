"use client";

import { axiosInstance } from "@/lib/axios";

export async function getBranches({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) {
  const qs = new URLSearchParams();

  if (search) qs.set("Search", search);
  qs.set("PageNumber", String(page));
  qs.set("PageSize", String(pageSize));

  const res = await axiosInstance.get(`/Branches?${qs.toString()}`);
  return res.data;
}
