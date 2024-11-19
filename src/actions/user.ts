"use server";
import { auth } from "@/auth";
import { getUserByIdIncFollowersFollowingsPosts } from "@/data/user";

 

export const UserInfo = async ({params}: {params: {id: string}}) => {
    const {id} = params.id;

    const user = await getUserByIdIncFollowersFollowingsPosts(id); 

    // const { userId: currentUserId} = auth(); 

    // let isBlocked; 

    // if(currentUserId) {
    //   const res = await db.block.findFirst({
    //     where:{
    //       blockerId: user.id,
    //       blockedId: currentUserId, 
    //     }
    //   })
    //   if(res) isBlocked = true; 
    // }else {
    //   isBlocked = false;
    // }
    // if(isBlocked) return notFound(); 




}