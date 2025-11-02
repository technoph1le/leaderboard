"use client";

import GroupList from "@/widgets/group-list";

export default function Home() {
  return (
    <div>
      <section>
        <div className="wrapper-xs space-y-8 py-8">
          <h2 className="text-4xl font-bold text-center">
            See all leaderboards
          </h2>
          <GroupList />
        </div>
      </section>
    </div>
  );
}
