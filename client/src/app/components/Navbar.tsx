'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { handleLogout } from "@/api";
import { logout } from "@/lib/features/users/userSlice";
import { useRouter as userRouter } from "next/navigation";

const Navbar = () => {
  const user = useAppSelector((state) => state.user[0]);
  const dispatch = useAppDispatch();
  const router = userRouter()

  const handleSubmit = () => {
    handleLogout()
      .then(response => {
        dispatch(logout());
        router.push('/auth/login')

      }
      )
      .catch((error) => {
        console.error("Logout error:", error);
      });


  };

  console.log("user", user);

  return (
    <nav className="flex items-center p-1 justify-between w-full
      sticky top-0 z-10 bg-white shadow-md h-10">


      {/* Logo----------- */}
        <div>
          <div className="inline-block w-0 h-0 border-solid lg:hidden
          rotate-90 border-t-0 border-r-[15px] border-l-[15px] ml-1
          border-b-[26px] border-l-transparent border-r-transparent 
          border-t-transparent border-b-[#f73b3b]"></div>
          <Link href={"/"} className="hidden lg:block">
            <Image
              src="/logo.svg"
              width={140}
              height={70}
              alt="Picture of the author"
            />
          </Link>
        </div>


      {/* Search input----------- */}
      <div className="h-full ml-3 w-[90%] md:max-w-[50%] lg:max-w-[40%]">
        <div className="flex justify-center items-center  rounded-[50px] 
            p-1 h-full border-1 border-gray-300 ">
          <Search color="#333333" className="hidden md:block" />
          <input
            type="text"
            name="Search"
            placeholder="Search"
            className="p-1 w-full mx-2  outline-0"
          />
        </div>
      </div>

      {/* Profile-------------- */}
      <div className="flex justify-center items-center">

        {
          user && (
            <Link
              href={"/profile"}
              className="border-1 border-gray-300 h-8 w-8 rounded-full 
                  flex justify-center items-center overflow-hidden mr-1 hidden md:block"
            >
              <Image
                src={user?.avatar}
                width={32}
                height={32}

                alt="profile"
                className="border-1 border-gray-300 object-cover rounded-full h-full w-full"
              />

            </Link>
          )
        }


        {
          user ? (
            <div
              className="p-1 md:border-1 md:border-gray-300 rounded-full h-full "
            >
              <button onClick={handleSubmit} className="cursor-pointer" >logout</button>
            </div>
          ) : (
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
              <p className="text-[16px] hidden lg:block">Sign in</p>
            </Link>
          )
        }

      </div >
    </nav >
  );
};

export default Navbar;
