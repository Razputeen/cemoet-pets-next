"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/app/components/Navbar/page";
import { useParams, useRouter } from "next/navigation";

type Clinic = {
  id: number;
  name: string;
  specification: string;
  price: number;
  description: string;
};

type User = {
  id: number;
  Name: string;
  email: string;
  phoneNum: string;
};

type ClinicAppointment = {
  id: number;
  petName: string;
  petBreed: string;
  petAge: number;
  petType: string;
  appointmentDate: string;
  status: string;
  description: string;
  user: User;
  clinics: Clinic[];
};

export default function AdminClinicDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id; // ✅ FIX disini
  const router = useRouter();

  const [appointment, setAppointment] = useState<ClinicAppointment | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3222/clinic/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch appointment");
        return res.json();
      })
      .then((data) => {
        setAppointment(Array.isArray(data) ? data[0] : data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!appointment) return <p className="p-4">No appointment found</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ChevronLeft size={20} /> Back
        </Button>

        {/* Card */}
        <Card className="shadow-lg">
          <CardContent className="space-y-6 p-6">
            <h2 className="text-2xl font-bold">Clinic Appointment Detail</h2>

            {/* Pet Info */}
            <div>
              <h3 className="text-lg font-semibold">🐾 Pet Information</h3>
              <p>
                <b>Name:</b> {appointment.petName}
              </p>
              <p>
                <b>Breed:</b> {appointment.petBreed}
              </p>
              <p>
                <b>Age:</b> {appointment.petAge} years
              </p>
              <p>
                <b>Type:</b> {appointment.petType}
              </p>
            </div>

            {/* Appointment Info */}
            <div>
              <h3 className="text-lg font-semibold">📅 Appointment Details</h3>
              <p>
                <b>Date:</b>{" "}
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <b>Status:</b> {appointment.status}
              </p>
              <p>
                <b>Description:</b> {appointment.description}
              </p>
            </div>

            {/* User Info */}
            <div>
              <h3 className="text-lg font-semibold">👤 Owner Information</h3>
              <p>
                <b>Name:</b> {appointment.user.Name}
              </p>
              <p>
                <b>Email:</b> {appointment.user.email}
              </p>
              <p>
                <b>Phone:</b> {appointment.user.phoneNum}
              </p>
            </div>

            {/* Clinic Info */}
            <div>
              <h3 className="text-lg font-semibold">🏥 Clinic(s)</h3>
              {appointment.clinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="border p-3 rounded mb-2 bg-gray-50"
                >
                  <p>
                    <b>Name:</b> {clinic.name}
                  </p>
                  <p>
                    <b>Spec:</b> {clinic.specification}
                  </p>
                  <p>
                    <b>Price:</b> Rp {clinic.price}
                  </p>
                  <p>
                    <b>Description:</b> {clinic.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
