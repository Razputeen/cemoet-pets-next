"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar/page";
import { useParams, useRouter } from "next/navigation";

type GroomingReservation = {
  id: string;
  petName: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`http://localhost:3222/users/${userId}`);
      const data = await response.json();
      setUser(data.data); // ✅ FIXED
      console.log("🔥 FULL RESPONSE:", data);
      console.log("🔥 reserveGroom isi:", data.data?.reserveGroom);
    }
    fetchUser();
  }, [userId]);

  const groomings = user?.reserveGroom ?? [];
  const totalPages = Math.ceil(groomings.length / itemsPerPage);
  const paginatedGroomings = groomings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const upcomingCount = groomings.filter(
    (g) => new Date(g.bookingDate) > new Date()
  ).length;
  const pastCount = groomings.length - upcomingCount;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Groomings</h2>
          <p className="text-gray-500">
            Manage and track your grooming appointments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{groomings.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold">{upcomingCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Past</p>
              <p className="text-2xl font-bold">{pastCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-blue-600">
                ${groomings.reduce((sum, g) => sum + (g.totalPrice || 0), 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <Input
            placeholder="Search appointments..."
            className="w-full md:w-1/2"
          />
        </div>

        <div className="space-y-4">
          {paginatedGroomings.map((groom) => (
            <Card key={groom.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">
                      Appointment #{groom.id.slice(0, 6)}...
                    </h4>
                    <p className="text-sm text-gray-500">
                      Booked on{" "}
                      {new Date(groom.bookingDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-sm">
                    {new Date(groom.bookingDate) > new Date() ? (
                      <span className="text-blue-600 font-semibold">
                        Upcoming
                      </span>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="text-sm">
                    Pet Name: <strong>{groom.petName}</strong>
                  </p>
                  <p className="text-sm">Breed: {groom.petBreed}</p>
                  <p className="text-sm">Age: {groom.petAge} years</p>
                  <p className="text-sm">Total Price: ${groom.totalPrice}</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {new Date(groom.bookingDate) > new Date() ? (
                    <>
                      <Button variant="secondary">Reschedule</Button>
                      <Button variant="destructive">Cancel</Button>
                    </>
                  ) : (
                    <Button variant="ghost">Book Again</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8 gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <ChevronLeft size={16} />
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}
