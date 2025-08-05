"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Leaf, ShoppingBag, Stethoscope } from "lucide-react";
import dawgHero from "../image/dawg.png";
import proplan from "../image/proplan.png";
import CAds from "../image/ComponentAds1.png";
import { Poppins } from "next/font/google";

// Setup Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export default function BodyHome() {
  type Product = {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
    reviews: number;
    discount: string;
    badge: string;
  };

  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3222/product", {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("DATA DARI SERVER:", json);
        setData(json.rows || json);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, []);

  const products = [
    {
      id: 1,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 4,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 5,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
  ];

  return (
    <div
      className={`${poppins.variable} font-sans min-h-screen bg-[#f2f2f2] py-16 px-4`}
    >
      <div className="max-w-screen-xl mx-auto bg-white rounded-3xl shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome To Cemoet Pets</h1>
          <p className="text-gray-700">Hello, Antoni Erwin</p>
        </div>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 relative bg-[#3D6C88] rounded-xl text-white p-6 overflow-hidden flex flex-col justify-center">
            <div className="z-10">
              <h2 className="text-4xl font-bold leading-tight">
                Your
                <br />
                Everything
                <br />
                Pet Needs
              </h2>
              <p className="text-sm mt-4 max-w-sm">
                Premium quality food, toys, and accessories for your furry
                friends. Because they deserve the best!
              </p>
            </div>
            <Image
              src={dawgHero}
              alt="Hero Dog"
              width={150}
              height={200}
              className="absolute bottom-0 right-4 z-0"
            />
          </div>

          <div className="bg-[#1AB1A3] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get 10% Discount</h3>
              <p className="text-sm">
                Only for our Pro Plan dry foods and our wet ones
              </p>
            </div>
            <div className="mt-4">
              <Image
                src={proplan}
                alt="ProPlan Promo"
                width={200}
                height={120}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <ShoppingBag className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Premium Products</h4>
            <p className="text-sm mt-1 text-gray-600">
              Only the highest quality food, toys, and accessories for your
              furry friends.
            </p>
          </div>

          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <Stethoscope className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Expert Veterinarians</h4>
            <p className="text-sm mt-1 text-gray-600">
              Our certified vets provide compassionate care for all your pet's
              health needs.
            </p>
          </div>

          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <Leaf className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Luxury Grooming</h4>
            <p className="text-sm mt-1 text-gray-600">
              Pamper your pet with our premium grooming services that leave them
              looking and feeling great.
            </p>
          </div>
        </div>

        <div className="pt-24 max-w-screen-xl mx-auto">
          <Image
            src={CAds}
            alt="header"
            height={120}
            className="w-full rounded-xl"
          />
        </div>

        <Link
          href="/ProductListPage"
          className="flex items-center text-black font-bold text-xl mb-4 pl-28 no-underline"
        >
          View All Product <ArrowRight className="ml-2" />
        </Link>

        {/* Product Card */}
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="w-[200px] bg-white rounded-xl shadow hover:shadow-lg p-4 text-center transition cursor-pointer no-underline text-inherit"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                className="mx-auto mb-3 rounded-lg"
              />
              <h4 className="font-bold">{product.name}</h4>
              <p className="text-lg font-semibold mt-1">{product.price}</p>
              <p className="text-xs text-gray-500 mt-1">{product.badge}</p>
              <div className="mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Buy Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
