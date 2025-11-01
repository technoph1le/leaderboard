"use client";

import Leaderboard from "@/widgets/leaderboard";
import { useParams } from "next/navigation";

export default function GroupPage() {
  const params = useParams<{ group: string }>();
  // To remove %40 (@GA) from %40GA
  const group = params.group.slice(3);

  return (
    <section>
      <div className="wrapper-sm space-y-8">
        <h2 className="text-4xl font-bold text-center">{group} Leaderboard</h2>
        <Leaderboard group={group} />
      </div>
    </section>
  );
}
