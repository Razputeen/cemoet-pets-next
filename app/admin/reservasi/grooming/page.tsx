'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card,Segmented } from "antd";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(groomingRes.length / itemsPerPage);
  const paginatedData = groomingRes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-screen-2xl mx-auto p-4 py-9">


        <div className="flex-1 max-w-screen mx-auto bg-white p-6">
          <div className="flex justify-between items-center mb-4">
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
                <p className="text-gray-500">Upcoming</p>
                <p className="text-2xl font-bold">
                  {
                    groomingRes.filter((g) => new Date(g.bookingDate) > new Date()).length
                  }
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {
                    groomingRes.filter((g) => new Date(g.bookingDate) <= new Date()).length
                  }
                </p>
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
                {paginatedData.map((groom) => (
                  <tr key={groom.id} className="border-t">
                    <td className="px-4 py-2 text-blue-600 font-medium">{groom.id}</td>
                    <td className="px-4 py-2 font-semibold">{groom.user.Name}</td>
                    <td className="px-4 py-2 text-xs text-gray-500">{groom.petName}</td>
                    <td className="px-4 py-2">
                      {groom.groomings?.[0]?.name} {groom.groomings?.[0]?.specification}
                    </td>
                    <td className="px-4 py-2">${groom.totalPrice}</td>
                    <td className="px-4 py-2 font-medium">{groom.status}</td>
                    <td className="px-4 py-2">
                      {new Date(groom.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/admin/grooming/${groom.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      Tidak ada data reservasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
  );
}
