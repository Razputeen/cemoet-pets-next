"use client";

import Navbar from "../components/Navbar/page";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Cemo from "../../image/Cemow.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import doc from '#/app/image/Doc1.png'
import LogoutButton from "#/app/components/logoutButton";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  LogOut,
  Edit,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import About from "../components/userAbout/page";
import UserAddress from "../components/userAddress/page";

// Configure Poppins. You can specify weights and subsets.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<"About" | "Address">("About");

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
        setUser(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/Login");
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <body className={`${poppins.className} bg-gray-100 min-h-screen`}>
        <Navbar />

        <div className="container mx-auto px-4 py-8">
          {/* Back button, diubah agar posisinya lebih konsisten */}
          <div className="mb-6">
            <Link
              href="/ProductListPage"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </div>

          {/* Tabs - Diatur ulang agar lebih rapi */}
          <div className="bg-white rounded-xl shadow-sm flex gap-8 px-6 py-4 mb-6">
            <button
              className="text-gray-500 font-medium pb-1 hover:text-blue-700 bg-none"
              value={"About"}
              onClick={() => setSelected("About")}
            >
              Profile
            </button>
            <button
              className="text-gray-500 no-underline hover:text-blue-700 transition-colors bg-none"
              value={"Address"}
              onClick={() => setSelected("Address")}
            >
              Address
            </button>
          </div>
          
          {selected === "About" && <About />}
          {selected === "Address" && <UserAddress />}
        </div>
      </body>
    </>
  );
}