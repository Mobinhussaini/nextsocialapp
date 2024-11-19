"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link
        href={href}
        className="hover:text-blue-600 hover:underline tracking-wider"
      >
        {label}
      </Link>
    </Button>
  );
};
