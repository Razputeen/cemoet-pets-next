'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { ChevronLeft, ChevronRight, CheckCircle, Package, Clock } from "lucide-react";
import Navbar from "../../../components/Navbar/page";
import { useParams } from "next/navigation";
import Image from 'next/image';

type Order = {
  id: string;
  date: string;
  status: string;
  price: number;
  cart: Cart;
  items: OrderItem[];
}

type OrderItem = {
  id: number;
  quantity: number;
  total: number;
  product: Product;
}

type Cart = {
  id: string;
  name: string;
  total: number;
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
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const userId = params?.id as string;

  useEffect(() => {
    if (!userId) return;
    async function getOrders() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3222/order/user/${userId}`);
        const data = await res.json();
        
        // Debug: Log the raw data to see structure
        console.log("Raw API response:", data);
        
        const mappedOrders = data.map((o: any) => {
          // Debug: Log each order structure
          console.log("Order structure:", o);
          console.log("Order items:", o.orderItems);
          
          // Calculate total from orderItems
          const orderTotal = o.orderItems?.reduce((sum: number, item: any) => sum + (item.price * item.quantity || 0), 0) || 0;
          
          return {
            id: o.id,
            date: new Date(o.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            status: o.status,
            price: orderTotal, // Use calculated total from orderItems
            cart: {
              id: o.id.toString(),
              name: `Order ${o.id}`,
              total: orderTotal,
            },
            // Use orderItems instead of items
            items: o.orderItems?.map((orderItem: any) => ({
              id: orderItem.id,
              quantity: orderItem.quantity || 1, // If quantity not in orderItem, default to 1
              total: orderItem.price || 0,
              product: orderItem.product
            })) || [],
          };
        });
        
        console.log("Mapped orders:", mappedOrders);
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }
    getOrders();
  }, [userId]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const processingCount = orders.filter(o => o.status === 'Processing').length;
  const totalSpent = orders.reduce((sum, o) => sum + (o.cart?.total || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="flex items-center gap-1 text-green-600 font-semibold px-3 py-1 rounded-full bg-green-50"><CheckCircle size={14} /> Delivered</span>;
      case 'Shipped':
        return <span className="flex items-center gap-1 text-blue-600 font-semibold px-3 py-1 rounded-full bg-blue-50"><Package size={14} /> Shipped</span>;
      case 'Processing':
        return <span className="flex items-center gap-1 text-orange-600 font-semibold px-3 py-1 rounded-full bg-orange-50"><Clock size={14} /> Processing</span>;
      default:
        return <span className="text-gray-500">{status}</span>;
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center">
              <p className="text-lg text-gray-600">Loading your orders...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
        <div className="max-w-screen-xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">My Orders</h1>
            <p className="text-lg text-gray-600 mt-2">Track and manage your pet food orders easily.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-4xl font-bold text-gray-800 mt-2">{orders.length}</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Delivered</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{deliveredCount}</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Processing</p>
                <p className="text-4xl font-bold text-orange-600 mt-2">{processingCount}</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">Rp {totalSpent.toLocaleString('id-ID')}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <Input placeholder="Search orders by ID..." className="w-full md:w-1/3 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div className="space-y-6">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, index) => (
                <Card key={index} className="shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4 border-gray-200">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Order ID: #{order.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">Placed on {order.date}</p>
                      </div>
                      <div className="mt-3 md:mt-0">
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, i) => {
                          // Debug: Log each item to see its structure
                          console.log(`Item ${i}:`, item);
                          console.log(`Product for item ${i}:`, item.product);
                          console.log(`Images for item ${i}:`, item.product?.images);
                          
                          return (
                            <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                              <div className="relative w-12 h-12 flex-shrink-0">
                                {item.product?.images && item.product.images.length > 0 ? (
                                  <Image
                                    src={`http://localhost:3222${item.product.images[0].url}`}
                                    alt={item.product?.name || 'Product'}
                                    fill
                                    className="rounded-md object-cover"
                                    onError={(e) => {
                                      console.error("Image failed to load:", `http://localhost:3222${item.product.images[0].url}`);
                                      // You can set a fallback image here
                                      e.currentTarget.src = '/placeholder-product.png'; // Make sure this exists
                                    }}
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                    <Package size={16} className="text-gray-400" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.product?.name || 'Unknown Product'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity || 0}</p>
                                {item.total && (
                                  <p className="text-xs text-gray-600">Rp {item.total.toLocaleString('id-ID')}</p>
                                )}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-400">No items found for this order.</p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200">
                      <p className="text-xl font-extrabold text-gray-900">Rp {(order.price).toLocaleString('id-ID')}</p>
                      {order.status === "Delivered" && (
                        <Button className="w-full sm:w-auto">View Details</Button>
                      )}
                      {order.status === "Shipped" && (
                        <Button variant="outline" className="w-full sm:w-auto">Track Order</Button>
                      )}
                      {order.status === "Processing" && (
                        <span className="text-sm text-gray-500">Order is being prepared.</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-white rounded-xl shadow-lg">
                <p className="text-lg text-gray-500 font-semibold">You haven't placed any orders yet.</p>
                <p className="text-sm text-gray-400 mt-2">Start your first order and track it here!</p>
              </div>
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
      </div>
      <footer className="py-8 text-center text-gray-600 bg-white border-t border-gray-200">
        <p>Copyright © 2025 Cemoet Pets</p>
      </footer>
    </>
  );
}