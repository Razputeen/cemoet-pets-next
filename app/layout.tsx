import './globals.css';
import 'antd/dist/reset.css';
import {Provider} from "./provider";
import Script from 'next/script';
import { Poppins } from 'next/font/google';


export const metadata = {
  title: "Cemoet Pets",
  description: "Deskripsi singkat",
  icons: {
    icon: "/image/icons.png", // ganti dengan file kamu di public/
  },
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={`${poppins.className}`}>
        <Script src="/api/env" strategy={"beforeInteractive"}></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
