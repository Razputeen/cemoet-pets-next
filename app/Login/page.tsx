"use client";

import image from "../image/Koy1.jpg";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
    <section className="min-h-screen flex items-center justify-center font-poppins bg-sky-200 p-4">
      <div className="flex flex-col xl:flex-row shadow-2xl w-full max-w-6xl rounded-2xl overflow-hidden">
        {/* FORM */}
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 xl:p-20 gap-8 bg-white w-full xl:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold">Sign In</h1>

          {/* ... input dan tombol ... */}
          <div className="flex flex-col text-lg md:text-2xl text-left gap-1 w-full">
            <span>Username</span>
            <input
              type="text"
              placeholder="Input Username"
              className="placeholder:text-base md:placeholder:text-lg w-full border-b rounded-md border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 transition duration-300 py-2"
            />
          </div>

          <div className="flex flex-col text-lg md:text-2xl text-left gap-1 w-full">
            <span>Password</span>
            <input
              type="password"
              placeholder="Input Password"
              className="placeholder:text-base md:placeholder:text-lg w-full border-b border-gray-400 bg-transparent focus:outline-none focus:border-blue-500 transition duration-300 py-2"
            />
          </div>

          <button className="px-8 py-2 text-lg md:text-2xl rounded-md border-2 bg-sky-600 hover:bg-slate-100 hover:border-sky-600 transition duration-300 ease-in-out">
            Login
          </button>

          <p className="font-semibold text-sm md:text-base">
            Don't have an account?{" "}
            <Link href="/Register" className="text-sky-600 hover:underline">
              Register Now!
            </Link>
          </p>
        </div>

        {/*IMAGE */}
        <div className="relative hidden xl:block w-full xl:w-1/2">
          <Image
            src={image}
            alt="Login Illustration"
            fill
            className="object-cover xl:rounded-tr-2xl xl:rounded-br-2xl"
          />
        </div>
      </div>
    </section>
  );
}
