import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Package } from "lucide-react";
import { ReceiptText } from "lucide-react";
import { CircleUserRound } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 border-b border-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Kiri - Logo */}
        <h1 className="text-lg font-semibold text-gray-800">Cemoet Pets</h1>

        {/* Kanan - Icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/Profile"
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <CircleUserRound className="w-5 h-5 text-gray-800 hover:text-black hover:scale-110 transition-all duration-200" />
          </Link>
          <Link
            href="#"
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <ReceiptText className="w-5 h-5 text-gray-800 hover:text-black hover:scale-110 transition-all duration-200" />
          </Link>
          <Link
            href="#"
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <Package className="w-5 h-5 text-gray-800 hover:text-black hover:scale-110 transition-all duration-200" />
          </Link>
          <Link
            href="/Cart"
            className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5 text-gray-800 hover:text-black hover:scale-110 transition-all duration-200" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
