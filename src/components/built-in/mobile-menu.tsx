"use client";

import React, { useState } from "react";
import Link from "next/link";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="md:hidden">
      <div
        className="flex flex-col px-12 gap-[4.5px] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div
          className={`w-6 h-1 bg-blue-500 rounded-md ${
            isOpen ? "rotate-45" : ""
          } origin-left ease-in-out duration-500 `}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-md ${
            isOpen ? "opacity-0" : ""
          } origin-left ease-in-out duration-500 `}
        />
        <div
          className={`w-6 h-1 bg-blue-500 rounded-md ${
            isOpen ? "-rotate-45" : ""
          } origin-left ease-in-out duration-500`}
        />
      </div>
      {isOpen && (
        <div className="absolute left-0 top-24 w-full h-[calc(100vh-96px)] bg-white flex flex-col items-center justify-center gap-8 font-medium text-xl z-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Friends</Link>
          <Link href={"/"}>Groups</Link>
          <Link href={"/"}>Stories</Link>
          <Link href={"/"}>Login</Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
