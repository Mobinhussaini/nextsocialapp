import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByIdIncFollowersFollowings = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            followers: true,
            followings: true,
            posts: true, 
          },
        },
      },
    });

    return user; 
  } catch {
    return null;
  }
};
