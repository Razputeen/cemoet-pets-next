"use client";

import Navbar from "../../components/Navbar/page";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    noTelp: "",
    birthDate: "",
    email: "",
    gender: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3222/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [params.id]);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(`http://localhost:3222/users/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    router.push("/user/about");
  };

  return (
    <div className={`${poppins.className} bg-gray-100 min-h-screen`}>
      <Navbar />

      {/* Header */}
      <div className="mt-10 bg-white rounded-2xl shadow flex justify-center items-center h-24 w-[700px] mx-auto">
        <h1 className="text-xl font-semibold justify-center items-center">
          Edit Profile
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 bg-white rounded-2xl shadow w-[700px] mx-auto p-6 space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="noTelp"
            value={user.noTelp}
            maxLength={15}
            inputMode="numeric"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Birth Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
