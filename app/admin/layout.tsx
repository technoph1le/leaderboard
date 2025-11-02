"use client";

import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { AppSidebar } from "@/widgets/admin-sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      router.push("/auth");
    }
  }, [isAdmin, router]);

  if (!isAdmin) return null;

  return (
    <div className="wrapper">
      <SidebarProvider className="relative overflow-hidden">
        <AppSidebar />
        <main className="w-full">
          <section className="p-4 space-y-4">
            <Button size="icon" variant="outline" asChild>
              <SidebarTrigger />
            </Button>
            {children}
          </section>
        </main>
      </SidebarProvider>
    </div>
  );
}
