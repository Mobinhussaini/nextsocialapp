"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {
  
  const onClick = (provider: "google" | "facebook" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col space-y-3 w-full ">
      <div className="flex flex-row justify-between items-center w-full">
        <Button
          size="lg"
          className="hover:shadow-md w-full hover:shadow-green-300 "
          variant="outline"
          onClick={() => onClick("google")}
        >
          <div>
            Continue with <span className="font-semibold">GOOGLE</span>
          </div>
          <FcGoogle className="h-6 w-6" size={24} />
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <Button
          size="lg"
          className="hover:shadow-md w-full hover:shadow-green-300 "
          variant="outline"
          onClick={() => onClick("facebook")}
        >
          <div>
            Continue with <span className="font-semibold">FACEBOOK</span>
          </div>
          <FaFacebook className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-row justify-between items-center w-full">
        <Button
          size="lg"
          className="hover:shadow-md w-full hover:shadow-green-300 "
          variant="outline"
          onClick={() => onClick("github")}
        >
          <div>
            Continue with <span className="font-semibold">GITHUB</span>
          </div>
          <FaGithub className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Social;
