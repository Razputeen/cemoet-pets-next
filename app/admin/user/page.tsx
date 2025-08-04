// components/AdminDoctorList.tsx
"use client"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";



type User = {
  id: string;
  Name: string;
  email: string;
  roles: string;
};

export default function AdminDoctorList({id}: {id:string}) {


    const router = useRouter();
    const [User, setUsers] = useState<User[]>([])
    const [user, setUser] = useState<User | null>(null);

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
          if (data.role !== "admin") {
          localStorage.removeItem("token");
          router.push("/Login");
          }
         })
        .catch(() => {

        });
    }, []);

    useEffect(() => {
    fetch("http://localhost:3222/users", {
      method: "GET",
      cache: "no-store",
    })
        .then((res) => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            setUsers(data), console.log(data)
        } else {
            console.error("Expected array but got:", data)
            setUsers([])
        }
        })
        .catch((err) => {
        console.error("Fetch error:", err)
        setUsers([]) // fallback biar nggak undefined
        })
    }, [])


const handleDelete = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3222/users/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) throw new Error('Gagal hapus dokter')

    alert('Dokter berhasil dihapus')

    // refresh data
    setUsers((prev) => prev.filter((d) => d.id !== id.toString()))
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
            {User.map((user) => (
              <tr key={user.id} className="border-t border-gray-300">
                <td className="px-4 py-2 font-medium text-gray-900">{user.Name}</td>
                <td className="px-4 py-2 font-light text-gray-700">{user.email}</td>
                <td className="px-4 py-2 font-light text-gray-700">{user.roles}</td>
                <td className="px-4 py-2 font-light text-gray-700">{}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href={`/admin/doctor/update/${user.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                      Edit
                    </button>
                  </Link>
                  {/* <button onClick={() => handleDelete(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-sm">
                    Hapus
                  </button> */}
                  <Link href={`/doctor/${user.id}`}>
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
