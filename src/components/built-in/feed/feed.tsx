import React from "react";
import Image from "next/image";
import PostInteraction from "./post-interaction";
import Comments from "./comments";
import { Post, User } from "@prisma/client";

type PostAndUserType = Post & { User: User };

const Feed = ({
  posts,
  type,
}: {
  posts: PostAndUserType;
  type: "home" | "profile";
}) => {
  if (!posts || posts === null || posts === undefined) {
    return (
      <p className="text-center text-gray-500">No posts found! from Feed</p>
    );
  }

  const formatCreatedDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="flex flex-col gap-1">
      {posts &&
        posts.map((post) => (
          <div className="flex flex-col gap-4 rounded-lg  p-3 shadow-md  bg-white" key={post.id}>
            {/* USER */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image
                  src={post.user.image || "/noAvatar.png"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="flex flex-col">
                  <span className="font-medium">{post.user.name}</span>
                  <p className="text-[11px] text-gray-400">
                    Posted: {formatCreatedDate(post.createdAt)}
                  </p>
                </div>
              </div>
              <Image
                src="/more.png"
                alt="Options"
                className="w-4 h-4"
                width={16}
                height={16}
              />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-4">
              {/* {post.img && ( */}
              <div className="w-full relative">
                <Image
                  src={post.img}
                  alt="Post Image"
                  width={500}
                  height={300}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              {/* )} */}
              <p className="px-6 py-3 text-sm">{post.desc}</p>
            </div>

            {/* INTERACTION */}
            <PostInteraction
              postId={post.id}
              likes={post.likes.map((like) => like.userId)}
              commentNumber={post._count.comments}
            />
            <Comments postId={post.id} />
          </div>
        ))}
    </div>
  );
};

export default Feed;
