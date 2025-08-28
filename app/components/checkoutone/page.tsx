"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PayButtonOne({ productId }: { productId: string }) {
  useEffect(() => {
    // inject Snap.js
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePay = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3222/product/checkout/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!window.snap) {
      alert("Snap belum siap, coba lagi!");
      return;
    }

    window.snap.pay(data.token, {
      onSuccess: (result: any) => console.log("✅ Success:", result),
      onPending: (result: any) => console.log("⏳ Pending:", result),
      onError: (result: any) => console.error("❌ Error:", result),
      onClose: () => console.log("❎ Customer closed the popup"),
    });
  };

  return (
    <button
      onClick={handlePay}
      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition text-base font-medium"
    >
      Bayar Sekarang
    </button>
  );
}
