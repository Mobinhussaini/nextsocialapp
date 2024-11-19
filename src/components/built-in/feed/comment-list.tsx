"use client";
import React, { useOptimistic, useState } from "react";
import Image from "next/image";

import { Comment, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { addComment } from "@/actions/actions";

type CommentWithUserType = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUserType[];
  postId: string;
}) => {
  const { data } = useSession();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!data?.user || !desc) return;

    addOptimisticComment({
      id: Math.random().toString(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: data.user.id,
      postId,
      user: {
        id: data.user.id,
        username: "Sending please wait...",
        image: data.user.image || "/noAvatar.png",
        cover: "",
        name: "",
        description: "",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUserType) => [value, ...state]
  );

  return (
    <>
      {data?.user && (
        <div className="flex items-center gap-4">
          <Image
            src={data.user.image || "/noAvatar.png"}
            alt={data?.user.name || "avatar image"}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full ring-2"
          />
          <form
            action={add}
            className="flex-1 flex items-center justify-center bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Write a comment"
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <Image
              src={"/emoji.png"}
              alt="emoji"
              width={16}
              height={16}
              className="w-5 h-5 cursor-pointer self-end"
            />
          </form>
        </div>
      )}

      {/* COMMENTS */}
      <div className="my-3 ml-3">
        {optimisticComment?.map((comment) => (
          <div
            className="flex justify-between"
            key={comment.id}
          >
            <div className="flex gap-x-6" >
              <Image
                src={comment.user.image || "/noAvatar.png"}
                alt={comment?.user.name || "avatar image"}
                width={24}
                height={24}
                className="rounded-full w-6 h-6"
              />
              {/* COMMENT */}

              {/* DESC */}
              <div className="flex flex-col">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <p className="text-sm tracking-wide text-gray-500">{comment.desc}</p>
                <div className="flex items-center  text-xs text-gray-500 mt-2 mb-6 ">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/like.png"
                      alt="likes"
                      width={16}
                      height={16}
                      className="cursor-pointer w-4 h-4"
                    />
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">Reply</span>
                  </div>
                  <span>123 Likes</span>
                </div>
              </div>

            </div>
              <Image
                src="/more.png"
                alt="read more"
                width={16}
                height={16}
                className="cursor-pointer w-4 h-4"
              />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
