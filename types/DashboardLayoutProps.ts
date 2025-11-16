import { ReactNode } from "react";

export interface DashboardLayoutProps {
  title?: string;
  subtitle?: string;
  userName?: string;
  role?: string;
  children: React.ReactNode;
}