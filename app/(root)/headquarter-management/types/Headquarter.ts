export interface HeadquarterProps {
  id: string;
  name: string;
  branches: Branches[];
  affiliatedCenters: AffiliatedCenter[];
}

export interface AffiliatedCenter {
  name: string;
}

export interface Branches {
  name: string;
}
