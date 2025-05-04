'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { handleLogout } from "@/api";
import { logout } from "@/lib/features/users/userSlice";
import { useRouter as userRouter } from "next/navigation";
import { openModal } from "@/lib/features/globalModalslice";

const Navbar = () => {
  const user = useAppSelector((state) => state.user);
  const [profileModal, setProfileModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = userRouter()
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    handleLogout()
      .then(() => {
        setProfileModal(!profileModal)
        dispatch(logout());
        router.push('/')
      }
      )
      .catch((error) => {
        console.error("Logout error:", error);
      });


  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
  //       setProfileModal(false); // Close the modal
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);


  return (
    <nav className="flex items-center p-1 justify-between w-full
      fixed top-0 z-10 bg-white shadow-md h-11">

      {/* Logo----------- */}
      <div>
        <div className="inline-block w-0 h-0 border-solid lg:hidden
          rotate-90 border-t-0 border-r-[15px] border-l-[15px] ml-1
          border-b-[26px] border-l-transparent border-r-transparent 
          border-t-transparent border-b-[#f73b3b] "></div>
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
          <Search color="#333333" className="md:block" />
          <input
            type="text"
            name="Search"
            placeholder="Search"
            className="p-1 w-full mx-2  outline-0"
          />
        </div>
      </div>

      {/* Profile-------------- */}
      <div className="flex justify-center 
                      items-center relative">
        {
          user && (
            <div className={`absolute top-5 left-[-120px] 
                        flex flex-col border border-gray-300
                        bg-white gap-2 rounded-lg overflow-hidden
                        ${profileModal ? 'block' : 'hidden'}`}>
              <Link href={"/profile"}>
                <div className="cursor-pointer hover:bg-gray-100 
                          hover:border-b-1 p-1 " >Profile</div>
              </Link>
              <div className="cursor-pointer hover:bg-gray-100 
                          hover:border-b-1 p-1 "
                onClick={() => dispatch(openModal())} >Upload Video</div>
              <div className="cursor-pointer hover:bg-gray-100 
                          hover:border-b-1 p-1 rounded-b-lg"
                onClick={() => handleSubmit()} >Logout</div>
            </div>

          )
        }
        {
          user && (
            <div
              id="profileDiv"
              ref={profileRef}
              className="border-1 border-gray-300 h-8 
                        w-8 rounded-full flex justify-center 
                        items-center overflow-hidden mr-1 
                        hidden sm:block cursor-pointer ml-5"
              onClick={(e) => {
                if (e.currentTarget.id !== 'profileDiv') { }
                setProfileModal(!profileModal)
              }}
            >
              <Image
                src={user?.avatar || "/default-avatar.png"}
                width={32}
                height={32}

                alt="profile"
                className="border-1 border-gray-300 object-cover rounded-full h-full w-full"
              />

            </div>
          )
        }


        {
          !user && (
            <Link
              href={"/auth/login"}
              className="flex justify-center items-center p-1 md:border-1 md:border-gray-300 rounded-[50px]"
            >
              <User size={20} />
              <p className="text-[16px] hidden lg:block">Sign in</p>
            </Link>
          )
        }

      </div >
    </nav >
  );
};

export default Navbar;
