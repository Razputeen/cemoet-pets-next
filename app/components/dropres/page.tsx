"use client";
import Link from "next/link";
import { BookText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type UserProfile = {
  sub: string;
  name: string;
};

export default function ReservationDropdown({ sub }: { sub: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3222/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setUser(null);
      });
  }, []);

  return (
    <div className="relative group inline-block text-left">
      <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
        <BookText size={24} />
      </button>
      <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform -translate-y-2 transition-all z-50">
        <div className="py-1 text-sm text-gray-700">
          {user && (
            <>
              <Link
                href={`/reservation/grooming/${user.sub}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Grooming
              </Link>
              <Link
                href={`/reservation/klinik/${user.sub}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Klinik
              </Link>
              <Link
                href={`/reservation/hotel/${user.sub}`}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Hotel
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
