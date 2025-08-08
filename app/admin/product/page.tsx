"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card } from "antd";

type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  description: string;
  image: "";
  totalPrice: number;
  stock: number;
};

export default function AdminProductList() {
  const [productMng, setProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3222/product")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProduct(data);
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Hitung total halaman
  const totalPages = Math.ceil(productMng.length / itemsPerPage);

  // Ambil data sesuai halaman
  const currentData = productMng.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9">
        <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
          <SidebarAdmin />

          <div className="flex-1 max-w-screen mx-auto bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold bg-slate-100 p-2 rounded-lg">
                Product Management
              </h2>
              <button
                onClick={() => setIsLoading(true)}
                disabled={isLoading}
                className="relative"
              >
                <PlusIcon className="w-6 h-6 text-blue-600 hover:text-blue-800 cursor-pointer" />
              </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="rounded-lg bg-gray-100">
                <CardContent className="p-4">
                  <p className="text-gray-500">Total Produk</p>
                  <p className="text-2xl font-bold">{productMng.length}</p>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto mb-6">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">Brand</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-4 py-2 font-semibold">
                        {product.brand}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-4 py-2">{product.price}</td>
                      <td className="px-4 py-2">{product.description}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            {/* Jika tidak ada data */}
            {productMng.length === 0 && (
              <p className="text-center py-4 text-gray-500">Tidak ada data.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
