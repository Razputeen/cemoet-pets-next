"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { parse } from "path";

export default function AdminProductCreate() {
  const [product, setProduct] = useState<{
    name: string;
    price: number;
    description: string;
    specification: string;
    stock: number;
    image: File[];
    brand: string;
    category: string;
    weight: number;
  }>({
    name: "",
    price: 0,
    description: "",
    specification: "",
    stock: 0,
    image: [],
    brand: "",
    category: "",
    weight: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", String(product.price)); // number -> string
    formData.append("description", product.description);
    formData.append("specification", product.specification);
    formData.append("stock", String(product.stock)); // number -> string
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("weight", String(product.weight)); // number -> string

    product.image.forEach((img) => {
      formData.append("images", img); // langsung append File
    });

    try {
      const res = await fetch("http://localhost:3222/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Produk berhasil ditambahkan");
        router.push("/admin/product");
      } else {
        alert(data.message || "Gagal menambahkan produk");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.back();
    }, 600);
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8 relative">
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
            placeholder="Nama Brand"
            className="w-full border p-2 rounded"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Nama Product"
            className="w-full border p-2 rounded"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Kategori"
            className="w-full border p-2 rounded"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            required
          />

          <input
            type="text"
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
            placeholder="Stock"
            className="w-full border p-2 rounded"
            onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
            required
          />

          <input
            type="number"
            placeholder="Harga"
            className="w-full border p-2 rounded"
            onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
            required
          />

          <input
            type="number"
            placeholder="Berat (gram)"
            className="w-full border p-2 rounded"
            onChange={(e) => setProduct({ ...product, weight: parseInt(e.target.value) })}
            required
          />

          <input
            type="file"
            accept="image/*"
            multiple
            className="w-full border p-2 rounded"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              setProduct({ ...product, image: [...product.image, ...files] });
            }}
            required
          />


          <textarea
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
