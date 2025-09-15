"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarAdmin from "../components/sidebar/page";
import { User } from "lucide-react";
import Image from "next/image";

type User = {
  id: number;
  Name: string;
  email: string;
  roles: string;
};

export default function Admin() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
      return;
    }

    fetch("http://localhost:3222/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        if (data.role !== "admin") {
          localStorage.removeItem("token");
          router.push("/Login");
        } else {
          setUser(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#f2f2f2] py-[10px] px-4">
      <div className="max-w-screen-2xl mx-auto bg-white rounded-3xl shadow-md p-4 flex flex-col md:flex-row">
        <SidebarAdmin />
<main className="flex flex-1 flex-col p-6 max-w-screen items-center justify-center text-center">
  {/* Welcome Section */}
  <div>
    <h1 className="text-2xl font-bold">Welcome to Admin Panel.</h1>
    <p className="text-gray-500">Hello {user?.Name}, Welcome back!</p>
  </div>
</main>
      </div>
    </div>
  );
}
