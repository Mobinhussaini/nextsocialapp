import React from "react";

const SocialSeperator = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full items-center flex flex-row justify-center mb-6 ">
        <span className="h-px mx-9 w-full bg-gray-200 "></span>
        <span className="flex flex-col text-red-700 underline font-bold  tracking-widest ">
          OR
        </span>
        <span className="h-px mx-9 w-full bg-gray-200 "></span>
      </div>
    </div>
  );
};

export default SocialSeperator;
