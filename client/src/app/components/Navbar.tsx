import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="nav flex justify-between items-center p-1  m-auto">
      {/* Logo----------- */}
      <div>
        <div>
          <Image
            className="lg:hidden"
            src={"/hamburger.svg"}
            width={30}
            height={30}
            alt="hamburder"
          />
          <Link href={"/"} className="hidden lg:block">
            <Image
              src="/logo.svg"
              width={200}
              height={100}
              alt="Picture of the author"
            />
          </Link>
        </div>
      </div>

      {/* Search input----------- */}
      <div className="h-10">
        <div className="flex justify-center items-center rounded-[50px] p-1 h-full border-1 border-gray-300 ">
          <Search color="#333333" className="hidden md:block" />
          <input
            type="text"
            name="Search"
            placeholder="Search"
            className="p-1 md:w-100 mx-2  outline-0"
          />
        </div>
      </div>

      {/* Login signup */}

      {/* Profile-------------- */}
      <div>
        <Link
          href={"/profile"}
          className="flex justify-center items-center p-1 md:border-1 md:border-gray-300 rounded-[50px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-9 md:size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p className="text-[16px] hidden md:block">Sign in</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
