"use client";

import React, { useState, useEffect } from "react";
import Feed from "@/components/built-in/feed/feed";

import { getAllPosts } from "@/actions/actions";
import { Post, User } from "@prisma/client";

type PostAndUser = Post & { User: User };
const FeedPage = () => {
  const [posts, setPosts] = useState<PostAndUser>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error?.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }
  if (!posts || posts === null || posts === undefined) {
    return <p className="text-center mt-4">No posts found! from FeeDPage</p>;
  }

  return <Feed posts={posts} type="home"  />;
};

export default FeedPage;
