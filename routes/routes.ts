import { Home, FileText, Bell, Users, Building2 } from "lucide-react";

export const items = [
  { title: "الصفحة الرئيسية", url: "/", icon: Home },
  { title: "إدارة المستخدمين", url: "/user-management", icon: Users },
  {
    title: "أدارة المقرات الرئيسية",
    url: "/headquarter-management",
    icon: FileText,
  },
  { title: "أدارة الفروع", url: "/branch-management", icon: Bell },
  {
    title: "ادارة المراكز التابعة",
    url: "/affiliatedCenter-management",
    icon: Building2,
  },
];
