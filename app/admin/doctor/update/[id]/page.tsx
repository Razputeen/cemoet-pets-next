"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDoctorCreate() {
  const [doctors, setDoctors] = useState({
    name: "",
    speciality: "",
    email: "",
    noTelp: "",
    description: "",
    quote: "",
  });

  const [isLoading, setIsLoading] = useState(false); // ✅ tambahkan
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("http://localhost:3222/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctors),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Register berhasil");
      router.push("/admin/doctor");
    } else {
      alert(data.message || "Gagal register");
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.back();
    }, 500);
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8 relative">
        {/* Tombol Back */}
        <button
          onClick={handleBack}
          className="absolute top-0 left-0 mt-4 ml-4 text-blue-600 hover:underline"
          disabled={isLoading}
        >
          ← Kembali
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Tambah Dokter Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Dokter"
            className="w-full border p-2 rounded"
            value={doctors.name}
            onChange={(e) => setDoctors({ ...doctors, name: e.target.value })}
            required
          />
          <input
            type="text"
            name="speciality"
            placeholder="Spesialis"
            className="w-full border p-2 rounded"
            value={doctors.speciality}
            onChange={(e) =>
              setDoctors({ ...doctors, speciality: e.target.value })
            }
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={doctors.email}
            onChange={(e) => setDoctors({ ...doctors, email: e.target.value })}
            required
          />
          <input
            type="text"
            name="noTelp"
            placeholder="Nomor Telepon"
            className="w-full border p-2 rounded"
            value={doctors.noTelp}
            onChange={(e) => setDoctors({ ...doctors, noTelp: e.target.value })}
            required
          />
          <input
            type="text"
            name="quote"
            placeholder="Kata Mutiara"
            className="w-full border p-2 rounded"
            value={doctors.quote}
            onChange={(e) => setDoctors({ ...doctors, quote: e.target.value })}
            required
          />
          <textarea
            name="description"
            placeholder="Deskripsi"
            className="w-full border p-2 rounded"
            rows={4}
            value={doctors.description}
            onChange={(e) =>
              setDoctors({ ...doctors, description: e.target.value })
            }
            required
          ></textarea>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}