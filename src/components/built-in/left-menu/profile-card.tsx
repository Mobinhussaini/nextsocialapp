"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { getUserById } from "@/data/user";
import { useSession } from "next-auth/react";

const ProfileCard = () => {
  const {data} = useSession();

  if(!data?.user) return <p>Not Authenticated</p>;

  const [userInfo, setUserInfo ] = useState<any>(); 

  useEffect(()=> {

    getUserInfo(); 
    console.log(userInfo); 

  }, [])
  
  const getUserInfo = async ()=> {
    if(!data?.user?.id) return <p>User Not Authenticated</p>

    try {
      const userInfo = await getUserById(data.user.id); 
      setUserInfo(userInfo); 
      return userInfo; 
      
    } catch (error) {
      console.log("SOMETHING WENT WROGN", error)
    }
  }
  
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          src={data?.user?.cover || "/noCover.png"}
          alt="cover"
          fill
          className="rounded-md  object-cover"
        />

        <Image
          src={data?.user?.image || "/noAvatar.png"}
          alt={data?.user?.name || "Profile Image"}
          width={60}
          height={60}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-2 ring-white z-10"
        />
      </div>
      <div className="h-24 flex flex-col gap-2 items-center">
        <span className="font-semibold pt-1">{data?.user?.name} </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://images.pexels.com/photos/27893233/pexels-photo-27893233/free-photo-of-woman-in-shirt-photographing-with-digital-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/27893233/pexels-photo-27893233/free-photo-of-woman-in-shirt-photographing-with-digital-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
            <Image
              src="https://images.pexels.com/photos/27893233/pexels-photo-27893233/free-photo-of-woman-in-shirt-photographing-with-digital-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt="profile"
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-gray-500 text-xs">
            {data?.user?._count || 0} followers
          </span>
        </div>
        <Link href={`/profile/${data?.user?.id}`}>
          <button className="bg-blue-500 hover:bg-blue-800 text-white px-3 py-2 w-full text-xs rounded-md">
            My Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
