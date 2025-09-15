// components/AdminDoctorList.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { CalendarCheck, CheckCircle, Clock, DollarSign, PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card } from "antd";

type Hotel = {
  id: number
  name: string
  price: number
}

export default function AdminGroom({id}: {id:string}) {
  const [hotel, setHotel] = useState<Hotel[]>([])
  const router = useRouter()

    useEffect(() => {
    fetch("http://localhost:3222/hotel")
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            setHotel(data)
        } else {
            console.error("Expected array but got:", data)
            setHotel([])
        }
        })
        .catch((err) => {
        console.error("Fetch error:", err)
        setHotel([]) // fallback biar nggak undefined
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
    setHotel((prev) => prev.filter((d) => d.id !== id))
  } catch (err) {
    console.error(err)
    alert('Gagal menghapus')
  }
}


  return (

  <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9 ">
    <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
      <SidebarAdmin />

      <div className="flex-1 max-w-screen mx-auto bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">List Hotel</h2>
          <Link href="/admin/hotel/create">
            <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{hotel.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{hotel.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-blue-600">
                ${hotel.reduce((sum, g) => sum + (g.price || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>


      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {hotel.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2 text-blue-600 font-medium">{a.id}</td>
                <td className="px-4 py-2">
                  <div className="font-semibold">{a.name}</div>
                </td>
                <td className="px-4 py-2">{a.price}</td>
                {/* <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      a.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : a.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-2">{a.date}</td> */}
                <td className="px-4 py-2">
                  <Link href={`/admin/grooming/${a.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    </div>
  )
}
