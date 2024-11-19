"use client";

import React from "react";

import AddPost from "./add-post/page";
import FeedPage from "./feed/page";
import LeftMenu from "./left-menu/page";
import RightMenu from "./right-menu/page";
import Stories from "./stories/page";
import Navbar from "./navbar/page";

export default function UserProfile() {
  return (
    <div className="w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-stone-50 to-gray-100  md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full bg-white">
        <Navbar />
      </div>
      <div className="flex gap-6 pt-6">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <Stories />
            <AddPost />
            <FeedPage /> 
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          {/* <RightMenu /> */}
        </div>
      </div>
    </div>
  );
}
