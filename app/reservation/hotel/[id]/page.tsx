"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight, PawPrint, Hotel, Calendar, Clock, DollarSign, CheckCircle } from "lucide-react";
import Navbar from "../../../components/Navbar/page";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type HotelRes = {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  appointmentDate: string;
  amountDays: number;
  hotel: {
    id: number;
    name: string;
    price: number;
  };
  status: "Not Ready" | "Ready" | "Completed";
};

type User = {
  id: string;
  Name: string;
  email: string;
  phoneNum: string;
  hotelres: HotelRes[];
  role: { id: string; name: string };
};

export default function MyHotelPage() {
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<User>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);// Changed to 3 for better list density
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      if (!userId) {
        return;
      }
      try {
        const response = await fetch(`http://localhost:3222/users/${userId}`);
        const data = await response.json();
        setUser(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    fetchUser();
  }, [userId]);

  const hotelReservations = user?.hotelres ?? [];

  const filteredHotelRes = hotelReservations.filter(
    (h) =>
      h.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.petBreed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredHotelRes.length / itemsPerPage);
  const paginatedHotelRes = filteredHotelRes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Not Ready":
        return <span className="inline-flex items-center gap-1 text-red-600 font-semibold px-3 py-1 rounded-full bg-red-50"><Clock size={14} /> Waiting</span>;
      case "Ready":
        return <span className="inline-flex items-center gap-1 text-blue-600 font-semibold px-3 py-1 rounded-full bg-blue-50"><CheckCircle size={14} /> Confirmed</span>;
      case "Completed":
        return <span className="inline-flex items-center gap-1 text-green-600 font-semibold px-3 py-1 rounded-full bg-green-50"><CheckCircle size={14} /> Completed</span>;
      default:
        return <span className="inline-flex items-center gap-1 text-gray-500 font-semibold px-3 py-1 rounded-full bg-gray-100">{status}</span>;
    }
  };

  const notReadyCount = hotelReservations.filter((h) => h.status === "Not Ready").length;
  const readyCount = hotelReservations.filter((h) => h.status === "Ready").length;
  const completedCount = hotelReservations.filter((h) => h.status === "Completed").length;

  const formatRupiah = (price: number) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const calculateTotalPrice = (res: HotelRes) => {
    return res.amountDays * (res.hotel?.price || 0);
  };

  const totalSpent = hotelReservations.reduce((sum, res) => sum + calculateTotalPrice(res), 0);

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">My Pet Hotel Bookings</h1>
            <p className="text-lg text-gray-600 mt-2">
              Manage and track your pet's hotel reservations.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-sky-100 rounded-full">
                  <Hotel size={24} className="text-sky-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{hotelReservations.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Waiting</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{notReadyCount}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CheckCircle size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Confirmed</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{readyCount}</p>
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

          <div className="mb-6">
            <Input
              placeholder="Search bookings by pet name, type, or breed..."
              className="w-full md:w-1/3 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="space-y-6">
            {paginatedHotelRes.length === 0 ? (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <div className="text-gray-400 mb-4">
                  <Hotel size={48} className="mx-auto" />
                </div>
                <p className="text-lg text-gray-500 font-semibold">
                  {searchTerm
                    ? "No hotel bookings found matching your search."
                    : "You have no pet hotel bookings."}
                </p>
                {!searchTerm && (
                  <Link href="/forms/hotel" className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors font-medium">
                    <Button className="mt-4">
                      Book Your First Pet Hotel Stay
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              paginatedHotelRes.map((hotelres) => (
                <Card key={hotelres.id} className="shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 border-gray-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {hotelres.petName}'s Hotel Stay
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Booking ID: #{hotelres.id.slice(0, 8)}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0">
                        {getStatusBadge(hotelres.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <PawPrint size={18} />
                          <p className="font-semibold">Pet Name:</p>
                          <span className="font-normal">{hotelres.petName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <PawPrint size={18} />
                          <p className="font-semibold">Type/Breed:</p>
                          <span className="font-normal">{`${hotelres.petType} / ${hotelres.petBreed}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <PawPrint size={18} />
                          <p className="font-semibold">Age:</p>
                          <span className="font-normal">{hotelres.petAge}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={18} />
                          <p className="font-semibold">Check-in Date:</p>
                          <span className="font-normal">
                            {new Date(hotelres.appointmentDate).toLocaleDateString('en-US', {
                              weekday: "long",
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <Clock size={18} />
                          <p className="font-semibold">Duration:</p>
                          <span className="font-normal">{hotelres.amountDays} days</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mt-2">
                          <Hotel size={18} />
                          <p className="font-semibold">Hotel Name:</p>
                          <span className="font-normal">{hotelres.hotel?.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 flex flex-col sm:flex-row justify-end gap-2 border-t border-gray-200">
                      {hotelres.status === "Ready" ? (
                        <>
                          <Button variant="secondary" className="w-full sm:w-auto">Reschedule</Button>
                          <Button variant="destructive" className="w-full sm:w-auto">Cancel</Button>
                        </>
                      ) : hotelres.status === "Completed" ? (
                        <Button variant="outline" className="w-full sm:w-auto">Book Again</Button>
                      ) : (
                        <span className="text-gray-500 text-sm italic">
                          Waiting for confirmation...
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {totalPages > 1 && (
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
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          )}
        </div>
        <select
  value={itemsPerPage}
  onChange={(e) => setItemsPerPage(Number(e.target.value))}
>
  <option value={3}>3 / page</option>
  <option value={5}>5 / page</option>
  <option value={10}>10 / page</option>
  <option value={filteredHotelRes.length}>All</option>
</select>
      </div>
    </>
  );
}