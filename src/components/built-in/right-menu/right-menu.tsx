import React, { Suspense } from "react";
import FriendRequest from "@/components/built-in/right-menu/friend-request";
import Birthdays from "@/components/built-in/right-menu/birthdays";
import Ad from "@/components/built-in/ad";
import UserInfoCard from "@/components/built-in/right-menu/user-info-card";
import UserMediaCard from "@/components/built-in/right-menu/user-media-card";
import { User } from "@prisma/client";

const RightMenu = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
          <Suspense fallback="Loading...">
            <UserInfoCard user={user} />
          </Suspense>
          <Suspense fallback="Loading...">
            <UserMediaCard user={user} />
          </Suspense>
        </>
      ) : null}
      <FriendRequest />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
