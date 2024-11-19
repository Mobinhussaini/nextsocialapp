"use server";

import React from "react";
import Link from "next/link";

import { db } from "@/lib/db";
import { auth } from "@/auth";

import FriendRequestList from "@/components/built-in/right-menu/friend-request-list";

const FriendRequest = async () => {
  const {user} = await auth();

  const requests = await db.followRequest.findMany({
    where: {
      receiverId: user.id,
    },
    include: {
      sender: true,
    },
  });

  if (!requests || requests.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
        <h1>No Friend Requests</h1>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
      {/* BOTTOM */}
      <FriendRequestList requests={requests} />
    </div>
  );
};

export default FriendRequest;
