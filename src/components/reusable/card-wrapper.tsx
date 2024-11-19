"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/reusable/header";
import Social from "@/components/auth/social";
import { BackButton } from "@/components/reusable/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonPath: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonPath,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className="w-[400px] shadow-md bg-white my-12 flex flex-col items-center lg:px-12 px-6 ">
      <div className="min-w-[400px]">
        <CardHeader>
          <Header label={headerLabel} color="gray" size="md" />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonPath} />
        </CardFooter>
      </div>
    </div>
  );
};

export default CardWrapper;
