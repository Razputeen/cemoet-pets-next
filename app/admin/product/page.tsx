"use client"

import { useEffect, useState } from "react";
import { CalendarCheck, Clock, CheckCircle, DollarSign } from "lucide-react";
import Link from "next/link";

type GroomingAppointment = {
  id: string;
  customer: string;
  email: string;
  petName: string;
  service: string;
  date: string;
  status: "Pending" | "Processing" | "Completed";
  price: number;
};

const mockData: GroomingAppointment[] = [
  {
    id: "GR-2024-001",
    customer: "Sarah Johnson",
    email: "sarah@gmail.com",
    petName: "Max",
    service: "Full Grooming",
    date: "Aug 05, 2025",
    status: "Completed",
    price: 35.0,
  },
  {
    id: "GR-2024-002",
    customer: "Mike Chen",
    email: "mike@gmail.com",
    petName: "Whiskers",
    service: "Bath & Brush",
    date: "Aug 04, 2025",
    status: "Processing",
    price: 25.5,
  },
  {
    id: "GR-2024-003",
    customer: "Emma Davis",
    email: "emma@gmail.com",
    petName: "Coco",
    service: "Nail Trimming",
    date: "Aug 03, 2025",
    status: "Pending",
    price: 15.0,
  },
  {
    id: "GR-2024-004",
    customer: "David Wilson",
    email: "david@gmail.com",
    petName: "Goldie",
    service: "Haircut",
    date: "Aug 02, 2025",
    status: "Completed",
    price: 30.0,
  },
];

export default function AdminGroomingPage() {
  const [appointments, setAppointments] = useState<GroomingAppointment[]>([]);

  useEffect(() => {
    setAppointments(mockData);
  }, []);

  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "Pending").length;
  const completed = appointments.filter(a => a.status === "Completed").length;
  const revenue = appointments.reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">Grooming Appointments</h2>
          <p className="text-gray-500">Manage and track pet grooming schedules</p>
        </div>
        <Link
          href="/admin/grooming/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
          <CalendarCheck className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Appointments</p>
            <p className="text-xl font-semibold">{total}</p>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
          <Clock className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-xl font-semibold">{pending}</p>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
          <CheckCircle className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-xl font-semibold">{completed}</p>
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center space-x-4">
          <DollarSign className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-xl font-semibold">${revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Appointment ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Pet</th>
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-2 text-blue-600 font-medium">{a.id}</td>
                <td className="px-4 py-2">
                  <div className="font-semibold">{a.customer}</div>
                  <div className="text-xs text-gray-500">{a.email}</div>
                </td>
                <td className="px-4 py-2">{a.petName}</td>
                <td className="px-4 py-2">{a.service}</td>
                <td className="px-4 py-2 font-medium">${a.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      a.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : a.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {a.status}
                  </span>
                </td>
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">
                  <Link href={`/admin/grooming/${a.id}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-500">Showing 1 to {appointments.length} of {appointments.length} appointments</p>
        <div className="space-x-1">
          <button className="px-3 py-1 border rounded bg-gray-100 text-gray-700">1</button>
          <button className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-100">2</button>
          <button className="px-3 py-1 border rounded text-gray-500 hover:bg-gray-100">3</button>
        </div>
      </div>
    </div>
  );
}
