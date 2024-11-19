"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import MobileMenu from "@/components/built-in/mobile-menu";
import { LoginButton } from "@/components/reusable/login-button";
import { Button } from "@/components/ui/button";
import { BiLogInCircle } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const session = useSession();

  const [position, setPosition] = useState("setting");
  const handleSignOut = () => {
    signOut();
  };

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }
  if (session.data) {
    return (
      <div className="h-24 flex items-center justify-between shadow-sm shadow-red-100 ">
        {/* LEFT */}
        <div className="md:hidden lg:block w-[20%] pl-6">
          <Link href="/" className="font-bold text-blue-500">
            <Image
              src={"/02_homtap_logo2.png"}
              alt="HOMTAP LOGO"
              height={48}
              width={90}
              className="h-12 w-32"
            />
          </Link>
        </div>
        {/* CENTER */}
        <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
          {/* LINKS */}
          <div className="flex flex-row gap-6">
            <Link href={"/"} className="flex gap-2">
              <Image
                src={"/home.png"}
                className="w-4 h-4"
                alt="HomePage"
                width={16}
                height={16}
              />
              <span>HomePage</span>
            </Link>
            <Link href={"/friends"} className="flex gap-2">
              <Image
                src={"/friends.png"}
                className="w-4 h-4"
                alt="Friends"
                width={16}
                height={16}
              />
              <span>Friends</span>
            </Link>
            <Link href={"/stories"} className="flex gap-2">
              <Image
                src={"/stories.png"}
                className="w-4 h-4"
                alt="Stories"
                width={16}
                height={16}
              />
              <span>Stories</span>
            </Link>
          </div>
          <div className="hidden xl:flex p-2 bg-slate-100 items-center rounded-xl">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none"
            />
            <Image
              src="/search.png"
              alt="Search"
              className="w-4 h-4"
              width={16}
              height={16}
            />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-[30%] flex justify-end gap-4 items-center xl:gap-8">
          { 
          !session?.data?.user && (
            <LoginButton>
              <Button
                variant="secondary"
                className="hover: hover:bg-blue-600 hover:text-white px-12"
                size={"sm"}
              >
                <BiLogInCircle size={24} className="w-6 h-6" />
                Login/Register
              </Button>
            </LoginButton>
          )}
          {session?.data?.user && (
            <>
              <div className={`flex flex-row items-center  cursor-pointer `}>
                <div className="flex flex-row gap-3">
                  <div className="px-1 py-1 hover:bg-gray-300 rounded-full">
                    <Image
                      src={"/people.png"}
                      width={15}
                      height={15}
                      alt={"Friends Requests"}
                      className="rounded-full w-4 h-4 "
                    />
                  </div>
                  <div className="px-1 py-1 hover:bg-gray-300 rounded-full">
                    <Image
                      src={"/messages.png"}
                      width={15}
                      height={15}
                      alt={"Messages"}
                      className="rounded-full w-4 h-4 "
                    />
                  </div>
                  <div className="px-1 py-1 hover:bg-gray-300 rounded-full">
                    <Image
                      src={"/notifications.png"}
                      width={15}
                      height={15}
                      alt={"Messages"}
                      className="rounded-full w-4 h-4 "
                    />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <Image
                        src={session?.data?.user?.image || "/profile.png"}
                        width={36}
                        height={36}
                        alt={session?.data?.user?.name || "Profile Picture"}
                        className="rounded-full w-9 h-9 "
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="min-w-56 shadow-md shadow-red-200 mr-52 -mt-1">
                    <DropdownMenuLabel>
                      <div className="flex flex-row items-center gap-3">
                        <Image
                          src={session?.data?.user?.image || "/profile.png"}
                          width={36}
                          height={36}
                          alt={session?.data?.user?.name || "Profile Picture"}
                          className="rounded-full w-9 h-9 "
                        />
                        <div className="flex flex-col ">
                          <p className="text-sm font-base">
                            {session.data.user.name}
                          </p>
                          <p className="text-sm font-light">
                            {session.data.user.email}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={position}
                      onValueChange={setPosition}
                    >
                      <DropdownMenuRadioItem value="dashboard">
                        Dashboard
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="setting">
                        Setting
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="profile">
                        Profile
                      </DropdownMenuRadioItem>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleSignOut()}
                      >
                        Sing Out
                      </Button>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}

          <MobileMenu />
        </div>
      </div>
    );
  }
};

export default Navbar;
