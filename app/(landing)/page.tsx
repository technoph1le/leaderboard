"use client";

import { api } from "@/convex/_generated/api";
import GroupList from "@/widgets/group-list";
import Leaderboard from "@/widgets/leaderboard";
import { useQuery } from "convex/react";

export default function Home() {
  const students = useQuery(api.students.getAllStudents);

  if (!students) return null;

  return (
    <div>
      <section>
        <div className="wrapper-xs space-y-8 py-8">
          <h2 className="text-4xl font-bold text-center">
            See all groups
          </h2>
          <GroupList />
        </div>
      </section>
      <section>
        <div className="wrapper-xs space-y-8 py-8">
          <h2 className="text-4xl font-bold text-center">
            Top{" "}
            {students.length > 30 ? "30" : students.length}{" "}
            students
          </h2>
          <Leaderboard students={students} isGroupVisible />
        </div>
      </section>
    </div>
  );
}
