"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card } from "antd";

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
  <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9 ">
    <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
      <SidebarAdmin />

      <div className="flex-1 max-w-screen mx-auto bg-white p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">List Grooming</h2>
          <Link href="/admin/groom/create">
            <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
          </Link>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{groomingRes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{groomingRes.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-blue-600">
                ${groomingRes.reduce((sum, g) => sum + (g.totalPrice || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Appointment ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Pet Name</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groomingRes.map((groom) => (
              <tr key={groom.id} className="border-t">
                <td className="px-4 py-2 text-blue-600 font-medium">{groom.id}</td>
                <td className="px-4 py-2">
                  <div className="font-semibold">{groom.user.Name}</div>
                </td>
                <td className="px-4 py-2"><div className="text-xs text-gray-500">{groom.petName}</div></td>
                <td className="px-4 py-2">{groom.groomings[0].name} {groom.groomings[0].specification}</td>
                <td className="px-4 py-2">{groom.totalPrice}</td>
                <td className="px-4 py-2 font-medium">{groom.status}</td>
                <td className="px-4 py-2">{new Date(groom.bookingDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/grooming/${groom.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
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
  </div>
  );
}
