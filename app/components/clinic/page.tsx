"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar/page";

// import { usedService, unusedService, input } from "../../style";
// Definisi style langsung jika import bermasalah
const usedService =
  "bg-blue-50 border-2 border-blue-200 rounded-xl p-4 text-center transition-all hover:shadow-md cursor-pointer";
const unusedService =
  "bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-center transition-all hover:shadow-md cursor-pointer hover:bg-gray-100";
const input =
  "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

import { useRouter } from "next/navigation";
import { message } from "antd";

type User = {
  id?: string;
  sub?: string;
  _id?: string;
  userId?: string;
  Name: string;
  email: string;
  roles: string[];
  [key: string]: any; // Untuk field lain yang mungkin ada
};

type Clinic = {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  appointmentDate: string;
  description: string;
};

export default function Clinic() {
  // Gunakan hanya satu set state
  const [form, setForm] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    appointmentDate: "",
    description: "",
  });

  const [user, setUser] = useState<User | null>(null);
  const [clinic, setClinic] = useState<Clinic[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
      return;
    }
    setIsLoadingUser(true);
    fetch("http://localhost:3222/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        console.log("User profile data:", data); // Debug log
        setUser(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user profile:", error);
        localStorage.removeItem("token");
        router.push("/Login");
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission

    // Debugging: Check form data
    console.log("Form data:", form);
    console.log("User data:", user);

    // Validasi form yang lebih ketat
    if (!form.petName.trim()) {
      alert("Pet name is required!");
      return;
    }
    if (!form.petType.trim()) {
      alert("Pet type is required!");
      return;
    }
    if (!form.petBreed.trim()) {
      alert("Pet breed is required!");
      return;
    }
    if (!form.petAge.trim()) {
      alert("Pet age is required!");
      return;
    }
    if (!form.appointmentDate) {
      alert("Appointment date is required!");
      return;
    }
    if (!user) {
      alert(
        "User information not found! Please wait for user data to load or login again."
      );
      return;
    }

    // Check berbagai kemungkinan field untuk user ID
    const userId =
      user.id || user.sub || user._id || (user as Record<string, any>).userId;

    if (!userId) {
      console.error("User object:", user);
      alert("User ID not found in user object! Check console for details.");
      return;
    }

    setIsSubmitting(true);

    const body = {
      petName: form.petName.trim(),
      petType: form.petType.trim(),
      petBreed: form.petBreed.trim(),
      petAge: form.petAge.trim(),
      appointmentDate: form.appointmentDate,
      description: form.description.trim(),
      userIds: userId,
    };

    try {
      const token = localStorage.getItem("token");
      console.log("Sending data to API:", body); // Debug log

      const res = await fetch("http://localhost:3222/clinic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const responseData = await res.json(); // Ambil response data untuk debug

      if (!res.ok) {
        console.error("API Error Response:", responseData);
        console.error("Status Code:", res.status);
        throw new Error(responseData.message || "Failed to submit reservation");
      }else {
        messageApi.open({
          type: "success",
          content: "Reservation submitted successfully!",
        });
      }
      

      // Reset form after success
      setForm({
        petName: "",
        petType: "",
        petBreed: "",
        petAge: "",
        appointmentDate: "",
        description: "",
      });

      // Redirect to My Clinic Page to see the new appointment
      router.push(`/reservation/klinik/${userId}`);
    } catch (error) {
      console.error("Submit error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {contextHolder}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="petName"
            className="text-sm font-semibold block mb-1"
          >
            Pet Name *
          </label>
          <input
            type="text"
            id="petName"
            placeholder="Pet Name"
            className={input}
            value={form.petName}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="petType"
            className="text-sm font-semibold block mb-1"
          >
            Pet Type *
          </label>
          <input
            type="text"
            id="petType"
            placeholder="e.g., Dog, Cat, Bird"
            className={input}
            value={form.petType}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="petBreed"
            className="text-sm font-semibold block mb-1"
          >
            Enter Breed *
          </label>
          <input
            type="text"
            id="petBreed"
            placeholder="e.g., Shih Tzu"
            className={input}
            value={form.petBreed}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="petAge"
            className="text-sm font-semibold block mb-1"
          >
            Age *
          </label>
          <input
            type="text"
            id="petAge"
            placeholder="e.g., 2 years"
            className={input}
            value={form.petAge}
            onChange={handleChange}
            required
          />
        </div>

        <div className="relative col-span-1 md:col-span-2">
          <label
            htmlFor="appointmentDate"
            className="text-sm font-semibold block mb-1"
          >
            Appointment Date *
          </label>
          <input
            type="date"
            id="appointmentDate"
            className={`${input} pr-10 w-full`}
            value={form.appointmentDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]} // Tidak bisa pilih tanggal lalu
            required
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label
            htmlFor="description"
            className="mb-1 font-semibold text-[#111827] block"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe what your pet is having"
            className="rounded-md h-24 resize-none w-full border border-gray-300 p-2"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoadingUser}
          className={`col-span-1 md:col-span-2 font-semibold py-3 rounded-md transition ${
            isSubmitting || isLoadingUser
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#286699] hover:bg-[#194E7A] text-white"
          } border-none`}
        >
          {isLoadingUser
            ? "Loading user data..."
            : isSubmitting
            ? "Booking..."
            : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}
