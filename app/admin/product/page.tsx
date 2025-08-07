"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, ChevronLeft, ChevronRight } from "lucide-react";
import SidebarAdmin from "#/app/components/sidebar/page";
import { CardContent } from "#/components/ui/card";
import { Card } from "antd";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: "";
  totalPrice: number;
};

export default function AdminProductList() {
  const [productMng, setProduct] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3222/product_management")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProduct(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  const totalPages = Math.ceil(productMng.length / itemsPerPage);
  const paginatedData = productMng.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNavigateToCreate = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/admin/product/create");
    }, 800); // simulasi delay untuk efek loading
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Main Page */}
      <div className="max-w-screen-2xl mx-auto bg-[#f2f2f2] p-4 py-9">
        <div className="min-h-screen bg-white px-4 rounded-3xl shadow-md p-4 flex flex-col md:flex-row gap-2">
          <SidebarAdmin />

          <div className="flex-1 max-w-screen mx-auto bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold bg-slate-100 p-2 rounded-lg">
                Product Management
              </h2>
              <button
                onClick={handleNavigateToCreate}
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
                  <p className="text-gray-500">Total Penjualan</p>
                  <p className="text-2xl font-bold">{productMng.length}</p>
                </CardContent>
              </Card>

              <Card className="rounded-lg bg-gray-100">
                <CardContent className="p-4">
                  <p className="text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">
                    $
                    {productMng.reduce(
                      (sum, g) => sum + (g.totalPrice || 0),
                      0
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <div className="bg-white rounded shadow overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2">Foto Produk</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Deskripsi</th>
                    <th className="px-4 py-2">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-4 py-2 text-blue-600 font-medium">
                        {product.image}
                      </td>
                      <td className="px-4 py-2 font-semibold">
                        {product.name}
                      </td>
                      <td className="px-4 py-2">${product.totalPrice}</td>
                      <td className="px-4 py-2">
                        <Link
                          href={`/admin/product/${product.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                      <td className="px-4 py-2">{product.price}</td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-4 text-gray-500"
                      >
                        Tidak ada data.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 border rounded disabled:opacity-50"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
