"use client";

import React, { useState } from "react";
import Image from "next/image";

import { acceptFollowRequest, declineFollowRequest } from "@/actions/actions";
import { FollowRequest, User } from "@prisma/client";

type RequestWithUser = FollowRequest & {
  sender: User;
};
const FriendRequestList = ({ requests }: { requests: RequestWithUser }) => {
  const [requestState, setRequestState] = useState(requests);

  console.log("requestState: ", requestState);

  const accept = async (senderId: string) => {
    try {
        await acceptFollowRequest(senderId);
        setRequestState(requestState?.filter((req) => req.senderId !== senderId)); 
    } catch (error) {
      console.log(error); 
      throw new Error("Something went wrong!");
    }
  };

  const decline = async (senderId: string)=> {
    try {
      await declineFollowRequest(senderId); 
      setRequestState(requestState?.filter((req) => req.senderId !== senderId));
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong!");
    }
  }


  return (
    <>
      {requestState && requestState?.map((request) => (
        <div
          className="flex items-center justify-between my-3"
          key={request.id}
        >
          <div className="flex items-center gap-4">
            <Image
              src={request.sender.image || "/noAvatar.png"}
              alt={request.sender.name || "No Profile Picture"}
              className="w-10 h-10 rounded-full object-cover"
              width={36}
              height={36}
            />
            <span className="font-semibold">{request.sender.name}</span>
          </div>

          <div className="flex gap-3 justify-end">
            <form action={() => accept(request.senderId)}>
              <button>
                <Image
                  src="/accept.png"
                  alt="accept"
                  className="w-4 h-4 cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
            <form action={()=>decline(request.senderId)}>
              <button>
                <Image
                  src="/reject.png"
                  alt="reject"
                  className="w-4 h-4 cursor-pointer"
                  width={20}
                  height={20}
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default FriendRequestList;
