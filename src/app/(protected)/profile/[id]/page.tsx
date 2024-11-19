"use client";

// REACT libaries;
import React, { use, useEffect, useState } from "react";
import Image from "next/image";

// BUILT-IN FUNCTIONS;

// BUILT-IN components;
import Feed from "@/components/built-in/feed/feed";
import LeftMenu from "@/components/built-in/left-menu/left-menu";
import RightMenu from "@/components/built-in/right-menu/right-menu";
import { getUserPosts } from "@/actions/actions";
import { getUserById } from "@/data/user";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);

  const [user, setUser] = useState<any>();
  const [userPosts, setUserPosts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserFollow();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    setLoading(true);
    const posts = await getUserPosts(id);
    console.log(posts);
    setLoading(false);
    setUserPosts(posts);
  };
  const getUserFollow = async () => {
    setLoading(true);

    const user = await getUserById(id);

    setUser(user);
    console.log(user);
    setLoading(false);
  };

  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div>
      <div className="flex gap-6 pt-6">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center bg-slate-50 justify-center">
              <div className="w-full h-64 relative">
                <Image
                  src={user?.cover || "/noCover.png"}
                  alt={user?.name || "Cover page"}
                  fill
                  className="rounded-md"
                />
                <Image
                  src={user?.image || "/noAvatar.png"}
                  alt={user?.name || "Cover page"}
                  width={128}
                  height={128}
                  className="w-32 h-32 absolute -bottom-16 left-0 right-0 rounded-full ring-4 ring-white m-auto "
                />
              </div>
              <h1 className="mt-20 mb-1 text-2xl font-medium">
                {user?.name}
              </h1>
              <h1 className="mb-4 text-gray-500 text-base font-medium">
                {user?.email}
              </h1>
              <div className="flex items-center justify-center gap-12 mb-4">
                <div className="flex flex-col items-center">
                  <span className="font-medium">{user?.posts || 0}</span>
                  <span className="text-sm">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium">
                    {user?.followers || 0}
                  </span>
                  <span className="text-sm">Followers</span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="font-medium">
                    {user?.followings || 0}
                  </span>
                  <span className="text-sm">Followings</span>
                </div>
              </div>
            </div>
            <Feed type="profile" posts={userPosts} />
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          {/* <RightMenu user={user} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
