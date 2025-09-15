"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { DatePicker } from "antd"; // Import DatePicker
import dayjs from "dayjs"; // Import dayjs for date handling
import "antd/dist/reset.css"; // Import Ant Design styles

// The rest of your imports and style definitions
import {
  usedService,
  unusedService,
  input,
} from "../../style";
import Link from "next/link";
import Navbar from "../../components/Navbar/page";

const { RangePicker } = DatePicker;



type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
};

type Hotel = {
  id: number;
  name: string;
  price: number;
};

export default function Hotel() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [form, setForm] = useState({
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    appointmentDate: "",
    amountDays: "",
    hotelId: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
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

  useEffect(() => {
    fetch("http://localhost:3222/hotel")
      .then((res) => res.json())
      .then((data) => {
        console.log("Hotel data:", data);
        setHotel(data);
      })
      .catch((err) => console.log("Error fetch hotel:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    console.log("Form data:", form);
    console.log("User data:", user);
    if (!user) {
      alert(
        "User information not found! Please wait for user data to load or login again."
      );
      return;
    }
    const userId = user.sub || user.sub || user.sub || (user as Record<string, any>).userId;
    const hotelId = Number(form.hotelId);
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
      amountDays: form.amountDays.trim(),
      hotelIds: hotelId,
      userIds: userId,
    };
    try {
      const token = localStorage.getItem("token");
      console.log("Sending data to API:", body);
      const res = await fetch("http://localhost:3222/hotel-res", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const responseData = await res.json();
      if (!res.ok) {
        console.error("API Error Response:", responseData);
        console.error("Status Code:", res.status);
        throw new Error(responseData.message || "Failed to submit reservation");
      }
      alert("Reservation booked successfully!");
      setForm({
        petName: "",
        petType: "",
        petBreed: "",
        petAge: "",
        appointmentDate: "",
        amountDays: "",
        hotelId: 0,
      });
      router.push(`/reservation/klinik/${userId}`);
    } catch (error) {
      console.error("Submit error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="petName" className="text-sm font-semibold block mb-1">
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
          <label htmlFor="petType" className="text-sm font-semibold block mb-1">
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
          <label htmlFor="petBreed" className="text-sm font-semibold block mb-1">
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
          <label htmlFor="petAge" className="text-sm font-semibold block mb-1">
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
          <label htmlFor="hotelId" className="text-sm font-semibold block mb-1">
            Select Hotel
          </label>
          <select
            id="hotelId"
            className={`${input} pr-10 w-full`}
            value={form.hotelId || ""} // biar gak maksa ke 0
            onChange={handleSelectChange}
            required
          >
            <option value="" disabled>Pilih Hotel</option>
            {hotel.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} - Rp. {hotel.price.toLocaleString("id-ID")}
              </option>
            ))}
          </select>

        </div>

        {/* This is the new Ant Design RangePicker */}
<div className="relative col-span-1 md:col-span-2">
  <label
    htmlFor="appointmentDate"
    className="text-sm font-semibold block mb-1"
  >
    CheckIn *
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
<div className="relative col-span-1 md:col-span-2">
  <label
    htmlFor="amountDays"
    className="text-sm font-semibold block mb-1"
  >
    CheckOut *
  </label>
  <input
    type="date"
    id="amountDays"
    className={`${input} pr-10 w-full`}
    value={form.amountDays}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]} // Tidak bisa pilih tanggal lalu
    required
  />
</div>

        {/* Submit button */}
        <div className="col-span-1 md:col-span-2 mt-20">
          <hr className="bg-gray-300 my-3" />
        </div>
        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-[#286699] border-none text-white font-semibold py-3 rounded-md hover:bg-[#194E7A] transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}