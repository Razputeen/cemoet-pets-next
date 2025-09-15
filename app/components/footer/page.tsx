import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <>
                      <footer className="bg-white shadow-xl rounded-2xl p-8 sm:p-14 mt-40 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              {/* Left */}
              <div className="flex-1 text-[#373737] space-y-2 text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold">Cemoet Pets</h1>
                <p className="font-semibold">PT. Dignitas Akademi</p>
                <p className="text-xs sm:text-sm">
                  Jl. Hanjuang No. 1, Jakarta Selatan, <br /> Indonesia
                </p>
                <p className="text-xs sm:text-sm">
                  Pusat Kebutuhan Hewan Peliharaan Terlengkap, Terbesar, <br /> & Terpercaya No. 1 di Indonesia
                </p>
              </div>

              {/* Right */}
          {/* Right */}
          <div className="flex-1 flex flex-col gap-3 text-center md:text-right items-center md:items-end">
            <div className="flex flex-wrap gap-4 sm:gap-6 font-semibold justify-center md:justify-end">
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">Doctors</a>
              <a href="#">Grooming</a>
              <a href="#">Hotel</a>
            </div>

            {/* Social media */}
            <div className="flex gap-4 mt-3 justify-center md:justify-end">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <Facebook size={20} className="text-[#373737] hover:text-blue-600" />
              </a>
              <a href="https://www.instagram.com/ssenoo__/?hl=en" target="_blank" rel="noreferrer">
                <Instagram size={20} className="text-[#373737] hover:text-pink-500" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter size={20} className="text-[#373737] hover:text-sky-500" />
              </a>
            </div>

            <p className="text-[10px] sm:text-xs max-w-sm text-gray-600 text-center md:text-right mt-2">
              ©2025 Cemoet Corporation. Cemoet, the cemoet healthy pet shop are among our registered and unregistered trademarks in the IDN and other countries.
            </p>
          </div>

            </div>
          </footer>
        </>
    );
}