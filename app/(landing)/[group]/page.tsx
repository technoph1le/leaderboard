"use client";

import { api } from "@/convex/_generated/api";
import Leaderboard from "@/widgets/leaderboard";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

export default function GroupPage() {
  const params = useParams<{ group: string }>();
  // To remove %40 (@GA) from %40GA
  const group = params.group.slice(3);
  const students = useQuery(api.students.getByGroup, {
    group,
  });

  if (!students) return null;

  return (
    <section>
      <div className="wrapper-sm space-y-8 py-8">
        <h2 className="text-4xl font-bold text-center">
          {group} Leaderboard
        </h2>
        <Leaderboard students={students} />
      </div>
    </section>
  );
}
