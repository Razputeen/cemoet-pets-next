// components/AdminDoctorList.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";

type Grooming = {
  id: number
  name: string
  specification: string
  price: number
  description: string
  reservations: Array<{ petName: string, petBreed: string, petAge: number, petAmount: number, petType: string, bookingDate: Date, totalPrice: number, status: string }>
}

export default function AdminGroom({id}: {id:string}) {
  const [grooming, setGrooming] = useState<Grooming[]>([])
  const router = useRouter()

    useEffect(() => {
    fetch("http://localhost:3222/grooms")
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            setGrooming(data)
        } else {
            console.error("Expected array but got:", data)
            setGrooming([])
        }
        })
        .catch((err) => {
        console.error("Fetch error:", err)
        setGrooming([]) // fallback biar nggak undefined
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
    setGrooming((prev) => prev.filter((d) => d.id !== id))
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus')
  }
}


  return (

  <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4">
    <div className="min-h-screen bg-white py-9 px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row">
      <SidebarAdmin />

      <div className="flex-1 max-w-screen mx-auto bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">List Dokter</h2>
          <Link href="/admin/groom/create">
            <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nama</th>
                <th className="px-4 py-2">Spesialis</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {grooming.map((groom) => (
                <tr key={groom.id} className="border-t border-gray-300">
                  <td className="px-4 py-2 text-gray-900">{groom.id}</td>
                  <td className="px-4 py-2 text-gray-900">{groom.name}</td>
                  <td className="px-4 py-2 text-gray-700">{groom.specification}</td>
                  <td className="px-4 py-2 text-gray-700">{groom.price}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link href={`/admin/doctor/update/${groom.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(groom.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
                    >
                      Hapus
                    </button>
                    <Link href={`/doctor/${groom.id}`}>
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md">
                        Detail
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
              {grooming.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    Tidak ada data dokter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}
