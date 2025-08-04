'use client';

import React, { useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dawg from "../../image/Dawg1.jpg";
import  Navbar  from "../../components/Navbar/page";

const orders = [
  {
    id: "#ORD-2024-001",
    date: "Dec 15, 2024",
    status: "Delivered",
    items: [
      { name: "Premium Dog Food", qty: 2, img: "../../image/Dawg1.jpg" },
      { name: "Cat Treats", qty: 3, img: "../../image/Dawg1.jpg" },
    ],
    price: "$189.99",
    shipping: "Free Shipping",
  },
  {
    id: "#ORD-2024-002",
    date: "Dec 18, 2024",
    status: "Shipped",
    items: [
      { name: "Wet Dog Food", qty: 1, img: "../../image/Dawg1.jpg" },
      { name: "Dog Chew Toys", qty: 1, img: "../../image/Dawg1.jpg" },
    ],
    price: "$67.49",
    estimated: "Dec 22",
  },
  {
    id: "#ORD-2024-003",
    date: "Dec 20, 2024",
    status: "Processing",
    items: [
      { name: "Premium Cat Food", qty: 1, img: "../../image/Dawg1.jpg" },
      { name: "Cat Litter", qty: 2, img: "../../image/Dawg1.jpg" },
    ],
    price: "$124.99",
  },
  {
    id: "#ORD-2024-004",
    date: "Dec 21, 2024",
    status: "Delivered",
    items: [
      { name: "Fish Food", qty: 1, img: "../../image/Dawg1.jpg" },
    ],
    price: "$29.99",
  },
  {
    id: "#ORD-2024-005",
    date: "Dec 22, 2024",
    status: "Shipped",
    items: [
      { name: "Rabbit Treats", qty: 2, img: "../../image/Dawg1.jpg" },
    ],
    price: "$44.99",
    estimated: "Dec 26",
  },
];

export default function MyOrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <><Navbar />
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
        <p className="text-gray-500">Track and manage your pet food orders</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Delivered</p>
            <p className="text-2xl font-bold">{orders.filter(o => o.status === 'Delivered').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Processing</p>
            <p className="text-2xl font-bold">{orders.filter(o => o.status === 'Processing').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-blue-600">$1,247</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <Input placeholder="Search orders..." className="w-full md:w-1/2" />
      </div>

      <div className="space-y-4">
        {paginatedOrders.map((order, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Order {order.id}</h4>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-sm">
                  {order.status === "Delivered" && (
                    <span className="text-green-600 font-semibold">Delivered</span>
                  )}
                  {order.status === "Shipped" && (
                    <span className="text-blue-600 font-semibold">Shipped</span>
                  )}
                  {order.status === "Processing" && (
                    <span className="text-orange-500 font-semibold">Processing</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={item.img} alt="product" className="w-12 h-12 rounded" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold">{order.price}</p>
                {order.status === "Delivered" && (
                  <Button variant="default">View Details</Button>
                )}
                {order.status === "Shipped" && (
                  <div className="flex items-center gap-2">
                    <Button variant="secondary">Track Order</Button>
                    <span className="text-sm text-gray-500">Estimated: {order.estimated}</span>
                  </div>
                )}
                {order.status === "Processing" && (
                  <span className="text-sm text-gray-500">Processing...</span>
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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      <footer className="mt-12 text-center text-gray-600">
        <h4 className="font-bold text-lg">Cemoet Pets</h4>
        <p>Premium nutrition for your beloved pets</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div></>
  );
}