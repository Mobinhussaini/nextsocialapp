import Image from "next/image";
import React from "react";

const Ad = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      {/* TOP */}

      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image
          src="/more.png"
          alt="more"
          width={16}
          height={16}
          className="w-4 h-4"
        />
      </div>

      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://images.pexels.com/photos/28795942/pexels-photo-28795942/free-photo-of-elegant-bridal-bouquet-with-pink-roses.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Ad"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/28795942/pexels-photo-28795942/free-photo-of-elegant-bridal-bouquet-with-pink-roses.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt="Ad"
            width={24}
            height={24}
            className="rounded-lg w-6 h-6 object-cover"
          />
          <span className="font-medium text-blue-500">Wayne Burton</span>
        </div>
        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {size === "sm"
            ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, dignissimos!"
            : size === "md"
            ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, dignissimos! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 2"
            : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, dignissimos! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, dignissimos! Lorem ipsum, dolor sit amet consectetur adipisicing elit. 3"}
        </p>
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">Learn more...</button>
      </div>
    </div>
  );
};

export default Ad;
