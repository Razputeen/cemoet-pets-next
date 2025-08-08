"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, Loader2 } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  email: string;
  noTelp: string;
  description: string;
};

export default function AdminDoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3222/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.error("Expected array but got:", data);
          setDoctors([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setDoctors([]);
      });
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3222/doctors/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal hapus dokter");
      alert("Dokter berhasil dihapus");
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus");
    }
  };

  const handleAddClick = () => {
    setLoadingAdd(true);
    setTimeout(() => {
      router.push("/admin/doctor/create");
    }, 500); // delay setengah detik biar spinner kelihatan
  };

  return (
    <div className="relative">
      {/* Overlay Loading */}
      {loadingAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl flex flex-col items-center shadow-lg">
            <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
            <p className="text-gray-700 font-semibold">Memuat halaman...</p>
          </div>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9">
        <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
          <SidebarAdmin />

          <div className="flex-1 max-w-screen mx-auto bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">List Dokter</h2>
              <button
                onClick={handleAddClick}
                disabled={isLoading}
                className="relative"
              >
                <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded shadow">
                <thead className="bg-gray-100 text-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nama</th>
                    <th className="px-4 py-2">Spesialis</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">No Telp</th>
                    <th className="px-4 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="border-t border-gray-300">
                      <td className="px-4 py-2">{doc.id}</td>
                      <td className="px-4 py-2">{doc.name}</td>
                      <td className="px-4 py-2">{doc.speciality}</td>
                      <td className="px-4 py-2">{doc.email}</td>
                      <td className="px-4 py-2">{doc.noTelp}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() =>
                            router.push(`/admin/doctor/update/${doc.id}`)
                          }
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
                        >
                          Hapus
                        </button>
                        <button
                          onClick={() => router.push(`/doctor/${doc.id}`)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md"
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                  {doctors.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-4 text-gray-500"
                      >
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
    </div>
  );
}
