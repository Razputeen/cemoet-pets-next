"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../image/Component50.png";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar/page";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import be from "zod/v4/locales/be.cjs";
import { useRouter } from "next/navigation";
import jwtDecode from 'jwt-decode';
// Setup Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});



export default function ProductListPage() {
  const [product, setProduct] = useState<products[]>([])
  const [user, setUser] = useState<user | null>(null)
  const router = useRouter()
  type products = {
    id: number;
    name: string;
    price: string;
    images: { id: number; url: string }[];
    stock: number;
    description: string;
    specification: string;
    brand: string;
    category: string;
    weight: number;
    cart: cart;
  };

  type user = {
    sub: string;
    Name: string;
    email: string;
    roles: string;
  };

  type cart = {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
  }

      useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/Login");
        return;
      }
  
      fetch("http://localhost:3222/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          router.push("/Login");
        });
    }, []);

    useEffect(() => {
      fetch('http://localhost:3222/product',{
        method: 'GET',
        cache: 'no-store'
      } )
        .then(res => res.json())
        .then(json => {
          console.log("DATA DARI SERVER:", json)
          setProduct(json.rows || json) // fallback jika rows tidak ada
        })
        .catch(err => console.error('Error fetching product:', err))
    }, [])


// const handleAddToCart = async () => {
//   const token = localStorage.getItem("token");
//   const userId = user; // atau field lain sesuai JWT-mu

//   await fetch('http://localhost:3222/cart/add', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       productId: 1,
//       quantity: 1,
//       userId: userId
//     }),
//   });
// };

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("User not found!");
      return;
    }
    const body = {
      productId: product[0].id,
      quantity: 1,
      userIds: user.sub,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3222/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }
      alert("Product added to cart successfully!");
      // router.push(`/product/cart/${user.sub}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while booking");
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.log("Body to be sent:", body);
    }
  };


  return (
    <>
      <Navbar />
      <main
        className={` ${poppins.variable} min-h-screen bg-white flex flex-col font-sans`}
      >
        {/* Hero Section */}
        <section className="rounded-xl mx-8 my-6 overflow-hidden">
          <Image
            src={Header}
            alt="Yummy Treats Banner"
            width={1400}
            height={250}
            className="w-full object-cover"
          />
        </section>

        {/* Filter Bar */}
        <section className="flex flex-wrap gap-2 px-8 mb-8">
          {["Cat Toys", "Price", "Review", "Color", "Material", "Offer"].map(
            (filter) => (
              <a
                key={filter}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm"
              >
                {filter} ▼
              </a>
            )
          )}
        </section>

        {/* Product Grid */}
        {/* Product Grid */}
        {/* Product Card */}
      <div className="flex justify-center gap-4 overflow-x-auto px-4 p-2">
        {product.map((product) => (

          <div
            key={product.id}
            className="min-w-[250px] bg-white rounded-2xl shadow-md border-solid border-2 p-4 flex flex-col gap-3 relative"
          >
          <Link key={product.id} href={`/product/${product.id}`}>
            <img
              src={`http://localhost:3222${product?.images?.[0]?.url || "/fallback.jpg"}`}
              alt={product.name}
              className="rounded-xl object-cover w-full h-48"
            />
            
            <div className="flex flex-col gap-1">
              <h4 className="font-normal text-[#373737] text-md">
                {product.name}
              </h4>
              <h4 className="text-xs text-gray-400 uppercase">{product.weight}Kg  </h4>
              {/* <span className="text-xs text-gray-400 uppercase">{product.brand}</span> */}
              <p className="text-lg font-semibold text-[#373737]">{product.price}</p>
            </div>

            </Link>
            <button onClick={handleAddToCart} className="absolute bottom-4 right-4 bg-[#373737] text-white rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition">
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>

        ))}
      </div>
        {/* Pagination */}
        <div className="flex justify-center gap-2 mb-12">
          <button className="px-3 py-1 border border-gray-300 rounded">
            Prev
          </button>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border ${
                page === 1
                  ? "bg-purple-200 border-purple-400"
                  : "border-gray-300"
              } rounded`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 border border-gray-300 rounded">
            Next
          </button>
        </div>
      </main>
    </>
  );
}
