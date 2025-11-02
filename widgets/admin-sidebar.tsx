import { Home, Users } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/admin/groups",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-border">
      <SidebarContent className="pr-2 pt-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActiveURL = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton isActive={isActiveURL} asChild>
                  <Link href={item.url} className="h-auto p-3">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
