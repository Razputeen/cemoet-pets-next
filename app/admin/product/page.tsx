// components/AdminDoctorList.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";

type Doctor = {
  id: number
  name: string
  speciality: string
  email: string
  noTelp: string
  description: string
}

export default function AdminDoctorList({id}: {id:string}) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const router = useRouter()

    useEffect(() => {
    fetch("http://localhost:3222/doctors")
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            setDoctors(data)
        } else {
            console.error("Expected array but got:", data)
            setDoctors([])
        }
        })
        .catch((err) => {
        console.error("Fetch error:", err)
        setDoctors([]) // fallback biar nggak undefined
        })
    }, [])

const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3222/doctors/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Gagal hapus dokter')

    alert('Dokter berhasil dihapus')

    // refresh data
    setDoctors((prev) => prev.filter((d) => d.id !== id))
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus')
  }
}


  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
    <div className="p-6">
        <Link href={"/admin/doctor/create"}><PlusIcon></PlusIcon></Link>
      <h2 className="text-2xl font-bold mb-4">List Dokter</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Spesialis</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">No Telp</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-t border-gray-300">
                <td className="px-4 py-2 font-medium text-gray-900">{doctor.name}</td>
                <td className="px-4 py-2 font-light text-gray-700">{doctor.speciality}</td>
                <td className="px-4 py-2 font-light text-gray-700">{doctor.email}</td>
                <td className="px-4 py-2 font-light text-gray-700">{doctor.noTelp}</td>
                <td className="px-4 py-2 font-light text-gray-700">{doctor.description}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href={`/admin/doctor/update/${doctor.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                      Edit
                    </button>
                  </Link>
                  <button onClick={() => handleDelete(doctor.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                    Hapus
                  </button>
                  <Link href={`/doctor/${doctor.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                      Detail
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
