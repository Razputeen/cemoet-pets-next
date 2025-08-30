import Navbar from "../app/Navbar/page";
import BodyHome from "../app/guest/page";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-poppins',
})
export default function Layout() {
  return (
    <>
    <body className={poppins.className}>
      <BodyHome />
    </body>
    </>
  );
}
