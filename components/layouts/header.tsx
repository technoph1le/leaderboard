import Link from "next/link";
import { ThemeSwitch } from "../ui/theme-switch";
import { Button } from "../ui/button";
import { LockKeyhole } from "lucide-react";

export default function Header() {
  return (
    <header>
      <div className="wrapper py-6 flex justify-between items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          Al-Jabr
        </Link>
        <div className="flex gap-4">
          <ThemeSwitch />
          <Button asChild>
            <Link href="/admin">
              <LockKeyhole /> Admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
