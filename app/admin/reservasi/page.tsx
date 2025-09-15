'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card,Segmented} from "antd";
import { Poppins } from "next/font/google";
import AdminClinicList from "./clinic/page";
import AdminGroomList from "./grooming/page";
import AdminHotelList from "./hotel/page";





  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-poppins",
  });

export default function Reservasi() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();
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
const userName = "Cemoet Pets";
const [selected, setSelected] = useState<"Grooming" | "Clinic" | "Hotel">("Grooming");
const options = [
  {
    label: (
      <p>Grooming</p>
    ),
    value: "Grooming",
  },
    {
      label: (
        <p>Clinic</p>
      ),
      value: "Clinic",
    },
    {
      label: (
        <p>Hotel</p>
      ),
      value: "Hotel",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9">
      <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
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

        <div className="flex-1 max-w-screen mx-auto bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold bg-slate-100 p-2 rounded-lg">{selected +" "+ "Reservations"}</h2>
            {/* <Link href="/admin/groom/create">
              <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
            </Link> */}
          </div>

          <div>
              <Segmented options={options} value={selected}  onChange={(val) => setSelected(val as "Clinic" | "Grooming" | "Hotel")}/>
          </div>
                      {selected === "Clinic" && <AdminClinicList />}
                      {selected === "Grooming" && <AdminGroomList />}
                      {selected === "Hotel" && <AdminHotelList />}
        </div>
      </div>
    </div>
  );
}
