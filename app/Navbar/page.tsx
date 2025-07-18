import { ShoppingCart, User } from "lucide-react";
import { Package } from "lucide-react";
import { ReceiptText } from "lucide-react";
import Profile from "../pages/profile/about/page";
import Link from "next/link";

export default function Layout() {
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
          <ReceiptText size={24} /> 
        </a>

        {/* Ikon 2: Package (Sesuai dengan kode yang Anda berikan) */}
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Package size={24} />
        </a>

        {/* Ikon 3: ShoppingCart (Sesuai dengan kode yang Anda berikan) */}
        <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
          <ShoppingCart size={24} />
        </a>
        <Link href="/pages/profile/about">
            <User size={24} />
        </Link>

      </div>
    </header>
      {/* Konten halaman lainnya */}
    </>
  );
}
