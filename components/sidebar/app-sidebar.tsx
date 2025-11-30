"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { items } from "@/routes/routes";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative">
      {collapsed && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          className="fixed top-6 right-4 z-50"
        >
          <SidebarTrigger
            onClick={() => setCollapsed(false)}
            className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          />
        </motion.div>
      )}

      <Sidebar
        side="right"
        className={`border-l border-border transition-all duration-300 ${
          collapsed
            ? "w-[70px]"
            : "from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 shadow-sm"
        }`}
      >
        <SidebarContent
          dir="rtl"
          className="text-right py-6 px-3 transition-all duration-300 flex flex-col justify-between"
        >
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex justify-between items-center">
              {!collapsed && (
                <div className="text-lg mb-1">جمعية رايبطة العلماء</div>
              )}

              <SidebarTrigger
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              />
            </SidebarGroupLabel>

            <SidebarGroupContent dir="ltr" className="mt-3">
              <SidebarMenu className="space-y-1.5">
                {items.map((item, index) => (
                  <SidebarMenuItem key={item.title}>
                    <motion.div
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SidebarMenuButton
                        asChild
                        className={`flex flex-row-reverse items-center justify-start gap-3 w-full rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group ${
                          collapsed ? "justify-center py-3" : "px-3 py-2.5"
                        }`}
                      >
                        <Link href={item.url} className="flex items-center">
                          <item.icon
                            className={`size-5 transition-transform group-hover:scale-110 ${
                              collapsed ? "ml-0" : "ml-2"
                            }`}
                          />
                          {!collapsed && (
                            <motion.span
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-sm font-medium"
                            >
                              {item.title}
                            </motion.span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </motion.div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <p className="text-center text-gray-400 text-xs">version 0.04</p>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
