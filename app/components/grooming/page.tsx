'use client';
import { useEffect, useState } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Navbar from '../../components/Navbar/page';
import { usedService as styleUsedService, usedService } from "../../style";
import { unusedService as styleunusedService, unusedService } from "../../style";
import { input as styleInput, input } from "../../style";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';





  type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
};

  type Grooming = {
  id: string;
  name: string;
  price: number;
  description: string;
  specification: string;
};


type SelectedService = Grooming & { frontendId: string };

export default function Grooming() {

  const [grooming, setGrooming] = useState<Grooming[]>([]);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [petName, setPetName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState(0);
  const [petAmount, setPetAmount] = useState(1);
  const [petType, setPetType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  useEffect(() => {
    fetch("http://localhost:3222/grooms")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setGrooming(data);
        } else {
          console.error("Expected array but got:", data);
          setGrooming([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setGrooming([]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("User not found!");
      return;
    }
    const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const body = {
      petName,
      petBreed,
      petAge,
      petType,
      bookingDate,
      totalPrice,
      groomIds: selectedServices.map((s) => s.id), // <- ID asli
      userIds: user.sub,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3222/grooming-reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to submit reservation");
      }
      alert("Reservation booked successfully!");
      router.push(`/reservation/grooming/${user.sub}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while booking");
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.log("Body to be sent:", body);
    }
  };





  const handleAddService = () => {
    setSelectedServices([
      ...selectedServices,
      {
        frontendId: Date.now().toString(),
        id: "",
        name: "",
        price: 0,
        description: "",
        specification: "",
      },
    ]);
  };

  const handleRemoveService = (frontendId: string) => {
    setSelectedServices((prev) => prev.filter((s) => s.frontendId !== frontendId));
  };

  const handleServiceChange = (frontendId: string, selectedName: string) => {
    const found = grooming.find((g) => g.name === selectedName);
    if (!found) return;

    setSelectedServices((prev) =>
      prev.map((s) => (s.frontendId === frontendId ? { ...found, frontendId } : s))
    );
  };




  return (
    <div className="">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Owner Info */}
            <div className="col-span-1 md:col-span-2">
              <p className="text-sm font-semibold text-[#374151] mb-1">Owner Name</p>
              <div className="bg-gray-100 rounded-md px-4 py-2 text-[#374151]">{user?.Name}</div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <p className="text-sm font-semibold text-[#374151] mb-1">Email Address</p>
              <div className="bg-gray-100 rounded-md px-4 py-2 text-[#374151]">{user?.email}</div>
            </div>

            <div>
              <label htmlFor="petName" className="text-sm font-semibold block mb-1">
                Pet Name
              </label>
              <input type="text" id="petName" placeholder="Pet Name" className={input} onChange={(e) => setPetName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="petType" className="text-sm font-semibold block mb-1">
                Pet Type
              </label>
              <input type="text" id="petType" placeholder="Pet Type" className={input} onChange={(e) => setPetType(e.target.value)} />
            </div>

            <div>
              <label htmlFor="breed" className="text-sm font-semibold block mb-1">
                Enter breed
              </label>
              <input type="text" id="breed" placeholder="e.g., Shih Tzu" className={input} onChange={(e) => setPetBreed(e.target.value)} />
            </div>

            <div>
              <label htmlFor="age" className="text-sm font-semibold block mb-1">
                Age
              </label>
              <input type="text" id="age" placeholder="e.g., 2 years" className={input} onChange={(e) => setPetAge(Number(e.target.value))} />
            </div>

            <div className="relative col-span-2">
              <label htmlFor="appointmentDate" className="text-sm font-semibold block mb-1">
                Appointment Date
              </label>
              <input type="date" id="appointmentDate" className={`${input} pr-10`} onChange={(e) => setBookingDate(e.target.value)} />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Calendar className="w-5 h-5 text-[#374151]" />
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center justify-start mt-4">
              <button
                type="button"
                onClick={handleAddService}
                className="flex items-center gap-1 text-sm text-[#374151] hover:underline border-none bg-white hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Grooming Service
              </button>
            </div>

            <div className="col-span-1 md:col-span-2">
              <hr className="bg-gray-300 my-3" />
            </div>

            {/* Service Items */}
            <div className="col-span-1 md:col-span-2 space-y-3">
            {selectedServices.map((service) => (
              <div key={service.frontendId} className="flex items-center gap-2">
                <select
                  className="w-full border rounded-lg px-4 py-2 text-sm text-[#374151]"
                  value={service.name}
                  onChange={(e) => handleServiceChange(service.frontendId, e.target.value)}
                >
                  <option value="">Select service</option>
                  {grooming .map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>

                <span className="w-16 text-sm text-right text-[#374151]">
                  {service.price / 1000}K
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(service.frontendId)}
                  className="text-[#374151] hover:text-red-500 bg-white border-none"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            ))}
            </div>
            <div className="col-span-1 md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-[#286699] text-white font-semibold border-none py-3 rounded-md hover:bg-[#194E7A] transition"
              >
                Book Appointment
              </button>
            </div>
          </form>
    </div>
  );
}
