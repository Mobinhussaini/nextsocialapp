"use client";

import React, { useActionState, useState } from "react";
import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";

// db lib and actions;
import { User } from "@prisma/client";
import { updateProfile } from "@/actions/actions";
import { useRouter } from "next/navigation";
import UpdateButton from "@/components/reusable/update-button";

const UpdateUserPage = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>("");
  const [profileImage, setProfileImage] = useState<any>("");

  const [state, formAction] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
    if (state.success) {
      router.refresh();
    }
  };

  const handleOpen = () => {
    setOpen(true);
    state.success = false;
    state.error = false;
  };

  return (
    <div>
      <span
        onClick={handleOpen}
        className="text-blue-500 cursor-pointer text-xs"
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
          <form
            action={(formData) =>
              formAction({
                formData,
                cover: cover?.secure_url,
                image: profileImage?.secure_url,
              })
            }
            className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative"
          >
            <div className="flex flex-col items-center">
              <h1 className="xl:text-3xl text-2xl uppercase">Update Profile</h1>
              <div className="mt-4 text-lg font-thin text-gray-700">
                Use the navbar profile to change the avatar or username.
              </div>
            </div>
            <div className="flex flex-col justify-between gap-y-3">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="name" className="text-xs text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.name || "John Doe"}
                  />
                </div>
                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="email" className="text-xs text-gray-500">
                    email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.email || "example@example.com"}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="surname" className="text-xs text-gray-500">
                    surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.surname || ""}
                  />
                </div>

                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="city" className="text-xs text-gray-500">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.city || ""}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="school" className="text-xs text-gray-500">
                    School
                  </label>
                  <input
                    type="text"
                    name="school"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.school || ""}
                  />
                </div>

                <div className="flex flex-col gap-y-1 ">
                  <label htmlFor="work" className="text-xs text-gray-500">
                    Work
                  </label>
                  <input
                    type="text"
                    name="work"
                    className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                    placeholder={user.work || ""}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-1 w-1/2 ">
                <label htmlFor="website" className="text-xs text-gray-500">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                  placeholder={user.website || ""}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-1 ">
              <label htmlFor="description" className="text-xs text-gray-500">
                About Your Self
              </label>
              <textarea
                rows={4}
                cols={30}
                name="description"
                className="bg-white rounded-md ring-gray-300 p-[6px] ring-1 text-sm "
                placeholder={user.description || ""}
              />
            </div>
            <div
              className="cursor-pointer absolute text-red-600 text-xl right-4 top-2 tracking-widest uppercase"
              onClick={handleClose}
            >
              x
            </div>

            {/* COVER PICTURE */}
            <div className="flex flex-row justify-between items-center ">
              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result) => setCover(result.info)}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4"
                      onClick={() => open()}
                    >
                      <label htmlFor="">Cover Picture</label>
                      <div className="flex flex-col  gap-1 cursor-pointer">
                        <Image
                          src={user.cover || "/noCover.png"}
                          alt={user.name || "No Cover"}
                          height={96}
                          width={160}
                          className="w-40 h-24 rounded-md object-fill"
                        />
                        <span className="text-sm ml-1 text-blue-600 hover:text-blue-800 hover:underline">
                          Change
                        </span>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>

              {/* PROFILE PICTURE */}

              <CldUploadWidget
                uploadPreset="social"
                onSuccess={(result) => setProfileImage(result.info)}
              >
                {({ open }) => {
                  return (
                    <div
                      className="flex flex-col gap-4 my-4 pr-16"
                      onClick={() => open()}
                    >
                      <label htmlFor="">Profile Picture</label>
                      <div className="flex flex-col items-start cursor-pointer">
                        <Image
                          src={user.image || "/noAvatar.png"}
                          alt={user.name || "No Avatar"}
                          height={96}
                          width={96}
                          className="w-24 h-24 rounded-md object-cover"
                        />
                        <span className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                          Change
                        </span>
                      </div>
                    </div>
                  );
                }}
              </CldUploadWidget>
            </div>

            <div className="px-auto">
              {state.success && (
                <span className="text-green-600 ">
                  Profile has been updated!
                </span>
              )}
              {state.error && (
                <span className="text-red-600">
                  Sorry, something went wrong!
                </span>
              )}
            </div>
            <UpdateButton />
            {/* <button
              type="submit"
              className="bg-blue-600 text-white  py-3 rounded-sm mt-4"
            >
              Save
            </button> */}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUserPage;
