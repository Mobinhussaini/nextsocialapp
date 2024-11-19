"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useFormStatus } from "react-dom";
import { addPost } from "@/actions/actions";

const AddPost = () => {
  const { data } = useSession();
  const { pending } = useFormStatus();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<any>("");

  if (!data) {
    return <p>Not logged in</p>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/27893233/pexels-photo-27893233/free-photo-of-woman-in-shirt-photographing-with-digital-camera.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        className="w-12 h-12 object-cover rounded-full"
        alt="Avatar"
        width={48}
        height={48}
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT  */}
        <form action={(formData)=> addPost(formData, img?.secure_url || "")} className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            cols={30}
            rows={3}
            name="desc"
            onChange={(e) => setDesc(e.target.value)}
            className="w-full bg-slate-50 rounded-lg p-2"
          ></textarea>
          <Image
            src="/emoji.png"
            alt="emoji"
            width={20}
            height={20}
            className="w-5 h-5 cursor-pointer self-end"
          />
          <div className="flex flex-col">
            <div className="flex flex-row mt-12 gap-1">
              <Button
                type="submit"
                disabled={pending}
                className="flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-white"
                size={"sm"}
                variant={"outline"}
              >
                <SendIcon size={12} />
                Send
              </Button>
            </div>
          </div>
        </form>

        {/* POST OPTIONS */}
        <div className="flex items-center pt-3 gap-4 text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  onClick={() => open()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    src="/addimage.png"
                    alt="addImage"
                    width={20}
                    height={20}
                  />
                  Photo
                </div>
              );
            }}
          </CldUploadWidget>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="Add Video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="Poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="Add Event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
