import { axiosInstance } from "@/lib/axios";

export async function getAffiliatedCenters({
  search,
  page,
  pageSize,
  headquarterId,
  branchId,
}: {
  search: string;
  page: number;
  pageSize: number;
  headquarterId?: string | null;
  branchId?: string | null;
}) {
  const qs = new URLSearchParams();

  if (search) qs.set("Search", search);
  if (headquarterId) qs.set("HeadquarterId", headquarterId);
  if (branchId) qs.set("BranchId", branchId);

  qs.set("PageNumber", String(page));
  qs.set("PageSize", String(pageSize));

  const res = await axiosInstance.get(`/AffiliatedCenters?${qs.toString()}`);
  return res.data;
}
