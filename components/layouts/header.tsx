"use client";

import Link from "next/link";
import { ThemeSwitch } from "../ui/theme-switch";
import { Button } from "../ui/button";
import { LockKeyhole, LogOutIcon } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

export default function Header() {
  const { isAdmin, logOut } = useAuth();

  return (
    <header className="border-border border-b">
      <div className="wrapper py-4 flex justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold">
          Al-Jabr
        </Link>
        <div className="flex gap-4">
          <ThemeSwitch />
          <Button asChild>
            <Link href="/admin">
              <LockKeyhole /> Admin
            </Link>
          </Button>
          {isAdmin && (
            <Button variant="destructive" onClick={logOut}>
              <LogOutIcon /> Log out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
