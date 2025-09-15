"use client"

import { useRouter } from "next/navigation";
import Navbar from "../app/Navbar/page";
import BodyHome from "../app/guest/page";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})
export default function Layout() {
  const router = useRouter();
  const Token = localStorage.getItem("token");
  if (Token) {
    router.push("/home");
  }
  return (
    <>
    <body className={poppins.className}>
      <BodyHome />
    </body>
    </>
  );
}
