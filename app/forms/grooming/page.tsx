'use client';
import { useState } from 'react';
import { Calendar, Plus, Minus } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Navbar from '../../Navbar/page';
import { usedService as styleUsedService, usedService } from "../../style";
import { unusedService as styleunusedService, unusedService } from "../../style";
import { input as styleInput, input } from "../../style";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export default function Grooming() {
  const [services, setServices] = useState([
    { id: 1, value: 'Anti Fungal Wash +Degreaser +Sebazol', price: 50000 },
  ]);

  const handleAddService = () => {
    setServices([...services, { id: Date.now(), value: '', price: 0 }]);
  };

  const handleRemoveService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleServiceChange = (id: number, newValue: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, value: newValue, price: 50000 } : s
      )
    );
  };

  return (
    <body className={poppins.className}>
      <Navbar />
      <div className="min-h-screen bg-[#f8f9fb] flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#374151]">
          Book Your Pet’s Appointment
        </h1>
        <p className="text-[#374151] text-center mb-6">
          Schedule grooming services for your beloved pet
        </p>

        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-3xl border">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Link href="/forms/clinic" className="no-underline flex-1">
              <div className={unusedService}>
                <div className="text-2xl mb-1">🩺</div>
                <div className="font-semibold">Veterinary Care</div>
                <div className="text-xs">Health checkups, treatments, and medical care</div>
              </div>
            </Link>
            <Link href="/forms/grooming" className="no-underline flex-1">
              <div className={usedService}>
                <div className="text-2xl mb-1">✂️</div>
                <div className="font-semibold">Grooming</div>
                <div className="text-xs">Professional grooming and styling services</div>
              </div>
            </Link>
            <Link href="/forms/hotel" className="no-underline flex-1">
              <div className={unusedService}>
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
                Enter breed
              </label>
              <input type="text" id="breed" placeholder="e.g., Shih Tzu" className={input} />
            </div>

            <div>
              <label htmlFor="age" className="text-sm font-semibold block mb-1">
                Age
              </label>
              <input type="text" id="age" placeholder="e.g., 2 years" className={input} />
            </div>

            <div className="relative">
              <label htmlFor="appointmentDate" className="text-sm font-semibold block mb-1">
                Appointment Date
              </label>
              <input type="date" id="appointmentDate" className={`${input} pr-10`} />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Calendar className="w-5 h-5 text-[#374151]" />
              </div>
            </div>

            <div>
              <label htmlFor="amountOfPet" className="text-sm font-semibold block mb-1">
                Amount Of Pet
              </label>
              <input type="number" id="amountOfPet" placeholder="Amount Of Pet" className={input} />
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
              {services.map((service) => (
                <div key={service.id} className="flex items-center gap-2">
                  <select
                    className="w-full border rounded-lg px-4 py-2 text-sm text-[#374151]"
                    value={service.value}
                    onChange={(e) => handleServiceChange(service.id, e.target.value)}
                  >
                    <option value="">Select service</option>
                    <option value="Anti Fungal Wash +Degreaser +Sebazol">Anti Fungal Wash +Degreaser +Sebazol</option>
                    <option value="Basic Wash + Nail Trim">Basic Wash + Nail Trim</option>
                    <option value="Full Grooming">Full Grooming</option>
                  </select>
                  <span className="w-16 text-sm text-right text-[#374151]">
                    {service.price / 1000}K
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service.id)}
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
      </div>
    </body>
  );
}
