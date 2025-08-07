"use client";
import Navbar from "../components/Navbar/page";
import Image from "next/image";
import Link from "next/link";
import Header from "../image/Component50.png";
import { Poppins } from "next/font/google";
// Setup Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

export const products = [
  {
    id: 1,
    name: "Whiskas",
    price: "Rp 20.000",
    image: "/image/W1.jpg",
    rating: 4.8,
    reviews: 234,

    stock: 12,
    badge: "Best Seller",
    description: "Wiskas kontol",
  },
  {
    id: 2,
    name: "Royal Canin",
    price: "Rp 50.000",
    image: "/image/rc1.jpg",
    rating: 4.8,
    reviews: 234,
    stock: 12,
    badge: "Best Seller",
    description: "Royal canin kontol",
  },
  {
    id: 3,
    name: "Pedigree",
    price: "Rp 35.000",
    image: "/image/p1.jpg",
    rating: 4.8,
    reviews: 234,
    stock: 12,
    badge: "Best Seller",
    description: "",
  },
];

export default function ProductListPage() {
  type products = {
    id: number;
    name: string;
    price: string;
    image: string;
    rating: number;
    reviews: number;
    discount: string;
    badge: string;
  };
  return (
    <>
      <div className={poppins.className}>
        <Navbar />
        <main
          className={`${poppins.className} min-h-screen bg-white flex flex-col font-sans`}
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

          {/* Product Grid */}
          {/* Product Grid */}
          {products.map((products) => (
            <Link
              key={products.id}
              href={`/ProductDetail/${products.id}`}
              className="decoration-none"
            >
              <section className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                <div
                  key={products.id}
                  className="border border-gray-200 rounded-lg p-4 text-center hover:shadow transition"
                >
                  <Image
                    src={products.image}
                    alt={products.name}
                    width={150}
                    height={150}
                    className="mx-auto mb-2"
                  />
                  <h3 className="font-semibold mb-1">{products.name}</h3>
                  <p className="text-gray-600 mb-4">{products.price}</p>
                  <div className="flex justify-center space-x-2">
                    <button className="bg-sky-600 text-white px-4 py-2 rounded-full w-full">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </section>
            </Link>
          ))}
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
      </div>
    </>
  );
}
