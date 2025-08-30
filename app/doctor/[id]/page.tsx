'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import head from'../../image/ComponentAds1.png'
import doc from '../../image/Doc1.png'
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'

// Configure Poppins. You can specify weights and subsets.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust weights as needed
  variable: '--font-poppins', // Define a CSS variable name for Tailwind
});

type Doctor = {
  id: number;
  name: string;
  speciality: string;
  email: string;
  noTelp: string;
  description: string;
  quote: string
}

type User = {
  sub: string;
  Name: string;
  email: string;
  roles: string[];
};

export default function HealthyPetPage() {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();
  const router = useRouter();
  const doctorId = params?.id as string;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const token = localStorage.getItem("token");
const draft = () => {
  if (!token) {
    router.push("/Login");
    return false;
  }
  return true;
};

 useEffect(() => {
    if (!doctorId) return;

    fetch(`http://localhost:3222/doctors/${doctorId}`, {
      method: "GET",
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch doctor");
        return res.json();
      })
      .then((data) => {
        console.log("Doctor detail:", data);
        setDoctor(data);
      })
      .catch((err) => console.error("Error fetching doctor detail:", err));
  }, [doctorId]);

      useEffect(() => {
      const token = localStorage.getItem("token");
      const draft = () => {
        if (!token) {
          router.push("/Login");
          return;
        }
      };

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

  return(
    <div className="min-h-screen bg-[#f2f2f2] py-6 px-4">
      <div className="max-w-screen-lg mx-auto bg-white rounded-3xl shadow-md p-6">

        {/* Header */}
        <Image 
        src={head}
        alt='header'
        height={100}
        className='w-full rounded-xl'
        ></Image>,

        {/* Back Button */}
        <div className="mt-4">
          <Link href="/home" className="flex items-center text-black font-bold text-lg mb-4">
            <ArrowLeft className="mr-2" /> Back
          </Link>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start">
            {/* Left Box */}
            <div className="bg-[#7F9DB6] text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Healthy Pet</h2>
                <p className="text-xs leading-relaxed font-semibold">
                {doctor?.description}
                <br /><br />
                "{doctor?.quote}"
                <br /><br />
                — {doctor?.name}, {doctor?.speciality}
              </p>
              <div className="text-right mt-20">
                {draft() && <p className="text-xs leading-relaxed font-semibold">*Please login to book an appointment</p>}
                <Link href="/booking" className="inline-flex items-center gap-2 text-white font-bold text-lg">
                  Book Now <ArrowRight />
                </Link>
              </div>
            </div>

            {/* Right Box (Image) */}
            <div className="rounded-xl overflow-hidden flex justify-center items-start">
              <Image
                src={doc}
                alt="Veterinarian with dog"
                className="rounded-2xl object-contain w-full h-auto max-h-[450px] mx-auto"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}