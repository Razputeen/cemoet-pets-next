"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/page";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

interface Alamat {
  id: number;
  locationName: string;
  penerima: string;
  alamat: string;
  isSelected: boolean;
  user: User;
}

interface User {
  sub: string;
};

export default function AlamatPage() {
  const [alamats, setAlamats] = useState<Alamat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAlamats = async () => {
      try {
        const token = localStorage.getItem("token"); // kalo lo pake JWT
        const res = await fetch("http://localhost:3222/alamat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAlamats(data);
      } catch (err) {
        console.error("Error fetching alamat:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlamats();
  }, []);

    const token = localStorage.getItem("token");

    type User = {
      sub: string;
      Name: string;
      email: string;
      phoneNum: string;
      roles: string[];
      reserveGroom: string[];
    };
  
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      
      fetch("http://localhost:3222/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/Login");
        });
    }, []);

  const handleSelect = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:3222/alamat/${id}/select`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user?.sub }) // user.sub biasanya UUID // 👉 ideally dapet dari token
      });

      // refresh list
      const res = await fetch("http://localhost:3222/alamat", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAlamats(data);
    } catch (err) {
      console.error("Error selecting alamat:", err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <body className={poppins.className}>
      <Navbar />

      {/* Tabs */}
      <div className="min-w-screen bg-gray-100 p-6 flex flex-row md:flex-row gap-6">
        <div className="bg-white rounded-2xl shadow flex gap-8 px-6 py-4 mb-6 w-screen">
          <Link
            className="text-gray-500 font-medium pb-1 hover:text-blue-700 no-underline"
            href="/pages/profile/about"
          >
            Profile
          </Link>
          <Link
            className="text-blue-700 font-medium pb-1 "
            href="/pages/profile/alamat"
          >
            Address
          </Link>
          <Link
            className="text-gray-500 hover:text-blue-700 no-underline"
            href={""}
          >
            Bank Account
          </Link>
          <Link
            className="text-gray-500 hover:text-blue-700 no-underline"
            href={""}
          >
            Settings
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full h-full">
          <div className="bg-white rounded-2xl shadow p-8 h-full">
            <h3 className="text-lg font-semibold mb-4">Alamat Saya</h3>

            <div className="space-y-4 h-full overflow-y-scroll">
              {alamats.map((a) => (
                <div
                  key={a.id}
                  className={`p-4 rounded-xl border ${
                    a.isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <p>
                    <strong>{a.locationName}</strong>
                  </p>
                  <p>{a.alamat}</p>
                  <p className="text-sm text-gray-600">Penerima: {a.penerima}</p>
                  <button
                    onClick={() => handleSelect(a.id)}
                    className={`mt-2 px-4 py-2 rounded-lg text-sm ${
                      a.isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-blue-100"
                    }`}
                  >
                    {a.isSelected ? "Selected" : "Pilih Alamat Ini"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
