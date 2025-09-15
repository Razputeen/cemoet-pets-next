"use client";
import { useEffect, useState } from "react";

export default function ReviewSection({ productId, userId }: { productId: string; userId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(5);

  // Ambil review + summary
  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${productId}`)
      .then((res) => res.json())
      .then(setReviews);

    fetch(`http://localhost:3000/reviews/${productId}/summary`)
      .then((res) => res.json())
      .then(setSummary);
  }, [productId]);

  // Kirim review baru
  const handleAddReview = async () => {
    const res = await fetch(`http://localhost:3000/reviews/${productId}/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment: input }),
    });

    const data = await res.json();
    setReviews([data, ...reviews]); // update state
    setInput("");
    setRating(5);
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2">Reviews</h2>

      {summary && (
        <div className="mb-4">
          ⭐ {parseFloat(summary.avgRating).toFixed(1)} dari {summary.reviewCount} review
        </div>
      )}

      {/* Form review */}
      <div className="flex flex-col gap-2 mb-3">
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border px-2 py-1 rounded">
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r} ⭐</option>
          ))}
        </select>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis review..."
          className="border rounded px-2 py-1"
        />
        <button onClick={handleAddReview} className="bg-blue-500 text-white px-3 py-1 rounded">
          Kirim
        </button>
      </div>

      {/* List review */}
      <ul className="space-y-2">
        {reviews.map((r, i) => (
          <li key={i} className="border p-2 rounded">
            <div className="font-bold">{r.user?.name || "Anon"}</div>
            <div>⭐ {r.rating}</div>
            <p>{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
