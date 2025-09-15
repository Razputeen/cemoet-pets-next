import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdsCarousel() {
  const [ads, setAds] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3222/ads")
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setAds([]);
      });
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [ads]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-auto w-auto bg-gray-800 rounded-2xl">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null;
  }

  return (
    <div className="relative h-auto w-auto rounded-2xl text-white overflow-hidden">
      {ads.map((ad, i) => (
        <Image
          key={ad.id}
          src={`http://localhost:3222${ad.imageUrl}`}
          alt={`Ad ${i}`}
          fill
          className={`absolute object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}