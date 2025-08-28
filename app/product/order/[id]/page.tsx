'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dawg from "../../image/Dawg1.jpg";
import  Navbar  from "../../../components/Navbar/page";
import { useParams } from "next/navigation";
import Image from 'next/image';



interface Order {
  id: string;
  date: string;
  status: string;
  price: string;
  cart: Cart;
}

type Cart = {
  id: string;
  name: string;
  total: number;
  items: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
  total: number;
  product: Product;
};

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: ProductImage[];
  stock: number;
  category: string;
  brand?: string;
  weight?: number;
  specification?: string;
};

type ProductImage = {
  id: number;
  url: string;
};



export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const params = useParams();
  const userId = params?.id as string;
useEffect(() => {
  if (!userId) return;
  async function getOrders() {
    const res = await fetch(`http://localhost:3222/order/user/${userId}`);
    const data = await res.json();

    // map biar sesuai sama interface Order di frontend
    const mappedOrders = data.map((o: any) => ({
      id: o.id,
      date: o.createdAt || new Date().toISOString(), // fallback
      status: o.status,
      price: `Rp ${o.cart?.total || 0}`,
      cart: o.cart,
    }));

    setOrders(mappedOrders);
    console.log("🔥 Orders Mapped:", mappedOrders);
  }
  getOrders();
}, [userId]);

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
  {order.cart?.items?.map((item, i) => (
    <div key={i} className="flex items-center gap-2">
      <Image
        src={`http://localhost:3222${item.product.images[0]?.url}`}
        alt={item.product.name}
        width={50}
        height={50}
        className="rounded-md"
      />
      <div>
        <p className="text-sm font-medium">{item.product.name}</p>
        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
      </div>
    </div>
  )) ?? <p className="text-gray-400">No items</p>}
</div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-bold">{order.price}</p>
                {order.status === "Delivered" && (
                  <Button variant="default">View Details</Button>
                )}
                {order.status === "Shipped" && (
                  <div className="flex items-center gap-2">
                    <Button variant="secondary">Track Order</Button>
                    {/* <span className="text-sm text-gray-500">Estimated: {order.estimated}</span> */}
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