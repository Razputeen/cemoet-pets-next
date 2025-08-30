"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight, CloudRainWindIcon } from "lucide-react";
import Navbar from "../../../components/Navbar/page";
import { useParams, useRouter } from "next/navigation";

type Clinic = {
  id: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: string;
  appointmentDate: string;
  description: string;
  status: string; // Not Ready | Upcoming | Completed
};

type User = {
  id: string;
  Name: string;
  email: string;
  phoneNum: string;
  clinic: Clinic[];
  role: { id: string; name: string };
};

export default function MyClinicPage() {
  const params = useParams();
  const userId = params?.id as string;
  const [user, setUser] = useState<User>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 2;
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log("🔍 Fetching user data for userId:", userId);
        const response = await fetch(`http://localhost:3222/users/${userId}`);
        const data = await response.json();

        console.log("🔥 FULL API RESPONSE:", data);
        console.log("🔥 User data:", data.data);
        console.log("🔥 clinic array:", data.data?.clinic);
        console.log(
          "🔥 Number of appointments:",
          data.data?.clinic?.length || 0
        );

        setUser(data.data);
      } catch (error) {
        console.error("❌ Error fetching user:", error);
      }
    }
    fetchUser();
  }, [userId]);

  const clinic = user?.clinic ?? [];

  // Filter berdasarkan search term
  const filteredClinic = clinic.filter(
    (c) =>
      c.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.petType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.petBreed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClinic.length / itemsPerPage);
  const paginatedClinic = filteredClinic.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Count by status
  const notReadyCount = clinic.filter((c) => c.status === "Not Ready").length;
  const readyCount = clinic.filter((c) => c.status === "Ready").length;
  const pastCount = clinic.filter((c) => c.status === "Completed").length;

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            My Clinic Appointments
          </h2>
          <p className="text-gray-500">
            Manage and track your veterinary clinic appointments
          </p>
        </div>

        {/* Dashboard counts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold">{clinic.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Not Ready</p>
              <p className="text-2xl font-bold">{notReadyCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Not Ready</p>
              <p className="text-2xl font-bold">{notReadyCount}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Completed</p>
              <p className="text-2xl font-bold">{pastCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search appointments by pet name, type, or breed..."
            className="w-full md:w-1/2"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Appointment List */}
        {filteredClinic.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <CloudRainWindIcon size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500">
                {searchTerm
                  ? "No clinic appointments found matching your search."
                  : "No clinic appointments found."}
              </p>
              {!searchTerm && (
                <Button
                  className="mt-4"
                  onClick={() => router.push("/forms/clinic")}
                >
                  Book Your First Clinic Appointment
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {paginatedClinic.map((clinic) => (
              <Card key={clinic.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        Clinic Appointment #{clinic.id.slice(0, 8)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Scheduled for{" "}
                        {new Date(clinic.appointmentDate).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="text-sm">
                      {clinic.status === "Not Ready" ? (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Not Ready
                        </span>
                      ) : clinic.status === "Ready" ? (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Ready
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pet Details */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Pet Name</p>
                      <p className="font-semibold">{clinic.petName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="font-semibold">{clinic.petType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Breed</p>
                      <p className="font-semibold">{clinic.petBreed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Age</p>
                      <p className="font-semibold">{clinic.petAge}</p>
                    </div>
                  </div>

                  {/* Description */}
                  {clinic.description && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Health Concern</p>
                      <p className="text-sm bg-gray-50 p-2 rounded">
                        {clinic.description}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-end gap-2">
                    {clinic.status === "Upcoming" ? (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            alert(
                              "Reschedule clinic appointment functionality coming soon!"
                            )
                          }
                        >
                          Reschedule
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to cancel this clinic appointment?"
                              )
                            ) {
                              alert(
                                "Cancel clinic appointment functionality coming soon!"
                              );
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : clinic.status === "Completed" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push("/forms/clinic")}
                      >
                        Book Another Clinic Visit
                      </Button>
                    ) : (
                      <span className="text-gray-500 text-sm italic">
                        Waiting for confirmation...
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </>
  );
}
