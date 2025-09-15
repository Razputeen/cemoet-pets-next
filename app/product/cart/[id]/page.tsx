"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "#/app/components/Navbar/page";
import { useParams } from "next/navigation";
import PayButton from "#/app/components/checkout/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define data types
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

type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
  cart: Cart[];
};

export default function CartPage() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [user, setUser] = useState<User>();
  const params = useParams();
  const userId = params?.id as string;
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        // Redirect to login or guest page if userId is not available
        return;
      }

      try {
        const userRes = await fetch(`http://localhost:3222/users/${userId}`);
        const userData = await userRes.json();
        setUser(userData.data);
        console.log("User data:", userData.data);

        const cartRes = await fetch(`http://localhost:3222/cart/user/${userId}`);
        const cartData = await cartRes.json();

        if (Array.isArray(cartData)) {
          setCart(cartData);
        } else if (Array.isArray(cartData.data)) {
          setCart(cartData.data);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
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
          items: c.items.map((item) => {
            if (item.product.id === productId) {
              const newQuantity = type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
              const newTotal = newQuantity * item.product.price;
              return { ...item, quantity: newQuantity, total: newTotal };
            }
            return item;
          }),
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

  const subtotal =
    cart?.reduce(
      (sum, c) => sum + (c.items?.reduce((s, i) => s + i.total, 0) ?? 0),
      0
    ) ?? 0;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 md:p-12">
        <div className="max-w-screen-xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* LEFT - Summary & Checkout */}
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-2xl p-8 shadow-sm h-fit sticky top-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center text-lg text-gray-700 mb-3">
                <span>Subtotal</span>
                <span className="font-semibold">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-lg text-gray-700 mb-6 border-b border-gray-200 pb-6">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-gray-900 mb-8">
                <span>Total</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              
              {cart?.length > 0 && (
                <div className="w-full">
                  <PayButton cartId={cart[0].id} />
                </div>
              )}

              <Link href="/" className="mt-6 flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft size={18} />
                <span className="font-medium">Continue Shopping</span>
              </Link>
            </div>

            {/* RIGHT - Cart Items */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">My Cart</h2>
              <div className="space-y-6">
                {cart.length > 0 && cart[0]?.items?.length > 0 ? (
                  cart.flatMap((c) =>
                    (c.items || []).map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-center gap-6 w-full sm:w-auto">
                          {item.product.images?.[0] && (
                            <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                              <Image
                                src={`http://localhost:3222${item.product.images[0].url}`}
                                alt={item.product.name}
                                layout="fill"
                                objectFit="cover"
                              />
                            </div>
                          )}
                          <div className="flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Rp {item.product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-4">
                          <div className="flex items-center border border-gray-300 rounded-full bg-white text-gray-800">
                            <button
                              className="p-2 transition-colors duration-200 hover:bg-gray-200 rounded-full"
                              onClick={() => handleQuantityChange(c.id, item.product.id, "dec")}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                            <button
                              className="p-2 transition-colors duration-200 hover:bg-gray-200 rounded-full"
                              onClick={() => handleQuantityChange(c.id, item.product.id, "inc")}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="font-bold text-gray-800 text-lg flex-shrink-0">
                            Rp {(item.total).toLocaleString('id-ID')}
                          </span>
                          <button
                            onClick={() => handleRemove(c.id, item.product.id)}
                            className="text-gray-400 hover:text-red-500 ml-4 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-2xl">
                    <p className="text-lg font-semibold">Your cart is empty.</p>
                    <p className="mt-2 text-sm">Looks like you haven't added anything yet. Start shopping now!</p>
                    <Link href="/" className="mt-4 inline-flex items-center text-sky-600 hover:text-sky-800 transition-colors font-medium">
                      <ArrowLeft size={16} className="mr-2" />
                      Go to Homepage
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}