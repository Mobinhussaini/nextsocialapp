"use client";

import React, { useOptimistic, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getAllCommentsOfAPost, switchLike } from "@/actions/actions";
import Comments from "./comments";

const PostInteraction = ({
  postId,
  likes,
  commentNumber,
}: {
  postId: string;
  likes: string[];
  commentNumber: number;
}) => {
  const { data } = useSession();

  if (!data?.user) {
    return null;
  }
  const [likeState, setLikeState] = useState({
    likeCount: likes.length,
    isLiked: data.user.id ? likes.includes(data.user.id) : false,
  });

  const [showComments, setShowComments] = useState(false);
  const [commentsOfEachPost, setCommentsOfEachPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [commentState, setCommentState] = useState({
    commentCount: commentNumber,
  });

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likeState,
    (state, value) => {
      return {
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    switchOptimisticLike("");

    try {
      switchLike(postId);
      setLikeState((state) => ({
        likeCount: state.isLiked ? state.likeCount - 1 : state.likeCount + 1,
        isLiked: !state.isLiked,
      }));
    } catch (error) {
      console.log("error: ", error);
    }
  };


  return (
    <div className="flex items-center px-2 justify-between text-sm mt-4 border-b-blue-100 pb-3 border-b">
      <div className="flex gap-8">
        {/* LIKE SECTION */}
        <div className="flex items-center gap-4 bg-slate-50 px-3 py-2 cursor-pointer rounded-md">
          <form action={likeAction}>
            <button>
              <Image
                src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                alt="like"
                className="w-4 h-4 cursor-pointer"
                width={16}
                height={16}
              />
            </button>
          </form>
          <span className="text-gray-400">| </span>
          <span className="text-gray-400">
            {optimisticLike.likeCount}
            <span className=""> Likes</span>
          </span>
        </div>

        {/* COMMENT SECTION */}
        <div
          className="flex items-center gap-4 bg-slate-50 px-3 py-2 rounded-md cursor-pointer"
        >
          <Image
            src="/comment.png"
            alt="like"
            className="w-4 h-4 cursor-pointer"
            width={16}
            height={16}
          />
          <span className="text-gray-400">| </span>
          <span className="text-gray-400">
            {commentState.commentCount > 0 ? (
              <span className="text-gray-700">
                {" "}
                {commentState.commentCount} comments
              </span>
            ) : (
              <span className="text-gray-500">Be the first to comment</span>
            )}
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 px-3 py-2 rounded-md cursor-pointer">
            <Image
              src="/share.png"
              alt="like"
              className="w-4 h-4 cursor-pointer"
              width={16}
              height={16}
            />
            <span className="text-gray-400">| </span>
            <span className="text-gray-400">
              <span className="">Share</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
