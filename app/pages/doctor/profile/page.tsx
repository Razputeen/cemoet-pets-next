'use client'

import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import head from'../../../image/ComponentAds1.png'
import doc from '../../../image/Doc1.png'
import { Poppins } from 'next/font/google';

// Configure Poppins. You can specify weights and subsets.
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Adjust weights as needed
  variable: '--font-poppins', // Define a CSS variable name for Tailwind
});



export default function HealthyPetPage() {
  return (
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
                As a pet surgeon, I’ve seen firsthand how proper care can transform an animal’s life. Keeping pets healthy isn’t just about preventing illness — it’s about giving them the chance to live joyfully and pain-free. From balanced nutrition to regular checkups and timely surgeries when needed, every effort we make directly impacts their comfort and longevity. Our pets rely on us entirely, and it’s our duty to ensure they thrive, not just survive. A healthy pet means more tail wags, more cuddles, and more years of unconditional love.
                <br /><br />
                "A healthy pet is a happy companion — their well-being reflects the love and care we give."
                <br /><br />
                — Dr. Chae Moet, Veterinary Surgeon
              </p>
              <div className="text-right mt-20">
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