'use client'
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { searchVideoApi } from "@/api/videoApi";
import { handleLogout, } from "@/api/userApi";
import { logout } from "@/lib/features/users/userSlice";
import { useRouter as userRouter } from "next/navigation";
import { openModal } from "@/lib/features/globalModalslice";
import { setSearchedVideo } from "@/lib/features/video/searchVideoSlice";

const Navbar = () => {
  const user = useAppSelector((state: any) => state.user);
  const [profileModal, setProfileModal] = useState(false);
  const dispatch = useAppDispatch();
  const router = userRouter()
  const profileRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("")

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

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/result/?search=${encodeURIComponent(searchQuery)}`)
      searchVideoApi(searchQuery)
        .then(res => {
          dispatch(setSearchedVideo(res?.data))
          console.log("search response: ", res.data)
        })
    }

  }

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
      <div className="h-full ml-3 w-[90%] md:max-w-[50%] lg:max-w-[40%] border flex rounded-[50px] 
            border-1 border-gray-300">
        <form onSubmit={(e) => handleSearch(e)} className="flex justify-center items-center flex-1 rounded-[50px] 
            p-1 h-full ">
          <Search color="#333333" className="md:block" />
          <input
            type="text"
            name="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="p-1 w-full mx-2  outline-0"
          />
        </form>
        {
          searchQuery?.length > 0 && (
            <button onClick={() => setSearchQuery("")} className="cursor-pointer px-2">X</button>
          )
        }

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
                          hover:border-b-1 p-1 " onClick={() => setProfileModal(false)} >Profile</div>
              </Link>
              <div className="cursor-pointer hover:bg-gray-100 
                          hover:border-b-1 p-1 "
                onClick={() => {
                  setProfileModal(false)
                  dispatch(openModal())
                }} >Upload Video</div>
              <div className="cursor-pointer hover:bg-gray-100 
                          hover:border-b-1 p-1 rounded-b-lg"
                onClick={() => {
                  setProfileModal(false)
                  handleSubmit()
                }} >Logout</div>
            </div>

          )
        }
        {
          user && (
            <div
              id="profileDiv"
              ref={profileRef}
              className=" h-8 
                        w-8 rounded-full flex justify-center 
                        items-center overflow-hidden mr-1 
                        hidden sm:block cursor-pointer ml-5"
              onClick={(e) => {
                if (e.currentTarget.id !== 'profileDiv') { }
                setProfileModal(!profileModal)
              }}
            >
              <Image
                src={user?.avatar}
                width={32}
                height={32}

                alt="profile"
                className="object-cover rounded-full h-full w-full"
              />

            </div>
          )
        }


        {
          !user && (
            <Link
              href={"/auth/login"}
              className="md:flex justify-center items-center p-1 
                  hidden md:border-1 md:border-gray-300 rounded-[50px]"
            >
              <User size={20} />
              <p className="text-[16px] hidden md:block">Sign in</p>
            </Link>
          )
        }

      </div >
    </nav >
  );
};

export default Navbar;
