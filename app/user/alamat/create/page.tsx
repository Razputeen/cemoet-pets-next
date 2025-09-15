"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/page";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function CreateAlamatPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    locationName: "",
    penerima: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

    type User = {
      sub: string;
      Name: string;
      email: string;
      phoneNum: string;
      roles: string[];
      reserveGroom: string[];
    };
  
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      
      fetch("http://localhost:3222/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/Login");
        });
    }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:3222/alamat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          userId: user?.sub, // 👉 sementara hardcode, nanti bisa ambil dari token decoded
        }),
      });

      router.push("/user/alamat"); // balik ke halaman alamat
    } catch (err) {
      console.error("Error creating alamat:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <body className={poppins.className}>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow rounded-2xl p-8 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-6">Tambah Alamat</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location Name</label>
              <input
                type="text"
                name="locationName"
                value={form.locationName}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Penerima</label>
              <input
                type="text"
                name="penerima"
                value={form.penerima}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alamat Lengkap</label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              {loading ? "Saving..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </body>
  );
}
