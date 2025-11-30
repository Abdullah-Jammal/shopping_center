export interface BranchProps {
  id: string;
  name: string;
  address: string;
  headquarterName: string;
  affiliatedCenters: AffiliatedProps[];
}

export interface AffiliatedProps {
  name: string;
}
