"use client";
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Navbar from "../../components/Navbar/page";
import {
  usedService,
  unusedService,
  input,
} from "../../style";
import { useRouter } from "next/navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

type User = {
  id: string;
  Name: string;
  email: string;
  roles: string;
};
export default function AppointmentForm() {
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
    <body className={poppins.className}>
      <Navbar />
      <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center px-4 py-10 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-[#111827]">
          Book Your Pet’s Appointment
        </h1>
        <p className="text-[#111827] text-center mb-6">
          Schedule hotel services for your beloved pet
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-3xl">
          {/* Service Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link href="/forms/clinic" className="no-underline flex-1">
              <div className={unusedService}>
                <div className="text-2xl mb-1">🩺</div>
                <div className="font-semibold">Veterinary Care</div>
                <div className="text-xs">Health checkups, treatments, and medical care</div>
              </div>
            </Link>
            <Link href="/forms/grooming" className="no-underline flex-1">
              <div className={unusedService}>
                <div className="text-2xl mb-1">✂️</div>
                <div className="font-semibold">Grooming</div>
                <div className="text-xs">Professional grooming and styling services</div>
              </div>
            </Link>
            <Link href="/forms/hotel" className="no-underline flex-1">
              <div className={usedService}>
                <div className="text-2xl mb-1">🏨</div>
                <div className="font-semibold">Pet Hotel</div>
                <div className="text-xs">Comfortable boarding and overnight care</div>
              </div>
            </Link>
          </div>

          {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="ownerName" className="text-sm font-semibold block mb-1">
            Owner Name
            </label>
            <input type="text" id="ownerName" placeholder="Owner Name" className={input} />
        </div>

        <div>
            <label htmlFor="phoneNumber" className="text-sm font-semibold block mb-1">
            Phone Number
            </label>
            <input type="text" id="phoneNumber" placeholder="Phone Number" className={input} />
        </div>

        <div className="col-span-1 md:col-span-2">
            <label htmlFor="emailAddress" className="text-sm font-semibold block mb-1">
            Email Address
            </label>
            <input type="email" id="emailAddress" placeholder="Email Address" className={input} />
        </div>

        <div>
            <label htmlFor="petName" className="text-sm font-semibold block mb-1">
            Pet Name
            </label>
            <input type="text" id="petName" placeholder="Pet Name" className={input} />
        </div>

        <div>
            <label htmlFor="petType" className="text-sm font-semibold block mb-1">
            Pet Type
            </label>
            <input type="text" id="petType" placeholder="Pet Type" className={input} />
        </div>

        <div>
            <label htmlFor="breed" className="text-sm font-semibold block mb-1">
            Enter Breed
            </label>
            <input type="text" id="breed" placeholder="e.g., Golden Retriever" className={input} />
        </div>

        <div>
            <label htmlFor="age" className="text-sm font-semibold block mb-1">
            Age
            </label>
            <input type="text" id="age" placeholder="e.g., 3 years" className={input} />
        </div>

        <div className="col-span-1 md:col-span-2">
            <label htmlFor="amountOfPet" className="text-sm font-semibold block mb-1">
            Amount Of Pet
            </label>
            <input type="number" id="amountOfPet" placeholder="Amount Of Pet" className={input} />
        </div>

        <div className="relative col-span-1 md:col-span-2">
            <label htmlFor="appointmentDate" className="text-sm font-semibold block mb-1">
            Appointment Date
            </label>
            <input type="date" id="appointmentDate" className={`${input} pr-10`} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Calendar className="w-5 h-5 text-gray-400" />
            </div>
        </div>

        <div className="relative col-span-1 md:col-span-2">
            <label htmlFor="appointmentDate" className="text-sm font-semibold block mb-1">
            Amount Of Days
            </label>
            <input type="number" id="appointmentDate" className={`${input} pr-10`} />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Calendar className="w-5 h-5 text-gray-400" />
            </div>
        </div>

            <div className="col-span-1 md:col-span-2 mt-20">
              <hr className="bg-gray-300 my-3" />
            </div>

        <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-[#286699] border-none text-white font-semibold py-3 rounded-md hover:bg-[#194E7A] transition"
        >
            Book Appointment
        </button>
        </form>

        </div>
      </div>
    </body>
  );
}
