"use client";

import image from "../image/Koy1.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { input } from "../style";
import { Poppins } from "next/font/google";


  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-poppins",
  });

export default function SignIn() {



  const [form, setForm] = useState({ Name: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3222/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      router.push("/home"); // atau halaman lain
    } else {
      alert(data.message || "Login gagal");
    }
  };
  return (
    <div className={poppins.className}>
    <section className="min-h-screen flex items-center justify-center bg-sky-200 p-4">
      <div className="flex flex-col xl:flex-row shadow-2xl w-full max-w-6xl rounded-2xl overflow-hidden">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center text-center p-8 md:p-12 xl:p-20 gap-8 bg-white w-full xl:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold">Sign In</h1>

          {/* ... input dan tombol ... */}
          <div className="flex flex-col text-lg md:text-2xl text-left gap-1 w-full">
            <span>Username</span>
            <input
              type="text"
              placeholder="Input Username"
              onChange={(e) => setForm({ ...form, Name: e.target.value })}
              name="Name"
              className={input}
            />
          </div>

          <div className="flex flex-col text-lg md:text-2xl text-left gap-1 w-full">
            <span>Password</span>
            <input
              type="password"
              placeholder="Input Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              name="password"
              className={input}
            />
          </div>

          <button type="submit" className="bg-[#286699] border-none text-white font-semibold py-3 rounded-md hover:bg-[#194E7A] transition w-full">
            Login
          </button>

          <p className="font-semibold text-sm md:text-base">
            Don't have an account?{" "}
            <Link href="/Register" className="text-sky-600 hover:underline">
              Register Now!
            </Link>
          </p>
        </form>

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
    </div>
  );
}
