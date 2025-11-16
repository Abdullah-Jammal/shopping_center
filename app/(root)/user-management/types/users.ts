export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  entityType: string;
  heaqquarterId: string | null;
  roles: string[];
}

export interface UsersResponse {
  data: User[];
  metadata: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}


export interface UseGetUsersProps {
  page?: number;
  pageSize?: number;
  search?: string;
  filterType?: string | null;
}


export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filterType?: string | null;
}