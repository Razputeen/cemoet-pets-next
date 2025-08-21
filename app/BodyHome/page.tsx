'use client';

import Image from "next/image";
import { use } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, Package, ReceiptText, ShoppingBag, ShoppingCart, Stethoscope, User, BookText } from "lucide-react";
import dawgHero from "../image/dawg.png";
import proplan from "../image/proplan.png";
import CAds from "../image/ComponentAds1.png";
import CAds1 from "../image/AdsH.png";
import CAds2 from "../image/Ads2.png";
import CAds3 from "../image/Ads3.png";
import doc from '../image/Doc1.png'
import docc from '../image/Cemow.jpg'
import dawg1 from '../image/Dawg1.jpg'
import dawg2 from '../image/Dawg2.jpg'
import dawg3 from '../image/Dawg3.jpg'
import dawg4 from '../image/Dawg4.jpg'
import { useRouter } from 'next/navigation';
import router from "next/router";
import ReservationDropdown from "../components/dropres/page";

const images = [doc, dawgHero, docc]

export default function BodyHome() {

type Product = {
  id: number
  name: string
  price: number
}

type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string[];
};

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  email: string;
  noTelp: string;
  description: string;
}

type Grooming = {
  id: string;
  name: string;
  price: number;
  description: string;
  specification: string;
}

  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<Product[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [grooming, setGrooming] = useState<Grooming[]>([])
  const router = useRouter();

    useEffect(() => {
      fetch('http://localhost:3222/doctors',{
        method: 'GET',
        cache: 'no-store'
      } )
        .then(res => res.json())
        .then(json => {
          console.log("DATA DARI SERVER:", json)
          setDoctors(json.rows || json) // fallback jika rows tidak ada
        })
        .catch(err => console.error('Error fetching product:', err))
    }, [])

      useEffect(() => {
      fetch('http://localhost:3222/grooms',{
        method: 'GET',
        cache: 'no-store'
      } )
        .then(res => res.json())
        .then(json => {
          console.log("DATA DARI SERVER:", json)
          setGrooming(json.rows || json) // fallback jika rows tidak ada
        })
        .catch(err => console.error('Error fetching product:', err))
    }, [])

    useEffect(() => {
      fetch('http://localhost:3222/product',{
        method: 'GET',
        cache: 'no-store'
      } )
        .then(res => res.json())
        .then(json => {
          console.log("DATA DARI SERVER:", json)
          setData(json.rows || json) // fallback jika rows tidak ada
        })
        .catch(err => console.error('Error fetching product:', err))
    }, [])

    // pages/dashboard.tsx
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

  // Data produk contoh
  const products = [
    {
      id: 1,
      name: "Whiskas",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "NaviCat",
      price: "Rp 60.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 3,
      name: "Porplan",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
    {
      id: 4,
      name: "Golden",
      price: "Rp 20.000",
      image: "/image/W1.jpg",
      rating: 4.8,
      reviews: 234,
      discount: "31%",
      badge: "Best Seller",
    },
  ];
    const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Ganti gambar tiap 3 detik
    return () => clearInterval(interval)
  }, [])

return (
    <div className="min-h-screen bg-[#f2f2f2] py-16 px-4">
      <div className="max-w-screen-xl mx-auto bg-white rounded-3xl shadow-md p-6">

        {/* Header */}
        <div className="mb-6 flex justify-between">
          <div className="flex flex-col bg-slate-100 p-4 rounded-lg">
            <h1 className="text-2xl font-bold">Welcome To Cemoet Pets</h1>
            <p className="text-gray-700">{user?.Name}</p>
          </div>
          <div className="flex items-center space-x-4 pr-4">
            {/* Ikon 1: ReceiptText (Sesuai dengan kode yang Anda berikan) */}
              <div className="relative inline-block text-left">
                <button
                  className="flex items-center text-gray-600"
                  onClick={() => {
                    const dropdown = document.querySelector(".dropdown");
                    if (dropdown) {
                      dropdown.classList.toggle("hidden");
                    }
                  }}
                >
                  <BookText size={24} />
                </button>
                <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg hidden dropdown">
                  <div className="py-1 text-sm text-gray-700">
                    {user && (
                      <>
                        <Link
                          href={`/reservation/grooming/${user.sub}`}
                          className="block px-4 py-2"
                        >
                          Grooming
                        </Link>
                        <Link
                          href={`/reservation/klinik/${user.sub}`}
                          className="block px-4 py-2"
                        >
                          Klinik
                        </Link>
                        <Link
                          href={`/reservation/hotel/${user.sub}`}
                          className="block px-4 py-2"
                        >
                          Hotel
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {user && (
            <>
            <Link href="/product/order" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Package size={24} />
            </Link>
            <Link href={`/product/cart/${user.sub}`} className="text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart size={24} />
            </Link>
            <Link href="/user/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                <User size={24} />
            </Link>
            </>
            )};
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Left 2/3 */}
          <div className="lg:col-span-2 relative bg-[#3D6C88] rounded-xl text-white p-6 overflow-hidden flex flex-col justify-center">
            <div className="z-10">
              <h2 className="text-4xl font-bold leading-tight">
                Your<br />Everything<br />Pet Needs
              </h2>
              <p className="text-sm mt-4 max-w-sm">
                Premium quality food, toys, and accessories for your furry friends.
                Because they deserve the best!
              </p>
            </div>
            <Image
              src={dawgHero}// ganti dengan gambar anjing kamu
              alt="Hero Dog"
              width={150}
              height={200}
              className="absolute bottom-0 right-4 z-0"
            />
          </div>

          {/* Right 1/3 (Promo) */}
          <div className="bg-[#1AB1A3] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get 10% Discount</h3>
              <p className="text-sm">
                Only for our Pro Plan dry foods and our wet ones
              </p>
            </div>
            <div className="mt-4">
              <Image
                src={proplan} // Ganti ini juga sesuai
                alt="ProPlan Promo"
                width={200}
                height={120}
                className="mx-auto"
              />
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <ShoppingBag className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Premium Products</h4>
            <p className="text-sm mt-1 text-gray-600">
              Only the highest quality food, toys, and accessories for your furry friends.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <Stethoscope className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Expert Veterinarians</h4>
            <p className="text-sm mt-1 text-gray-600">
              Our certified vets provide compassionate care for all your pet’s health needs.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#E8F1FA] rounded-xl p-4 text-center">
            <Leaf className="mx-auto w-8 h-8 mb-2" />
            <h4 className="font-bold">Luxury Grooming</h4>
            <p className="text-sm mt-1 text-gray-600">
              Pamper your pet with our premium grooming services that leave them looking and feeling great.
            </p>
          </div>
        </div>
        {/* Ads 1 */}
        <div className="pt-24 r max-w-screen-xl mx-auto">
        <Image 
        src={CAds}
        alt='header'
        height={120}
        className='w-full rounded-xl'
        ></Image>,
        </div>
          <Link href="/product" className="flex items-center text-black font-bold  text-xl mb-4 pl-28 no-underline pt-6">
            View All Product <ArrowRight className="mr-2" /> 
          </Link>
        {/* Product Card */}
      <div className="flex justify-center gap-4 overflow-x-auto px-4 p-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] bg-white rounded-2xl shadow-md border-solid border-2 p-4 flex flex-col gap-3 relative"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl object-cover w-full h-48"
            />
            <div className="flex flex-col gap-1">
              <h4 className="font-normal text-[#373737] text-md">
                {product.name}
              </h4>
              {/* <span className="text-xs text-gray-400 uppercase">{product.brand}</span> */}
              <p className="text-lg font-semibold text-[#373737]">{product.price}</p>
            </div>
            <button className="absolute bottom-4 right-4 bg-black text-white rounded-full w-9 h-9 flex items-center justify-center hover:scale-105 transition">
              +
            </button>
          </div>
        ))}
      </div>
        
        {/* Ads 2 */}
        <div className="pt-24 r max-w-screen-xl mx-auto">
        <Image 
          src={CAds1}
          alt='header'
          height={120}
          className='w-full rounded-xl'
        ></Image>,
        </div>

        {/* Doctor */}
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden max-w-[1200px] mx-auto mt-10 h-[70vh]">
          {/* KIRI - List tetap sama seperti sebelumnya */}
          <div className="bg-[#96C6CF] w-full md:w-1/2 p-6 flex flex-col rounded-xl">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Doctor List</h2>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
              {doctors.map((doctor) => (
              <Link href={`/doctor/${doctor.id}`} key={doctor.id} className={"no-underline"}>
              <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow-md text-sm leading-tight">
                  <p className="font-semibold text-[#373737]">{doctor.name}</p>
                  <p className="font-bold text-[#373737]">{doctor.speciality}</p>
                </div>
              </Link>
              ))}
            </div>

              <Link href="/forms/clinic" className="flex text-[#373737] font-bold text-xl self-end no-underline pt-6">
                Book Now <ArrowRight className="mr-2" /> 
              </Link>
          </div>

          {/* KANAN - Gambar Auto Slider */}
          <div className="bg-[#7A99B7] w-full md:w-1/2 px-6 py-6 flex flex-col items-center justify-center rounded-xl">
            <h2 className="text-white text-3xl font-bold mb-6">Checkup Form</h2>

            {/* Gambar utama */}
            <Image
              src={images[currentIndex]}
              alt="Dokter"
              width={250}
              height={300}
              className="rounded-xl object-cover"
            />

            {/* Dots */}
            <div className="mt-4 flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-2 rounded-full ${
                    i === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

          {/* Ads 3 */}
        <div className="pt-24 r max-w-screen-xl mx-auto">
        <Image 
          src={CAds2}
          alt='header'
          height={120}
          className='w-full rounded-xl'
        ></Image>,
        </div>

        {/* Grooming */}
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 overflow-hidden">
          {/* LEFT - GRID GAMBAR */}
          <div className="bg-white w-full md:w-1/2 p-6 grid grid-cols-2 gap-4 place-items-center">
            <Image src={dawg1} alt="Grooming 1" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg2} alt="Grooming 2" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg3} alt="Grooming 3" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg4} alt="Grooming 4" className="rounded-2xl w-full h-auto object-cover" />
          </div>

          {/* RIGHT - CHECKUP FORM */}
          <div className="bg-[#D5F5B0] w-full md:w-1/2 p-6 flex flex-col rounded-xl">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Checkup Form</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Normal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Fungal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Fleas Wash
              </button>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
              {grooming.map((groom) => (
              <Link href={`/doctor/${groom.id}`} key={groom.id} className={"no-underline"}>
              <div className="bg-white px-4 py-3 rounded-xl flex items-center shadow-md text-sm leading-tight mt-4">
                  <div className="flex flex-col">
                    <p className="font-semibold text-[#373737]">{groom.name}</p>
                    <p className="text-sm text-gray-600">{groom.specification}</p>
                  </div>
                  <div className="ml-auto">
                    <p className="font-bold text-[#373737]">{groom.price}</p>
                  </div>
                </div>
              </Link>
              ))}
            </div>
            {/* BOOK NOW */}
                  <Link href="/home" className="flex text-[#373737] font-bold text-xl self-end no-underline pt-6">
                    View All Product <ArrowRight className="mr-2" /> 
                  </Link>
          </div>
        </div>

        {/* Ads 3 */}
        <div className="pt-24 r max-w-screen-xl mx-auto">
        <Image 
        src={CAds3}
        alt='header'
        height={120}
        className='w-full rounded-xl'
        ></Image>,
        </div>

        {/* Hotel */}
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 overflow-hidden">
          {/* LEFT - GRID GAMBAR */}
          <div className="bg-white w-full md:w-1/2 p-6 grid grid-cols-2 gap-4 place-items-center">
            <Image src={dawg1} alt="Grooming 1" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg2} alt="Grooming 2" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg3} alt="Grooming 3" className="rounded-2xl w-full h-auto object-cover" />
            <Image src={dawg4} alt="Grooming 4" className="rounded-2xl w-full h-auto object-cover" />
          </div>

          {/* RIGHT - CHECKUP FORM */}
          <div className="bg-[#5E8AD8] w-full md:w-1/2 p-6 flex flex-col rounded-xl">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Checkup Form</h2>

            {/* Tabs */}
            <div className="flex justify-center gap-3 mb-6">
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Normal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Fungal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-full shadow">
                Fleas Wash
              </button>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
              <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow text-sm leading-tight">
                <p className="font-semibold text-[#373737]">Anti Fungal Wash</p>
                <p className="font-bold text-[#373737]">75K</p>
              </div>
              <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow text-sm leading-tight whitespace-pre-wrap">
                <p className="font-semibold text-[#373737]">Anti Fungal Wash{'\n'}+Degreaser</p>
                <p className="font-bold text-[#373737]">75K</p>
              </div>
              <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow text-sm leading-tight whitespace-pre-wrap">
                <p className="font-semibold text-[#373737]">Anti Fungal Wash{'\n'}+Sebazol</p>
                <p className="font-bold text-[#373737]">75K</p>
              </div>
              <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow text-sm leading-tight whitespace-pre-wrap">
                <p className="font-semibold text-[#373737]">Anti Fungal Wash{'\n'}+Degreaser{'\n'}+Sebazol</p>
                <p className="font-bold text-[#373737]">75K</p>
              </div>
            </div>

            {/* BOOK NOW */}
                  <Link href="/home" className="flex text-[#373737] font-bold text-xl self-end no-underline pt-6">
                    View All Product <ArrowRight className="mr-2" /> 
                  </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white shadow-xl rounded-2xl p-14 mt-40 max-w-7xl mx-auto pb-36">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            {/* Left */}
            <div className="flex-1 text-[#373737] space-y-2">
              <h1 className="text-3xl font-bold text-[#373737]">Cemoet Pets</h1>
              <p className="font-semibold text-[#373737]">PT. Dignitas Akademi</p>
              <p className="text-sm text-[#373737]">
                Jl. Bungur Raya No.20, Kukusan, Kecamatan Beji, Kota Depok, Jawa Barat 16425
              </p>
              <p className="text-sm text-[#373737]">
                Pusat Kebutuhan Hewan Peliharaan Terlengkap, Terbesar,
                <br /> & Terpercaya No. 1 di Indonesia
              </p>
            </div>

            {/* Right */}
            <div className="flex-1 text-right flex flex-col items-end gap-3">
              <div className="flex gap-6 font-semibold">
                <a href="#" className="hover:underline no-underline text-[#373737]">Home</a>
                <a href="#" className="hover:underline no-underline text-[#373737]">Products</a>
                <a href="#" className="hover:underline no-underline text-[#373737]">Doctors</a>
                <a href="#" className="hover:underline no-underline text-[#373737]">Grooming</a>
                <a href="#" className="hover:underline no-underline text-[#373737]">Hotel</a>
              </div>
              <p className="text-xs max-w-sm text-gray-600 text-right mt-2">
                ©2025 Cemoet Corporation. Cemoet, the cemoet healthy pet shop are among our registered and unregistered trademarks in the IDN and other countries.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}


