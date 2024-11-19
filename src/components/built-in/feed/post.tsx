// "use server";

// import React from "react";
// import Feed from "./feed";
// import { db } from "@/lib/db";
// import { auth } from "@/auth";

// const Post = async () => {
//   const { user } = await auth();

//   if (!user) return <p>Not Authenticated!</p>;

//   try {
//     const following = await db.follower.findMany({
//       where: {
//         followerId: user.id,
//         OR: [{ followingId: user.id }],
//       },
//       select: {
//         followingId: true,
//       },
//     });

//     const followingIds = following.map(
//       (follower) => follower.followingId || follower.followerId
//     );

//     const posts = await db.post.findMany({
//       where: {
//         userId: {
//           in: followingIds,
//         },
//       },
//       include: {
//         user: true,
//         likes: {
//           select: {
//             userId: true,
//           },
//         },
//         _count: {
//           select: {
//             comments: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return <Feed posts={posts} />;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return <p>Something went wrong!</p>;
//   }
// };

// export default Post;
