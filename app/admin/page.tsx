"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SidebarAdmin from "../components/sidebar/page"
import { User } from "lucide-react"
import Image from "next/image"

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
    <div className="min-h-screen bg-[#f2f2f2] py-9 px-4">
      <div className="max-w-screen-2xl mx-auto bg-white rounded-3xl shadow-md p-4 flex flex-col md:flex-row">
      <SidebarAdmin />
      <main className="flex flex-1 flex-col p-6 max-w-screen">
        {/* Welcome Section */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">Welcome to Admin Panel.</h1>
            <p className="text-gray-500">Hello {user?.Name}, Welcome back!</p>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        {/* Banner */}
        <div className="mt-6 rounded-xl bg-[#3D6C88] p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl text-white font-semibold">Create and manage amazing content</h2>
            <p className="text-white">Power up your admin tools with insights</p>
            <div className="mt-4 flex gap-3">
              <button className="bg-white px-4 py-2 rounded-md shadow text-sm font-medium hover:bg-gray-100">
                Explore More
              </button>
              <button className="bg-[#5192b7] text-white px-4 py-2 rounded-md text-sm hover:bg-[#355b70]">
                View Stats
              </button>
            </div>
          </div>
          <Image
            src="/some-plants.jpg"
            alt="Banner Image"
            width={150}
            height={150}
            className="rounded-lg hidden md:block"
          />
        </div>

        {/* Stats & Recent Activity */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Stat */}
          <div className="bg-[#E8F1FA] p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">My Stat</h3>
            <p>Today: <strong>4 Orders</strong></p>
            <p>This Month: <strong>175 Orders</strong></p>
            <button className="mt-4 text-green-800 underline text-sm">Go to my orders →</button>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm text-gray-700">
                  <span>Ola Martha ordered a new plant</span>
                  <span className="text-xs text-gray-400">2 min ago</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}
