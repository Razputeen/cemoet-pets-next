// components/AdminDoctorCreate.tsx
"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';

export default function AdminDoctorCreate() {
  const [hotel, setHotel] = useState({ name: "", price: ""});
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3222/hotel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotel),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Register berhasil")
      router.push('/admin/hotel')
    }else {
      alert(data.message || "Gagal register")
    };
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Tambah Dokter Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nama Hotel"
          className="w-full border p-2 rounded"
          value={hotel.name}
          onChange={e => setHotel({ ...hotel, name: e.target.value })}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="w-full border p-2 rounded"
          value={hotel.price}
          onChange={e => setHotel({ ...hotel, price: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >Submit
        </button>
      </form>
    </div>
  )
}
