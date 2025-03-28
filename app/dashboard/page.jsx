"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  // Check token on client-side 
  useEffect(() => {
    const token = document.cookie.includes("token=");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-semibold">Welcome to the Dashboard 🎉</h1>
    </div>
  );
}
