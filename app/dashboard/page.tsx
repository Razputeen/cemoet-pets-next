"use client";
import { useEffect, useState } from "react";

type User = {
  id: number;
  Name: string;
  email: string;
  roles: string[];
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3222/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
            "cache-control": "no-cache",
        },
        cache: "no-store",
        });

        const data = await res.json();
        setUser(data); // <- ini misalnya lo pake useState untuk nampung data user
    };

    fetchUser();
    }, []);


  return (
    <div>
      <h1>Dashboard</h1>
    <p className="text-lg font-bold">Welcome, {user?.Name}</p>
    </div>
  );
}
