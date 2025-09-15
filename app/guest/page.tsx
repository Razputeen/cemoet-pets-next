'use client';

import Image from "next/image";
import { use } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Leaf, Package, ReceiptText, ShoppingBag, ShoppingCart, Stethoscope, User, BookText } from "lucide-react";
import dawgHero from "#/app/image/dawg.png";
import proplan from "#/app/image/proplan.png";
import CAds from "#/app/image/ComponentAds1.png";
import CAds1 from "#/app/image/AdsH.png";
import CAds2 from "#/app/image/Ads2.png";
import CAds3 from "#/app/image/Ads3.png";
import doc from '#/app/image/Doc1.png'
import docc from '#/app/image/Cemow.jpg'
import dawg1 from '#/app/image/Dawg1.jpg'
import dawg2 from '#/app/image/Dawg2.jpg'
import dawg3 from '#/app/image/Dawg3.jpg'
import dawg4 from '#/app/image/Dawg4.jpg'
import { useRouter } from 'next/navigation';
import router from "next/router";
import ReservationDropdown from "#/app/components/dropres/page";
import { Button } from "antd";
import Footer from "../components/footer/page";

const images = [doc, dawgHero]

export default function Landing() {

type Product = {
    id: number;
    name: string;
    price: string;
    images: { id: number; url: string }[];
    stock: number;
    description: string;
    specification: string;
    brand: string;
    category: string;
    weight: number;
    cart: cart;
  };

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

type Hotel = {
  id: number;
  name: string;
  price: number;
}

  type cart = {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
  }

  const [user, setUser] = useState<User | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [grooming, setGrooming] = useState<Grooming[]>([])
  const [hotel, setHotel] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true);
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
      fetch('http://localhost:3222/hotel',{
        method: 'GET',
        cache: 'no-store'
      } )
        .then(res => res.json())
        .then(json => {
          console.log("DATA DARI SERVER:", json)
          setHotel(json.rows || json) // fallback jika rows tidak ada
        })
        .catch(err => console.error('Error fetching product:', err))
    }, [])

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const res = await fetch("http://localhost:3222/product", {
            method: "GET",
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch products");
          }
          const json = await res.json();
          setProduct(json.rows || json);
        } catch (err) {
          console.error("Error fetching products:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);

  // Data produk contoh

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
            <p className="text-gray-700">Dear, Guest</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href={`/Login`}>
              <Button className="bg-[#3D6C88] hover:bg-[#3D6C88]/90 text-white  rounded-lg">
                Login
              </Button>
            </Link>
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
                      <>
                        <Link
                          href={`/Login`}
                          className="block px-4 py-2"
                        >
                          Grooming
                        </Link>
                        <Link
                          href={`/Login`}
                          className="block px-4 py-2"
                        >
                          Klinik
                        </Link>
                        <Link
                          href={`/Login`}
                          className="block px-4 py-2"
                        >
                          Hotel
                        </Link>
                      </>
                  </div>
                </div>
              </div>

              <>
              <Link href={`/Login`} className="text-gray-600 hover:text-gray-900 transition-colors">
                <Package size={24} />
              </Link>
              <Link href={`/Login`} className="text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={24} />
              </Link>
              <Link href="/user/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <User size={24} />
              </Link>
              </>
            </div>
          </div>
        </div>
        

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Left Hero */}
          <div className="lg:col-span-2 relative bg-[#3D6C88] rounded-2xl text-white p-8 overflow-hidden flex flex-col justify-center">
            <div className="z-10">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Your<br />Everything<br />Pet Needs
              </h2>
              <p className="text-sm mt-4 max-w-xs md:max-w-sm">
                Premium quality food, toys, and accessories for your furry friends. Because they deserve the best!
              </p>
            </div>
            <Image
              src={dawgHero}
              alt="Hero Dog"
              width={250}
              height={250}
              className="absolute bottom-0 right-4 z-0 opacity-80"
            />
          </div>

          {/* Right Promo */}
          <div className="bg-[#1AB1A3] text-white rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Get 10% Discount</h3>
              <p className="text-sm">
                Only for our Pro Plan dry foods and our wet ones.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <Image
                src={proplan}
                alt="ProPlan Promo"
                width={200}
                height={120}
              />
            </div>
          </div>
        </section>

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
          <div className="px-4 md:px-8 pb-12">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {product.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
                  >
                    {/* Use Link to wrap the image and product info for easy navigation */}
                    <Link href={`/product/${product.id}`} passHref>
                      <div className="relative w-full h-48 cursor-pointer">
                        <Image
                          src={`http://localhost:3222${product.images?.[0]?.url || "/fallback.jpg"}`}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      
                      <div className="p-4 flex flex-col gap-2">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {product.name}
                        </h4>
                        <h4 className="text-sm text-gray-500 uppercase font-medium">
                          {product.weight} Kg
                        </h4>
                        <div className="mt-2 flex items-center justify-between">
                          <p className="text-xl font-bold text-gray-800">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                    
                    {/* Add to Cart Button is outside the Link, so it's a separate click target */}
                    <div className="p-4 pt-0">
                      <Link
                        href={`/Login`}
                        className="w-full mt-2 bg-[#3A3A3A] text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-700 hover:scale-105"
                      >
                        Add to Cart
                        <ShoppingCart size={18} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
        <div className="flex flex-col md:flex-row gap-6 overflow-hidden max-w-[1200px] mx-auto mt-10 h-[100vh]">
          {/* KIRI - List tetap sama seperti sebelumnya */}
          <div className="bg-[#96C6CF] w-full md:w-1/2 p-6 flex flex-col rounded-xl">
            {/* <h2 className="text-white text-3xl font-bold mb-6 text-center">Doctor List</h2> */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
            <div className="bg-[#ffffff] text-[#373737] rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Healthy Pets</h2>
                <p className="text-xs leading-relaxed font-semibold">
                To ensure a pet's health, provide a balanced diet, fresh water, and consistent exercise, along with regular veterinary check-ups, vaccinations, and parasite control. Maintaining good hygiene by washing hands after handling pets and their waste is crucial to prevent the spread of diseases to humans. Keeping pets on leashes and securing garbage also helps protect them from wildlife and illness. 
              </p>
              <div className="text-right mt-20">
              </div>
            </div>
            {doctors.map((doc) => (
                <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow-md text-sm leading-tight">
                  <p className="font-semibold text-[#373737]">{doc.name}</p>
                  <p className="font-bold text-[#373737]">{doc.speciality}</p>
                </div>
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
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-lg shadow">
                Normal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-lg shadow">
                Fungal Wash
              </button>
              <button className="bg-white text-[#373737] font-semibold px-5 py-2 rounded-lg shadow">
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
              <Link href="/forms/grooming" className="flex text-[#373737] font-bold text-xl self-end no-underline pt-6">
                Book Now <ArrowRight className="mr-2" /> 
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

            {/* List Items */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-transparent">
            <div className="bg-[#ffffff] text-[#373737] rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Pet Hotel</h2>
                <p className="text-xs leading-relaxed font-semibold">
                A pet hotel is a high-class boarding facility offering comfortable, often cage-free accommodations, amenities like play areas, pools, spas, and grooming services, and individualized attention for pets while their owners are away. Unlike traditional kennels, pet hotels provide a luxurious, resort-style experience designed to keep pets safe, happy, and engaged through supervised play, personalized activities, and high-quality food and bedding.
              </p>
              <div className="text-right mt-20">
              </div>
            </div>
            {hotel.map((hotel) => (
                <div className="bg-white px-4 py-3 rounded-xl flex justify-between items-start text-left shadow-md text-sm leading-tight">
                  <p className="font-semibold text-[#373737]">{hotel.name}</p>
                  <p className="font-bold text-[#373737]">{hotel.price}K</p>
                </div>
            ))}
            </div>

            {/* BOOK NOW */}
              <Link href="/forms/hotel" className="flex text-[#373737] font-bold text-xl self-end no-underline pt-6">
                Book Now <ArrowRight className="mr-2" /> 
              </Link>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}


