// import React from 'react'
// import { auth } from '@/auth'
// import { db } from '@/lib/db';

// const FeedUi = () => {

    
//   const { user} = await auth() 

//   console.log("USER FEED:",user)
//   let posts:any[] =[]

//   if(id) {
//     posts = await db.post.findMany({
//       where: {
//         user: {
//           id: id,
//         }
//       }, 
//       include: {
//         user: true, 
//         likes: {
//           select: {
//             userId: true, 
//           }
//         },
//         _count: {
//           select:{
//             comments: true
//           }
//         }
//       },
//       orderBy:{
//         createdAt: "desc",
//       }
//     })
//   }


//   if(!id && user.id){
//     const following = await db.follower.findMany({
//       where: {
//         followerId: user.id
//       },
//       select:{
//         followingId: true, 
//       }
//     })
//     const followingIds = following.map((follower) => follower.followingId)

//     posts = await db.post.findMany({
//         where: {
//           userId: {
//             in: followingIds,
//           }
//         },
//         include: {
//           user: true, 
//           likes: {
//             select: {
//               userId: true, 
//             }
//           },
//           _count: {
//             select:{
//               comments: true
//             }
//           }
//         },
//         orderBy:{
//           createdAt: "desc",
//         }           
//     })
//   }

    
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default FeedUi
