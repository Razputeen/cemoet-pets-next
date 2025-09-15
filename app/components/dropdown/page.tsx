import { Dropdown, MenuProps } from "antd";
import { BookText } from "lucide-react";
import { useEffect, useState } from "react";

export default function DropDown() {
    interface User {
      sub: number;
      Name: string;
      email: string;
      roles: string[];
    }
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      });
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a href={`/reservation/klinik/${user?.sub}`}>Klinik</a>
      ),
    },
    {
      key: "2",
      label: (
        <a href={`/reservation/grooming/${user?.sub}`}>Grooming</a>
      ),
    },
    {
      key: "3",
      label: (
        <a href={`/reservation/hotel/${user?.sub}`}>Hotel</a>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
      <span
        onClick={(e) => e.preventDefault()}
        className="cursor-pointer flex items-center"
      >
        <BookText className="text-gray-600" />
      </span>
    </Dropdown>
  );
}
