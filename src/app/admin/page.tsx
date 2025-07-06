"use client";

import NewRequest from "@/components/admin/home/NewRequest";
import NewUser from "@/components/admin/home/NewUser";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 h-[100vh] overflow-y-scroll">
      <h1 className="text-2xl font-bold text-center mt-5">Dashboard</h1>
      <NewUser />
      <NewRequest />
    </div>
  );
}
