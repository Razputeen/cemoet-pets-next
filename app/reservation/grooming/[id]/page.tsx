"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  PawPrint,
  Calendar,
  History,
  DollarSign,
} from "lucide-react";
import Navbar from "../../../components/Navbar/page";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type GroomingReservation = {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  bookingDate: string;
  totalPrice: number;
};

type User = {
  id: string;
  Name: string;
  email: string;
  phoneNum: string;
  reserveGroom: GroomingReservation[];
  role: { id: string; name: string };
};

export default function MyGroomingsPage() {
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<User>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return;
      try {
        const response = await fetch(`http://localhost:3222/users/${userId}`);
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, [userId]);

  const groomings = user?.reserveGroom ?? [];

  // 🔹 Filter data dulu
  const filteredGroom = groomings.filter(
    (c) =>
      c.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.petBreed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Hitung total halaman
  const totalPages = Math.ceil(filteredGroom.length / itemsPerPage);

  // 🔹 Ambil data per halaman dari hasil filter
  const paginatedGroomings = filteredGroom.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const upcomingCount = groomings.filter(
    (g) => new Date(g.bookingDate) > new Date()
  ).length;
  const completedCount = groomings.length - upcomingCount;
  const totalSpent = groomings.reduce(
    (sum, g) => sum + (g.totalPrice || 0),
    0
  );

  const formatRupiah = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              My Groomings
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage and track your pet's grooming appointments.
            </p>
          </header>

          {/* Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-sky-100 rounded-full">
                  <PawPrint size={24} className="text-sky-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {groomings.length}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Upcoming</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {upcomingCount}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <History size={24} className="text-red-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {completedCount}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <DollarSign size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Spent</p>
                  <p className="text-xl font-bold text-purple-600 mt-1">
                    {formatRupiah(totalSpent)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search bookings by pet name, type, or breed..."
              className="w-full md:w-1/3 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset halaman kalau search
              }}
            />
          </div>

          {/* List Groomings */}
          <div className="space-y-6">
            {paginatedGroomings.length > 0 ? (
              paginatedGroomings.map((groom) => (
                <Card
                  key={groom.id}
                  className="shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 border-gray-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {groom.petName}'s Grooming
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Booking ID: #{groom.id.slice(0, 8)}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        {new Date(groom.bookingDate) > new Date() ? (
                          <span className="inline-flex items-center gap-1 text-sky-600 font-semibold px-3 py-1 rounded-full bg-sky-50">
                            Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-green-600 font-semibold px-3 py-1 rounded-full bg-green-50">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <PawPrint size={18} />
                          <p className="font-semibold">Pet Name:</p>
                          <span className="font-normal">{groom.petName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <PawPrint size={18} />
                          <p className="font-semibold">Pet Breed:</p>
                          <span className="font-normal">{groom.petBreed}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <PawPrint size={18} />
                          <p className="font-semibold">Pet Age:</p>
                          <span className="font-normal">{groom.petAge} years</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={18} />
                          <p className="font-semibold">Date:</p>
                          <span className="font-normal">
                            {new Date(groom.bookingDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <DollarSign size={18} />
                          <p className="font-semibold">Total Price:</p>
                          <span className="font-normal text-lg font-bold">
                            {formatRupiah(groom.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 flex flex-col sm:flex-row justify-end gap-2 border-t border-gray-200">
                      {new Date(groom.bookingDate) > new Date() ? (
                        <>
                          <Button variant="secondary" className="w-full sm:w-auto">
                            Reschedule
                          </Button>
                          <Button variant="destructive" className="w-full sm:w-auto">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" className="w-full sm:w-auto">
                          Book Again
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <p className="text-lg text-gray-500 font-semibold">
                  You have no grooming appointments.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Book an appointment now to get your pet pampered!
                </p>
                <Link
                  href="/book-grooming"
                  className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors font-medium"
                >
                  <PawPrint size={16} className="mr-2" />
                  Book Now
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 gap-2">
            <Button
              size="icon"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeft size={20} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                size="icon"
                variant={currentPage === i + 1 ? "default" : "ghost"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              size="icon"
              variant="outline"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
