"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const switchFollow = async (userId: string) => {
  const { user: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not authenticated");
  }

  try {
    const existingFollow = await db.follower.findFirst({
      where: {
        followerId: currentUser.id,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await db.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const existingFollowRequest = await db.followRequest.findFirst({
        where: {
          senderId: currentUser.id,
          receiverId: userId,
        },
      });

      if (existingFollowRequest) {
        await db.followRequest.delete({
          where: {
            id: existingFollowRequest.id,
          },
        });
      } else {
        await db.followRequest.create({
          data: {
            senderId: currentUser.id,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("SOMETHING WENT WRONG!");
  }
};

// Block switch function:

export const switchBlock = async (userId: string) => {
  const { user: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const existingBlock = await db.block.findFirst({
      where: {
        blockerId: currentUser.id,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await db.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await db.block.create({
        data: {
          blockerId: currentUser.id,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const acceptFollowRequest = async (senderId: string) => {
  const { user: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const existingFollowRequest = await db.followRequest.findFirst({
      where: {
        senderId: senderId,
        receiverId: currentUser.id,
      },
    });

    if (existingFollowRequest) {
      await db.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
    await db.follower.create({
      data: {
        followerId: senderId,
        followingId: currentUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const declineFollowRequest = async (senderId: string) => {
  const { user: currentUser } = await auth();

  if (!currentUser) {
    throw new Error("User is not Authenticated!");
  }

  try {
    const existingFollowRequest = await db.followRequest.findFirst({
      where: {
        senderId: senderId,
        receiverId: currentUser.id,
      },
    });

    if (existingFollowRequest) {
      await db.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const updateProfile = async (
  prevState: { success: boolean; error: boolean },
  payload: {
    formData: FormData;
    cover: string;
    image: string;
  }
) => {
  const { formData, cover, image } = payload;
  const fields = Object.fromEntries(formData);

  const filteredFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    image: z.string().optional(),
    name: z.string().max(60).optional(),
    email: z.string().email().optional(),
    surname: z.string().max(60).optional(),
    description: z.string().max(255).optional(),
    city: z.string().max(60).optional(),
    school: z.string().max(60).optional(),
    work: z.string().max(60).optional(),
    website: z.string().max(120).optional(),
  });

  const validatedFields = Profile.safeParse({
    cover,
    image,
    ...filteredFields,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { user } = await auth();

  if (!user.id) {
    return { success: false, error: true };
  }

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: validatedFields.data,
    });

    return { success: true, error: false };
  } catch (error) {
    console.log("SOMETHING WENT WRONG", error);
    return { success: false, error: true };
  }
};

export const switchLike = async (postId: string) => {
  const { user } = await auth();

  if (!user) throw new Error("User is not authenticated!");

  try {
    const existingLike = await db.like.findFirst({
      where: {
        postId: postId,
        userId: user.id,
      },
    });

    if (existingLike) {
      await db.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await db.like.create({
        data: {
          postId: postId,
          userId: user.id,
        },
      });
    }
  } catch (error) {
    console.log("SOMETHING WENT WRONG", error);
    throw new Error("Something went wrong!");
  }
};

export const addComment = async (postId: string, desc: string) => {
  const { user } = await auth();
  if (!user) throw new Error("User is not authenticated!");

  try {
    const createdComment = await db.comment.create({
      data: {
        desc,
        userId: user.id,
        postId,
      },
      include: {
        user: true,
      },
    });
    return createdComment;
  } catch (error) {
    console.log("SOMETHING WENT WRONG", error);
    throw new Error("Something went wrong!");
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;

  } catch (error) {
    console.log("SOMETHING WENT WRONG", error);
    throw new Error("Something went wrong!");
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const userPosts = await db.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userPosts; 
  } catch (error) {
    console.log(error)
  }

}

export const getAllCommentsOfAPost = async (postId: string)=> {
  try {
    const comments = await db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: true,
      },
    });
    return comments
    
  } catch (error) {
    console.log("SOMETHING WENT WRONG", error);
    throw new Error("Something went wrong!");
  }
}


export const addPost = async (formData:FormData, img:string)=>{

  const desc  = formData.get('desc') as string; 
  const Desc = z.string().min(3).max(255); 
  const validatedDesc = Desc.safeParse(desc); 

  if(!validatedDesc.success){
    console.log(validatedDesc.error.flatten().fieldErrors);
    return;
  }

const { user } = await auth(); 
if(!user) throw new Error('User is not authenticated!');

try {

  await db.post.create({
    data: {
      desc: validatedDesc.data,
      userId: user.id,
      img
    }
  })
  revalidatePath("/"); 
  
} catch (error) {
  console.log(error)
}

}

