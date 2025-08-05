"use client";

import Navbar from "../../components/Navbar/page";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Cemo from "../../image/Cemow.jpg";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "#/app/components/logoutButton";
import { ArrowLeft } from "lucide-react";

// Configure Poppins. You can specify weights and subsets.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], // Adjust weights as needed
  variable: "--font-poppins", // Define a CSS variable name for Tailwind
});

export default function Profile() {
  type User = {
    id: number;
    Name: string;
    email: string;
    phoneNum: string;
    roles: string[];
    reserveGroom: string[];
  };

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/Login");
      });
  }, []);

  return (
    <>
      <body className={poppins.className}>
        <Navbar />
        {/* Tabs */}
        <div className="min-w-screen bg-gray-100 p-6 flex flex-row md:flex-row gap-6">
          <div className="bg-white rounded-2xl shadow flex gap-8 px-6 py-4 pb-2 mb-6 w-screen">
            <Link
              className="text-blue-700 font-medium  pb-1"
              href="/pages/profile/about"
            >
              Profile
            </Link>
            <Link
              className="text-gray-500 no-underline hover:text-blue-700 hover:border-b-4 "
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
        <div className="min-h-screen bg-gray-100 pt-4 px-6 md:pt-6 md:px-10 flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-4 w-full md:w-1/3">
            {/* Tombol Back */}
            <Link
              href="/ProductListPage"
              className=" absolute flex text-gray-600 hover:text-gray-800 self-start -mt-10"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>

            {/* Profile Box */}
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center gap-4">
              <Image
                src={Cemo}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full"
              />
              <h2 className="font-semibold text-lg">{user?.Name}</h2>
              <p className="text-sm text-gray-500">Customer</p>
              <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
                Edit Profile
              </button>
              <LogoutButton />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="text-lg font-semibold mb-4">About Me</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <p>
                  <strong>Name :</strong> {user?.Name}
                </p>
                <p>
                  <strong>Birth Date :</strong> 28-02-2008
                </p>
                <p>
                  <strong>Gender :</strong>{" "}
                  <span className="text-blue-700 font-medium">Man</span>
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  <span className="text-blue-700 font-medium">
                    {user?.email}
                  </span>
                </p>
                <p>
                  <strong>Phone Number :</strong>{" "}
                  <span className="text-blue-700 font-medium">
                    {user?.phoneNum}
                  </span>
                </p>
                <p>
                  <strong>Role :</strong>{" "}
                  <span className="text-blue-700 font-medium">
                    {user?.roles}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
