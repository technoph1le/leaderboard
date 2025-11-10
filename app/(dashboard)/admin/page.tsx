"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { GROUPS } from "@/lib/db";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function AdminPage() {
  const totalScores = useQuery(
    api.students.getTotalScoresByGroup
  );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">
        Groups - Total Scores
      </h2>
      <div className="grid gap-4 grid-cols-4">
        {GROUPS.map((group) => {
          const total = totalScores?.[group] ?? 0;

          return (
            <Link key={group} href={`/@${group}`}>
              <Card className="hover:outline-2">
                <CardContent className="flex items-center gap-4 ">
                  <h2 className="text-2xl font-bold">
                    {group}
                  </h2>
                  <Badge variant="outline">{total}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
