import { Button } from "antd";
import { Link, Edit, LogOut, User, Mail, Phone } from "lucide-react";
import LogoutButton from "../logoutButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import doc from '#/app/image/Doc1.png'

export default function About() {
    type User = {
        sub: string;
        Name: string;
        email: string;
        num?: string;
    }
    const [user, setUser] = useState<any | null>(null);
      const [loading, setLoading] = useState(true);
      const router = useRouter();
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        fetch("http://localhost:3222/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
          })
          .then((data) => {
            setUser(data);
            setLoading(false);
            console.log(data);
          })
          .catch(() => {
            localStorage.removeItem("token");
            router.push("/guest");
          });
      }, [router]);

      const LogoutButton = () => {
        localStorage.removeItem("token");
        router.push("/guest");
      }
    return (
        <>
        <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Profile Box */}
            <div className="flex flex-col gap-4 w-full md:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center gap-4">
                <img
                  src={doc.src}
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-white shadow-md overflow-hidden"
                />
                <h2 className="font-bold text-xl">{user?.Name}</h2>
                <p className="text-sm text-gray-500">Customer</p>

                {/* Tombol yang sudah diperbarui */}
                <Button className="w-full">
                  <Link href="/pages/profile/edit" className="flex items-center gap-2">

                  </Link>
                </Button>

                <Button className="w-full" onClick={() => LogoutButton()}>
                    <LogOut size={16} />
                </Button>
              </div>
            </div>

            {/* Right Column - About Me Section */}
            <div className="w-full md:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-xl font-semibold mb-6">About Me</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                  {/* Setiap baris data ditambahkan ikon agar lebih menarik */}
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-500">Name</p>
                      <p className="font-medium text-gray-800">{user?.Name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-500">Email</p>
                      <p className="font-medium text-blue-700">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-600" />
                    <div>
                      <p className="font-semibold text-gray-500">Phone Number</p>
                      <p className="font-medium text-blue-700">{user?.num}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
}