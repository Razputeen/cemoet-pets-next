"use client";

import { useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";

// Import all necessary icons from lucide-react
import {
  LayoutDashboard,
  ShoppingBag,
  ScissorsSquare,
  Stethoscope,
  House,
  FileText,
  User2,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

// A component for a single menu item
const NavItem = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => (
  <Link
    href={href}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

// A component for a nested menu section
const NavSection = ({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <div className="ml-8 space-y-1 text-sm font-medium">
      {children}
    </div>
  </div>
);

export default function SidebarAdmin() {
  const userName = "Cemoet Pets";

  return (
    <div className={poppins.className}>
      <aside className="w-72 h-screen bg-white text-gray-900 flex flex-col justify-between p-6 border-r rounded-2xl shadow-lg">
        {/* TOP: User Info & Navigation */}
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold mb-6 text-indigo-600">{userName}</h1>
          </Link>
          {/* NAVIGATION */}
          <nav className="space-y-4">
            <NavItem href="/admin" label="Dashboard" icon={<LayoutDashboard size={20} />} />
              <NavItem href="/admin/product" label="Manajemen Produk" icon={<ShoppingBag size={16} />} />
              <NavItem href="/admin/groom" label="Grooming Dashboard" icon={<ScissorsSquare size={16} />} />
              <NavItem href="/admin/doctor" label="Dokter Dashboard" icon={<Stethoscope size={16} />} />
              <NavItem href="/admin/reservasi" label="Reservasi" icon={<ChevronRight size={16} />} />
          </nav>
        </div>
      </aside>
    </div>
  );
}