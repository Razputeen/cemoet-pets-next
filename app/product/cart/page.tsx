"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Navbar from "#/app/components/Navbar/page";

type CartItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "Whisker Delight Cat Food", description: "Salmon & Chicken • 1.5kg bag", price: 18.0, quantity: 2, image: "/cat-food.png" },
    { id: 2, name: "Tail Waggers Dog Food", description: "Beef & Rice • 2kg bag", price: 22.0, quantity: 1, image: "/dog-food.png" },
    { id: 3, name: "Meow Mix Special", description: "Tuna & Mackerel • 1kg bag", price: 15.0, quantity: 3, image: "/cat-food.png" },
    { id: 4, name: "Doggo Treats", description: "Chicken Flavour • 500g", price: 8.0, quantity: 5, image: "/dog-food.png" },
    { id: 5, name: "Kitty Milk", description: "Lactose-free • 200ml", price: 5.0, quantity: 2, image: "/cat-food.png" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handleQuantityChange = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Pagination logic
  const totalPages = Math.ceil(cart.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cart.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9">
        <div className="min-h-screen bg-white rounded-3xl shadow-md p-4">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] h-full gap-4">
            
            {/* LEFT - Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold">Form Shipment</h2>
                <p className="text-gray-500 text-sm">
                  Delicious meals for your furbabies are just a step away!
                </p>
                <div className="mt-6 bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-sky-700">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="mt-6 w-full bg-sky-700 hover:bg-sky-800 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                  <CreditCard size={20} /> Checkout Now
                </button>
              </div>
              <button className="mt-6 flex items-center gap-2 text-lg font-bold text-black">
                <ArrowLeft size={20} /> Back
              </button>
            </div>

            {/* RIGHT - Cart Items with Pagination */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col">
              <div className="space-y-4 flex-1">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-blue-50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-md" />
                      <div>
                        <h3 className="font-bold underline">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <button className="px-2 py-1" onClick={() => handleQuantityChange(item.id, "dec")}>
                          <Minus size={16} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button className="px-2 py-1" onClick={() => handleQuantityChange(item.id, "inc")}>
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                      <button onClick={() => handleRemove(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
