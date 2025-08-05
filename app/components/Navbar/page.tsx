'use client'
import { ShoppingCart, User, BookText } from "lucide-react";
import { Package } from "lucide-react";
import { ReceiptText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Layout() {
    type User = {
    id: number;
    Name: string;
    email: string;
    roles: string[];
    reserveGroom: string[];
  };
  
      const [user, setUser] = useState<User | null>(null);
      const router = useRouter();
  
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
            .then((data) => setUser(data))
            .catch(() => {
              localStorage.removeItem("token");
              router.push("/Login");
            });
        }, []);
  return (
    <>
    <header className="flex items-center justify-between p-4 bg-white border-b border-[#DBEAFE] shadow-sm">
      
      {/* Bagian Kiri: Logo/Nama Aplikasi (ditempatkan di paling kiri) */}
      <div className="text-2xl font-bold text-gray-800"><Link href={"/home"} className="text-2xl font-bold text-gray-800 no-underline">Cemoet Pets</Link>
        
      </div>

      {/* Bagian Kanan: Ikon (ditempatkan di paling kanan) */}
      <div className="flex items-center space-x-6 pr-[100px]">
        
        {/* Ikon 1: ReceiptText (Sesuai dengan kode yang Anda berikan) */}
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <BookText size={24} /> 
        </a>

        {/* Ikon 2: Package (Sesuai dengan kode yang Anda berikan) */}
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Package size={24} />
        </a>

        {/* Ikon 3: ShoppingCart (Sesuai dengan kode yang Anda berikan) */}
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <ShoppingCart size={24} />
        </a>
        <Link href="/user/profile/about" className="text-gray-600 hover:text-gray-900 transition-colors">
            <User size={24} />
        </Link>

      </div>
    </header>
      {/* Konten halaman lainnya */}
    </>
  );
}
