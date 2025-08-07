"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductCreate() {
  const [product, setProduct] = useState<{
    name: string;
    price: string;
    description: string;
    specification: string;
    stock: string;
    image: File | null;
  }>({
    name: "",
    price: "",
    description: "",
    specification: "",
    stock: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("specification", product.specification);
    formData.append("stock", product.stock);
    if (product.image) {
      formData.append("image", product.image);
    }

    const res = await fetch("http://localhost:3222/product", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("Register berhasil");
      router.push("/admin/product");
    } else {
      alert(data.message || "Gagal register");
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.back();
    }, 600); // animasi delay
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Form Content */}
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8 relative">
        {/* Tombol Back */}
        <button
          onClick={handleBack}
          className="absolute top-0 left-0 mt-4 ml-4 text-blue-600 hover:underline"
          disabled={isLoading}
        >
          ← Kembali
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          Tambah Produk Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="product"
            placeholder="Nama Product"
            className="w-full border p-2 rounded"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
          <input
            type="text"
            name="specification"
            placeholder="Spesifikasi"
            className="w-full border p-2 rounded"
            value={product.specification}
            onChange={(e) =>
              setProduct({ ...product, specification: e.target.value })
            }
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full border p-2 rounded"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            required
          />
          <input
            type="text"
            name="price"
            placeholder="Harga"
            className="w-full border p-2 rounded"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            required
          />
          <label className="block text-sm text-gray-600 mb-1">
            Foto Produk
          </label>
          <input
            type="file"
            name="image"
            className="w-full border p-2 rounded"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setProduct({ ...product, image: file });
              }
            }}
            required
          />
          <textarea
            name="description"
            placeholder="Deskripsi"
            className="w-full border p-2 rounded"
            rows={4}
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            required
          ></textarea>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
