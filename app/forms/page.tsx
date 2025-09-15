"use client";

import { Segmented } from "antd";
import { useState } from "react";
import Clinic from "../components/clinic/page";
import Grooming from "../components/grooming/page";
import HotelComponent from "../components/hotel/page"; // kalau ada
import Navbar from "../components/Navbar/page";
import { Stethoscope, Scissors, Hotel } from "lucide-react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function FormPage() {
  // ⬅️ default tampilan awal Clinic
  const [selected, setSelected] = useState<"clinic" | "grooming" | "hotel">("clinic");

  const options = [
    {
      label: (
        <div className="flex flex-col items-center text-center p-2">
          <Stethoscope className="w-6 h-6 mb-1" />
          <div className="font-semibold text-sm">Veterinary Care</div>
          <div className="text-[10px] text-gray-500">
            Health checkups, treatments, and medical care
          </div>
        </div>
      ),
      value: "clinic",
    },
    {
      label: (
        <div className="flex flex-col items-center text-center p-2">
          <Scissors className="w-6 h-6 mb-1" />
          <div className="font-semibold text-sm">Grooming</div>
          <div className="text-[10px] text-gray-500">
            Professional grooming and styling services
          </div>
        </div>
      ),
      value: "grooming",
    },
    {
      label: (
        <div className="flex flex-col items-center text-center p-2">
          <Hotel className="w-6 h-6 mb-1" />
          <div className="font-semibold text-sm">Pet Hotel</div>
          <div className="text-[10px] text-gray-500">
            Comfortable boarding and overnight care
          </div>
        </div>
      ),
      value: "hotel",
    },
  ];

  return (
    <div className={`${poppins.className}`}>
      <Navbar />
      <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-center mb-2 text-[#374151]">
            Book Your Pet's Appointment
          </h1>
          <p className="text-[#374151] text-center mb-6">
            Schedule health checkups for your beloved pet
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Segmented
                block
                options={options}
                size="large"
                value={selected}
                onChange={(val) => setSelected(val as "clinic" | "grooming" | "hotel")}
                className="w-full [&>.ant-segmented-group]:gap-4 p-6"
              />
            </div>

            {/* ✅ render sesuai pilihan */}
            {selected === "clinic" && <Clinic />}
            {selected === "grooming" && <Grooming />}
            {selected === "hotel" && <HotelComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}
