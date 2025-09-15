"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Navbar from "#/app/components/Navbar/page";
import { useRouter } from "next/navigation";
import PayButtonOne from "#/app/components/checkoutone/page";

// Font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Type Definitions
type Product = {
  id: string;
  name: string;
  price: number;
  images: { id: number; url: string }[];
  stock?: number;
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

type Review = {
  id: string;
  rating: number;
  comment: string;
  user: { Name: string };
  createdAt: string;
};

// Component
export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<{ avgRating: number; reviewCount: number } | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const productId = params?.id;

  // --- Data Fetching Hooks ---
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
  }, [router]);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    fetch(`http://localhost:3222/product/${productId}`, {
      method: "GET",
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        const data = await res.json();
        setProduct(data);
        if (data?.images?.length > 0) {
          setSelectedImage(`http://localhost:3222${data.images[0].url}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    fetch(`http://localhost:3222/review/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(Array.isArray(data) ? data : data?.reviews || []);
      });

    fetch(`http://localhost:3222/review/${productId}/summary`)
      .then((res) => res.json())
      .then(setSummary);
  }, [productId]);

  // --- Handlers ---
  const handleAddToCart = async () => {
    if (!product || !user) return;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3222/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.sub,
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      alert("Product added to cart!");
    } catch (err: any) {
      alert(`Failed to add to cart: ${err.message}`);
    }
  };

  const handleAddReview = async () => {
    if (!user) {
      alert("You must be logged in to leave a review.");
      return;
    }
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:3222/review/${productId}/${user.sub}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });

    if (!res.ok) {
      alert("Failed to submit review.");
      return;
    }

    const data = await res.json();
    setReviews([data, ...reviews]);
    setComment("");
    setRating(5);
  };

  // --- Helper Functions ---
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  // --- Loading & Error States ---
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-600 animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 text-red-600">
        <p>Failed to load product: {error}</p>
      </div>
    );
  }

  return (
    <div className={`${poppins.className} bg-gray-50 min-h-screen`}>
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-4 space-y-12">
        {/* Back Button */}
        <Link
          href="/ProductListPage"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Products
        </Link>

        {/* Product Details Grid */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col items-center">
            <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden mb-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
              <Image
                src={selectedImage || "http://localhost:3222/fallback.jpg"}
                alt={product?.name || "Product"}
                layout="fill"
                objectFit="cover"
              />
            </div>
            {/* Thumbnail Gallery */}
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {product?.images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(`http://localhost:3222${image.url}`)}
                  className={`relative w-24 h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                    selectedImage === `http://localhost:3222${image.url}` ? "border-blue-500 ring-4 ring-blue-200" : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <Image
                    src={`http://localhost:3222${image.url}`}
                    alt={`Thumbnail ${image.id}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">{product?.name}</h1>
            <div className="flex items-center gap-2">
              {renderStars(summary?.avgRating ?? 0)}
              <span className="text-sm text-gray-500">
                ({summary?.reviewCount ?? 0} reviews)
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-800">
              {formatRupiah(product?.price || 0)}
            </p>
            <div className="text-base text-gray-600 space-y-1">
              <p>
                <span className="font-semibold text-gray-800">Brand:</span> {product?.brand}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Category:</span> {product?.category}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Weight:</span> {product?.weight} Kg
              </p>
              <p>
                <span className="font-semibold text-gray-800">Status:</span>{" "}
                {/* <span className={`font-semibold ${product?.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {product?.stock > 0 ? "In Stock" : "Out of Stock"}
                </span> */}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product?.stock === 0}
                className="w-full bg-[#286699] hover:bg-[#194E7A] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
              {product && <PayButtonOne productId={product.id} />}
            </div>
          </div>
        </section>

        {/* Description & Specification */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <h2 className="font-bold text-2xl text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product?.description || "No description available."}
              </p>
            </div>
            <div>
              <h2 className="font-bold text-2xl text-gray-900 mb-4">Specifications</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product?.specification || "No specifications listed."}
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <h2 className="font-bold text-2xl text-gray-900 mb-6">Customer Reviews</h2>

          {/* Review Summary */}
          {summary && (
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl font-bold text-yellow-500">
                {Number(summary.avgRating || 0).toFixed(1)}
              </div>
              <div className="flex flex-col">
                {renderStars(Math.round(summary.avgRating || 0))}
                <span className="text-sm text-gray-600">
                  Based on {summary.reviewCount || 0} reviews
                </span>
              </div>
            </div>
          )}

          {/* New Review Form */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Write a Review</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddReview(); }} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-gray-700">Your Rating:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-y"
                rows={4}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-800">{r.user?.Name || "Anonymous"}</div>
                    <div className="flex items-center text-sm text-gray-500">
                      {renderStars(r.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 mt-2">{r.comment}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(r.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">There are no reviews yet. Be the first!</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-xl rounded-t-2xl p-14 mt-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 text-gray-800 space-y-2">
            <h1 className="text-3xl font-bold">Cemoet Pets</h1>
            <p className="font-semibold">PT. Dignitas Akademi</p>
            <p className="text-sm">Jl. Bungur Raya No.20, Kukusan, Depok</p>
            <p className="text-sm max-w-sm">
              Pusat Kebutuhan Hewan Peliharaan Terlengkap, Terbesar, & Terpercaya No. 1
            </p>
          </div>

          <div className="flex-1 md:text-right flex flex-col md:items-end gap-3">
            <div className="flex flex-wrap justify-end gap-6 font-semibold">
              <a href="#" className="hover:underline text-gray-800 transition-colors">Home</a>
              <a href="#" className="hover:underline text-gray-800 transition-colors">Products</a>
              <a href="#" className="hover:underline text-gray-800 transition-colors">Doctors</a>
              <a href="#" className="hover:underline text-gray-800 transition-colors">Grooming</a>
              <a href="#" className="hover:underline text-gray-800 transition-colors">Hotel</a>
            </div>
            <p className="text-xs text-gray-600 max-w-sm md:text-right mt-2">
              ©2025 Cemoet Corporation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}