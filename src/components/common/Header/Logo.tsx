import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/next.svg"
          alt="GrowthGuardian Logo"
          width={36}
          height={36}
        />
        <span className="font-bold text-xl text-blue-700">GrowthGuardian</span>
      </Link>
    </div>
  );
}
