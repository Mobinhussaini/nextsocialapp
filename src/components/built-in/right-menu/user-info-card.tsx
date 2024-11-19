"use server";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { User } from "@prisma/client";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import UserInfoCardInteraction from "./user-info-card-interaction";
import UpdateUserPage from "@/app/(protected)/update-user/[id]/page";

const UserInfoCard = async ({ user }: { user?: User }) => {
  const userJoinedDate = new Date(user?.createdAt as Date);
  const formatedUserJoinedDate = userJoinedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isUserBlocked = false;
  let isFollowing = false;
  let isFollowingSent = false;

  const { user: currentUser } = await auth();

  if (currentUser.id) {
    const blockRes = await db.block.findFirst({
      where: {
        blockerId: currentUser.id,
        blockedId: user?.id,
      },
    });

    blockRes ? (isUserBlocked = true) : (isUserBlocked = false);
  }

  if (currentUser.id) {
    const followRes = await db.follower.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: user?.id,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);
  }

  if (currentUser.id) {
    const followReqRes = await db.followRequest.findFirst({
      where: {
        senderId: currentUser.id,
        receiverId: user?.id,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information </span>
        {currentUser.id === user.id ? (
          <UpdateUserPage user={user} /> 
        ) : (
          <Link href="/" className="text-blue-500 text-xs">
            See all
          </Link>
        )}
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">{user?.name}</span>
          <span className="text-sm">
            @{user?.username ? user?.username : user?.name}
          </span>
        </div>
        {user?.description && <p>{user?.description}</p>}
        {user?.city && (
          <div className="flex items-center gap-2">
            <Image
              src="/map.png"
              alt="map"
              width={16}
              height={16}
              className="w-4 h-4 "
            />
            <span>
              Living in <b>{user?.city}</b>
            </span>
          </div>
        )}
        {user?.school && (
          <div className="flex items-center gap-2">
            <Image
              src="/school.png"
              alt="school"
              width={16}
              height={16}
              className="w-4 h-4 "
            />
            <span>
              Went to <b>{user?.school}</b>
            </span>
          </div>
        )}
        {user?.work && (
          <div className="flex items-center gap-2">
            <Image
              src="/work.png"
              alt="work"
              width={16}
              height={16}
              className="w-4 h-4 "
            />
            <span>
              Works at <b>{user?.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user?.website && (
            <div className="flex gap-1 items-center">
              <Image
                src="/link.png"
                alt="link"
                width={16}
                height={16}
                className="w-4 h-4 "
              />
              <Link
                href={user?.website || "No website"}
                className="text-blue-500 font-medium"
              >
                {user?.website || "NO Website"}
              </Link>
            </div>
          )}
          {formatedUserJoinedDate && (
            <div className="flex gap-1 items-center">
              <Image
                src="/date.png"
                alt="date"
                width={16}
                height={16}
                className="w-4 h-4 "
              />
              <span>{formatedUserJoinedDate}</span>
            </div>
          )}
        </div>
        {currentUser.id && currentUser.id !== user.id && (
          <UserInfoCardInteraction
            userId={user.id}
            isUserBlocked={isUserBlocked}
            isFollowing={isFollowing}
            isFollowingSent={isFollowingSent}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
