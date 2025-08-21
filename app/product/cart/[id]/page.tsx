"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "#/app/components/Navbar/page";
import { useParams } from "next/navigation";
import PayButton from "#/app/components/checkout/page";

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

type user = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
  cart: Cart[];
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]); 
  const [user, setUser] = useState<user>();
  const params = useParams();
  const userId = params?.id as string;

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;

      const userRes = await fetch(`http://localhost:3222/users/${userId}`);
      const userData = await userRes.json();
      setUser(userData.data);

      const cartRes = await fetch(`http://localhost:3222/cart/user/${userId}`);
      const cartData = await cartRes.json();
      console.log("🔥 Cart Data:", cartData);

      if (Array.isArray(cartData)) {
        setCart(cartData);
      } else if (Array.isArray(cartData.data)) {
        setCart(cartData.data);
      } else {
        setCart([]);
      }
    }
    fetchData();
  }, [userId]);

const handleQuantityChange = async (
  cartId: string,
  productId: string,
  type: "inc" | "dec"
) => {
  const updatedCart = cart.map((c) => {
    if (c.id === cartId) {
      return {
        ...c,
        items: c.items.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity:
                  type === "inc"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
                total:
                  (type === "inc"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1)) * item.product.price,
              }
            : item
        ),
      };
    }
    return c;
  });
  setCart(updatedCart);

  const updatedItem = updatedCart
    .find((c) => c.id === cartId)
    ?.items.find((i) => i.product.id === productId);

  if (!updatedItem) return;

  await fetch(`http://localhost:3222/cart/${cartId}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: updatedItem.quantity }),
  });
};


const handleRemove = async (cartId: string, productId: string) => {
  setCart((prev) =>
    prev.map((c) =>
      c.id === cartId
        ? { ...c, items: c.items.filter((i) => i.product.id !== productId) }
        : c
    )
  );

  await fetch(`http://localhost:3222/cartitem/${cartId}/${productId}`, {
    method: "DELETE",
  });
};



const subtotal = cart?.reduce(
  (sum, c) => sum + (c.items?.reduce((s, i) => s + i.total, 0) ?? 0),
  0
) ?? 0;



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
                    <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b pb-3">
                    <span className="text-gray-700">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-sky-700">
                    <span>Total</span>
                    <span>Rp {subtotal.toLocaleString()}</span>
                  </div>
                </div>
                {cart?.length > 0 && (
                  <PayButton cartId={cart[0].id} />
                )}
              </div>
              <button className="mt-6 flex items-center gap-2 text-lg font-bold text-black">
                <ArrowLeft size={20} /> Back
              </button>
            </div>

            {/* RIGHT - Cart Items */}
            <div className="p-6 bg-white rounded-xl shadow-sm flex flex-col">
              <div className="space-y-4 flex-1">
                {cart.length > 0 ? (
                  cart.flatMap((c) =>
                    (c.items || []).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-gray-100 rounded-xl p-4"
                      >
                        <div className="flex items-center gap-4">
                          {item.product.images?.[0] && (
                            <Image
                              src={`http://localhost:3222${item.product.images[0]?.url}`}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="font-bold underline">{item.product.name}</h3>
                            <p className="text-sm text-gray-500">
                              Rp {item.product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white">
                          <div className="flex items-center border rounded-lg">
                            <button
                              className="px-2 py-1"
                              onClick={() => handleQuantityChange(c.id, item.product.id, "dec")}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              className="px-2 py-1"
                              onClick={() => handleQuantityChange(c.id, item.product.id, "inc")}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold">
                            Rp {(item.total).toLocaleString()}
                          </span>
                          <button
                            onClick={() => handleRemove(c.id, item.product.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <p className="text-center text-gray-500">Cart kosong</p>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
