"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ChevronDown, ChevronUp, LayoutDashboard, ShoppingBag,
  ScissorsSquare, Stethoscope, User2, FileText, Settings, LogOut
} from "lucide-react"
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})

export default function SidebarAdmin() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu)
  }

  const userName = "Andrew Smith" // Ganti dari state/user context kalau perlu

  return (
    <div className={poppins.className}>
    <aside className="w-72 h-screen bg-white text-gray-900 flex flex-col justify-between p-6 border-r rounded-r-3xl shadow-xl">
      {/* TOP: User Info */}
      <div>
        <h1 className="text-xl font-semibold mb-6">{userName}</h1>

        {/* NAVIGATION */}
        <nav className="space-y-2 text-sm font-medium">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <DropdownMenu
            label="Produk"
            icon={<ShoppingBag size={18} />}
            isOpen={openDropdown === "produk"}
            toggle={() => toggleDropdown("produk")}
            links={[
              { href: "/produk/list", label: "Daftar Produk" },
              { href: "/produk/tambah", label: "Tambah Produk" },
              { href: "/produk/pesanan", label: "Pesanan Produk" },
            ]}
          />

          <DropdownMenu
            label="Grooming"
            icon={<ScissorsSquare size={18} />}
            isOpen={openDropdown === "grooming"}
            toggle={() => toggleDropdown("grooming")}
            links={[
              { href: "/admin/groom", label: "Grooming Dashboard" },
              { href: "/grooming/jadwal", label: "Jadwal Grooming" },
              { href: "/grooming/pesanan", label: "Pesanan Grooming" },
            ]}
          />

          <DropdownMenu
            label="Dokter Hewan"
            icon={<Stethoscope size={18} />}
            isOpen={openDropdown === "dokter"}
            toggle={() => toggleDropdown("dokter")}
            links={[
              { href: "/admin/doctor", label: "Dokter Dashboard" },
              { href: "/dokter/jadwal", label: "Jadwal Dokter" },
              { href: "/dokter/konsultasi", label: "Konsultasi" },
            ]}
          />

          <DropdownMenu
            label="Reservasi"
            icon={<FileText size={18} />}
            isOpen={openDropdown === "reservasi"}
            toggle={() => toggleDropdown("reservasi")}
            links={[
              { href: "/reservasi/dokter", label: "Reservasi Dokter" },
              { href: "/reservasi/grooming", label: "Reservasi Grooming" },
            ]}
          />

          <DropdownMenu
            label="User"
            icon={<User2 size={18} />}
            isOpen={openDropdown === "user"}
            toggle={() => toggleDropdown("user")}
            links={[
              { href: "/admin/user", label: "User Dashboard" },
              { href: "/user/jadwal", label: "Jadwal User" },
              { href: "/user/konsultasi", label: "Konsultasi User" },
            ]}
          />

          <DropdownMenu
            label="Transaksi"
            icon={<FileText size={18} />}
            isOpen={openDropdown === "transaksi"}
            toggle={() => toggleDropdown("transaksi")}
            links={[
              { href: "/transaksi/penjualan", label: "Data Penjualan" },
              { href: "/transaksi/pembayaran", label: "Pembayaran" },
            ]}
          />

          <DropdownMenu
            label="Pengaturan"
            icon={<Settings size={18} />}
            isOpen={openDropdown === "pengaturan"}
            toggle={() => toggleDropdown("pengaturan")}
            links={[
              { href: "/pengaturan/akun", label: "Akun Admin" },
              { href: "/pengaturan/preferensi", label: "Preferensi" },
            ]}
          />
        </nav>
      </div>

      {/* BOTTOM: Logout */}
      <div className="text-sm mt-6">
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white justify-center font-medium"
        >
          <LogOut size={18} />
          Logout
        </Link>
      </div>
    </aside>
    </div>
  )
}

function DropdownMenu({
  label,
  icon,
  isOpen,
  toggle,
  links,
}: {
  label: string
  icon: React.ReactNode
  isOpen: boolean
  toggle: () => void
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <span className="flex items-center gap-3">{icon} {label}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1 text-gray-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-2 py-1 rounded hover:bg-gray-100"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
