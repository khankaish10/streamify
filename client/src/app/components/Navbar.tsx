import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex border-2 border-red-500">
      <div>
        <div>
          <Image
            className="md:hidden"
            src={"/hamburger.svg"}
            width={50}
            height={50}
            alt="hamburder"
          />
          <Link href={"/"} className="hidden md:block">
            <Image
              src="/logo.svg"
              width={200}
              height={100}
              alt="Picture of the author"
            />
          </Link>
        </div>
      </div>
      <div className="flex-1 border-1 border-red-500">
        <div className="flex justify-center items-center border-2 border-amber-400 h-full">
          <Search color="#333333" />
          <input
            type="text"
            name="Search"
            placeholder="Search"
            className="p-2 mx-2 border-1 border-gray-300 rounded-[50px] outline-0"
          />
        </div>
      </div>
      <div>profile</div>
    </nav>
  );
};

export default Navbar;
