"use client";

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../image/Component50.png";
import Navbar from "../components/Navbar/page";
import { Input } from "antd";

// Setup Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Define types
type Product = {
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
};

type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
};

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();

  // ✅ Fetch user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:3222/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        localStorage.removeItem("token");
        router.push("/Login");
      }
    };
    fetchUserProfile();
  }, [router]);

  // ✅ Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3222/product", {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const json = await res.json();
        setProducts(json.rows || json);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Add to Cart
  const handleAddToCart = async (productId: number) => {
    if (!user) {
      alert("Please log in first.");
      router.push("/Login");
      return;
    }

    const body = { productId, quantity: 1, userIds: user.sub };

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
      if (!res.ok) throw new Error("Failed to add to cart");
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong while adding the product.");
    }
  };

  // ✅ Filter + Pagination
  const filteredProducts = products.filter(
    (h) =>
      h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ✅ Reset ke page 1 kalau search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <main
        className={`${poppins.variable} min-h-screen bg-gray-50 flex flex-col font-sans`}
      >
        {/* Hero */}
        <section className="mx-4 md:mx-8 my-6 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={Header}
            alt="Yummy Treats Banner"
            width={1400}
            height={250}
            className="w-full h-40 md:h-64 object-cover"
          />
        </section>

        {/* Search */}
        <div className="px-4 md:px-8 mb-6">
          <Input
            placeholder="Search product by name, brand, or category..."
            className="w-full md:w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Grid */}
        <div className="px-4 md:px-8 pb-12">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-4 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${poppins.className}`}>
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
                >
                  {/* Product Link */}
                  <Link href={`/product/${product.id}`} passHref>
                    <div className="relative w-full h-48 cursor-pointer">
                      <Image
                        src={`http://localhost:3222${product.images?.[0]?.url || "/fallback.jpg"}`}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {product.name}
                      </h4>
                      <h4 className="text-sm text-gray-500 uppercase font-medium">
                        {product.weight} Kg
                      </h4>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xl font-bold text-gray-800">
                          {product.price}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full mt-2 bg-[#3A3A3A] text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-700 hover:scale-105"
                    >
                      Add to Cart
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mb-12">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                page === currentPage
                  ? "bg-gray-800 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
