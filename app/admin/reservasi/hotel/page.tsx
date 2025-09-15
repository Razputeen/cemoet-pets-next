"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card,Segmented } from "antd";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

type hotelRes = {
  id: string;
  petName: string;
  petBreed: string;
  petAge: number;
  petType: string;
  appointmentDate: Date | string;
  status: string;
  amountDays: Date;
  user: User;
  hotel: Hotel;
};

type Hotel = {
  id: number;
  name: string;
  specification: string;
  price: number;
  description: string;
};

type User = {
  id: number;
  Name: string;
  email: string;
  phoneNum: string;
};

export default function AdminHotelList() {
  const [hotelRes, setHotelRes] = useState<hotelRes[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3222/hotel-res")
      .then((res) => res.json())
      .then((data) => {
        console.log("Raw data from API:", data);
        if (Array.isArray(data)) {
          console.log("Sample hotel data:", data[0]);
          setHotelRes(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  // ✅ Fungsi konversi yang diperbaiki
  const getStatusValue = (status: string) => {
    switch (status) {
      case "Not Ready":
        return "notReady";
      case "Ready":
        return "ready";
      case "Completed":
        return "completed";
      default:
        return "notReady";
    }
  };

  const getStatusFromValue = (value: string) => {
    switch (value) {
      case "notReady":
        return "Not Ready";
      case "ready":
        return "Ready";
      case "completed":
        return "Completed";
      default:
        return "Not Ready";
    }
  };

  // ✅ Update status dengan konversi yang benar
  // ✅ Gunakan endpoint PATCH untuk update status (lebih efisien)
  const handleStatusChange = async (hotelResId: string, selectValue: string) => {
    console.log("=== DEBUG STATUS UPDATE ===");
    console.log("Clinic ID:", hotelResId, "Type:", typeof hotelResId);
    console.log("Select Value:", selectValue);

    const statusForAPI = getStatusFromValue(selectValue);
    console.log("Status for API:", statusForAPI);

    const requestBody = { status: statusForAPI };
    console.log("Request body:", JSON.stringify(requestBody));

    try {
      // ✅ Gunakan PATCH endpoint untuk status
      const url = `http://localhost:3222/hotel-res/${hotelResId}/status`;
      console.log("Sending request to:", url);

      const response = await fetch(url, {
        method: "PATCH", // ✅ Ubah ke PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (response.ok) {
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Response data:", responseData);
        } catch (e) {
          console.log("Response is not JSON");
        }

        setHotelRes((prevData) =>
          prevData.map((hotelres) =>
            hotelres.id === hotelResId
              ? { ...hotelres, status: statusForAPI }
              : hotelres
          )
        );
        console.log("✅ Status updated successfully");
      } else {
        console.error("❌ Failed to update:", responseText);
        // ✅ Fallback ke PUT jika PATCH gagal
        await handleStatusChangeWithPUT(hotelResId, selectValue);
      }
    } catch (error) {
      console.error("❌ Error updating status:", error);
      // ✅ Fallback ke PUT jika ada error
      await handleStatusChangeWithPUT(hotelResId, selectValue);
    }
    console.log("=== END DEBUG ===");
  };

  // ✅ Fallback function menggunakan PUT
  const handleStatusChangeWithPUT = async (
    hotelResId: string,
    selectValue: string
  ) => {
    console.log("=== FALLBACK PUT METHOD ===");

    const statusForAPI = getStatusFromValue(selectValue);
    const requestBody = { status: statusForAPI };

    try {
      const response = await fetch(`http://localhost:3222/hotel-res/${hotelResId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("PUT Response status:", response.status);
      const responseText = await response.text();
      console.log("PUT Response text:", responseText);

      if (response.ok) {
        setHotelRes((prevData) =>
          prevData.map((hotelres) =>
            hotelres.id === hotelResId
              ? { ...hotelres, status: statusForAPI }
              : hotelres
          )
        );
        console.log("✅ Status updated via PUT successfully");
      } else {
        console.error("❌ PUT also failed:", responseText);
      }
    } catch (error) {
      console.error("❌ PUT Error:", error);
    }
  };

  // ✅ Hitung statistik dengan benar
  const notReadyCount = hotelRes.filter(
    (c) => c.status === "Not Ready"
  ).length;
  const readyCount = hotelRes.filter((c) => c.status === "Ready").length;
  const pastCount = hotelRes.filter((c) => c.status === "Completed").length;
  const totalPages = Math.ceil(hotelRes.length / itemsPerPage);
  const paginatedData = hotelRes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div
        className={`${poppins.className} max-w-screen-2xl mx-auto p-4 py-9`}
      >
          <div className="flex-1 max-w-screen mx-auto bg-white p-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-gray-500">Total Appointments</p>
                  <p className="text-2xl font-bold">{hotelRes.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-300">
                <CardContent className="p-4">
                  <p className="text-gray-500">Not Ready</p>
                  <p className="text-2xl font-bold text-black">
                    {notReadyCount}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-300">
                <CardContent className="p-4">
                  <p className="text-gray-500">Not Ready</p>
                  <p className="text-2xl font-bold text-black">{readyCount}</p>
                </CardContent>
              </Card>

              <Card className="bg-green-300">
                <CardContent className="p-4">
                  <p className="text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-black">{pastCount}</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">Customer</th>
                    <th className="px-4 py-2">Pet Name</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Detail</th>
                    <th className="px-4 py-2">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((hotel) => (
                    <tr key={hotel.id} className="border-t">
                      <td className="px-4 py-2 font-semibold">
                        {hotel.user.Name}
                      </td>
                      <td className="px-4 py-2 font-semibold text-gray-500">
                        {hotel.petName}
                      </td>
                      <td className="px-4 py-2">
                        {new Date(hotel.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/admin/reservasi/hotel/detail/${hotel.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-4 py-2">
                        {/* ✅ Gunakan konversi yang benar */}
                        <select
                          value={getStatusValue(hotel.status)}
                          onChange={(e) =>
                            handleStatusChange(hotel.id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1 text-sm
             focus:outline-none focus:ring-2 focus:ring-blue-500
             cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                          style={{ minWidth: "120px" }}
                        >
                          <option value="notReady">Not Ready</option>
                          <option value="ready">Ready</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-gray-500"
                      >
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
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
    </>
  );
}
