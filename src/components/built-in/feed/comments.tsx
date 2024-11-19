"use client";

import React, { useState } from "react";
import { db } from "@/lib/db";
import CommentList from "./comment-list";
import { getAllCommentsOfAPost } from "@/actions/actions";

const Comments = ({ postId }: { postId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const getComments = await getAllCommentsOfAPost(postId);
      setComments(getComments);
      setLoading(false);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if(error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <CommentList comments={comments} postId={postId} />
    </div>
  );
};

export default Comments;
