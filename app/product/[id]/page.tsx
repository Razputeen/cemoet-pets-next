"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Poppins } from "next/font/google";
import Navbar from "#/app/components/Navbar/page";
import { useRouter } from "next/navigation";

// Font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
});

// Tipe Produk
type Product = {
  id: string;
  name: string;
  price: number;
  images: { id: number; url: string }[];
  stock: number;
  description: string;
  specification: string;
  brand: string;
  category: string;
  weight: number;
};
// Tipe User
type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string;
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const productId = params?.id;

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
    if (!productId) return;
    fetch(`http://localhost:3222/product/${productId}`, {
      method: "GET",
      cache: "no-store",
    })
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);

        const data = JSON.parse(text);
        setProduct(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

const handleAddToCart = async () => {
  if (!product || !user) return;

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3222/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: user.sub,   // ✅ tambahin userId
        productId: product.id,
        quantity: 1,
      }),
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Product added to cart!");
    router.push(`/product/cart/${user.sub}`);
  } catch (err: any) {
    alert(`Failed: ${err.message}`);
  }
};




  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p>Failed to load product: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className={`${poppins.variable} font-sans min-h-screen bg-[#f2f2f2] py-8 px-4`}>
        {/* Back Link */}
        <div className="max-w-6xl mx-auto mb-6">
          <Link
            href="/ProductListPage"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
        </div>

        {/* Product Info */}
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gambar */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto overflow-hidden">
                <Image
                  src={`http://localhost:3222${product?.images?.[0]?.url || "/fallback.jpg"}`}
                  alt={product?.name || "Product"}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info Produk */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">{product?.name}</h1>

                <div className="space-y-2 border-t border-gray-100 pt-6">
                  <span className="text-3xl font-semibold text-gray-700">
                    {formatRupiah(product?.price || 0)}
                  </span>
                  <p className="text-sm text-green-600 font-medium">
                    Stok: {product?.stock}
                  </p>
                </div>

                {/* Tombol Aksi */}
                <div className="space-y-4 border-t border-gray-100 pt-6">
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 text-base font-medium"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition text-base font-medium">
                      Buy Now
                    </button>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Wishlist</span>
                    </button>
                    <button className="flex-1 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="font-semibold mb-3 text-lg text-gray-900">Specification</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product?.specification}
            </p>
            <h3 className="font-semibold mb-3 text-lg text-gray-900">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product?.description}
            </p>
          </div>
                {/* Footer */}
      <footer className="bg-white shadow-xl rounded-2xl p-14 mt-40 max-w-7xl mx-auto pb-36">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 text-[#373737] space-y-2">
            <h1 className="text-3xl font-bold text-[#373737]">Cemoet Pets</h1>
            <p className="font-semibold">PT. Dignitas Akademi</p>
            <p className="text-sm">Jl. Bungur Raya No.20, Kukusan, Depok</p>
            <p className="text-sm">
              Pusat Kebutuhan Hewan Peliharaan Terlengkap, Terbesar, & Terpercaya No. 1
            </p>
          </div>

          <div className="flex-1 text-right flex flex-col items-end gap-3">
            <div className="flex gap-6 font-semibold">
              <a href="#" className="hover:underline text-[#373737]">Home</a>
              <a href="#" className="hover:underline text-[#373737]">Products</a>
              <a href="#" className="hover:underline text-[#373737]">Doctors</a>
              <a href="#" className="hover:underline text-[#373737]">Grooming</a>
              <a href="#" className="hover:underline text-[#373737]">Hotel</a>
            </div>
            <p className="text-xs text-gray-600 max-w-sm text-right mt-2">
              ©2025 Cemoet Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
        </div>
        
      </div>


    </>
  );
}
