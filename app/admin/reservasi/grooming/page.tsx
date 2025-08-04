"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";

type GroomingReservation = {
  id: string;
  petName: string;
  petBreed: string;
  petAge: number;
  petType: string;
  bookingDate: Date | string;
  totalPrice: number;
  status: string;
  user: User;
  groomings: Grooming[];
};

type Grooming = {
  id: number;
  name: string;
  specification: string;
  price: number;
  description: string;
};

type User = {
  id: string;
  Name: string;
  email: string;
  phoneNum: string;
};

export default function AdminGroomList() {
  const [groomingRes, setGroomingRes] = useState<GroomingReservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3222/grooming-reservation")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGroomingRes(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="bg-[#f2f2f2] flex justify-center items-center">
    <div className="w-3/4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Grooming Reservations</h2>
        <Link href="/admin/groom/create">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            <PlusIcon size={18} />
            Tambah Reservasi
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-md shadow">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Nama Hewan</th>
              <th className="px-4 py-2">Ras</th>
              <th className="px-4 py-2">Jenis</th>
              <th className="px-4 py-2">Umur</th>
              <th className="px-4 py-2">Tanggal Booking</th>
              <th className="px-4 py-2">Total Harga</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {groomingRes.map((groom) => (
              <tr key={groom.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{groom.id}</td>
                <td className="px-4 py-2">{groom.petName}</td>
                <td className="px-4 py-2">{groom.petType}</td>
                <td className="px-4 py-2">
                  {new Date(groom.bookingDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">Rp{groom.totalPrice.toLocaleString()}</td>
                <td className="px-4 py-2">{groom.status}</td>
                <td className="px-4 py-2">{groom.user?.Name || "-"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Link href={`/admin/groom/update/${groom.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                      Edit
                    </button>
                  </Link>
                  <Link href={`/admin/groom/detail/${groom.id}`}>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm">
                      Detail
                    </button>
                  </Link>
                  {/* Uncomment jika fitur delete aktif */}
                  {/* <button onClick={() => handleDelete(groom.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Hapus
                  </button> */}
                </td>
              </tr>
            ))}
            {groomingRes.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
                  Tidak ada data reservasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
