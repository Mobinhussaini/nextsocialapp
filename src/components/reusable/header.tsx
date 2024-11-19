import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import LOGO from '../../../public/01_homtap_logo1.png'

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

interface HeaderPorps {
  label: string;
  color: string;
  size: string;
}

export const Header = ({
  label,
  color = "text-gray-600",
  size = "sm",
}: HeaderPorps) => {
  return (
    <>
      <Link
        href={"/"}
        className="cursor-pointer "
      >
        <BiArrowBack size={18} className="hover:bg-gray-200 rounded-full"  />
      </Link>
      <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        <Link href={"/"}>
          <h1
            className={cn(
              "cursor-pointer",
              font.className
            )}
          >
            <Image
                      src={LOGO}
                      width={96}
                      height={96}
                      alt={ "HOMTaP LOGO"}
                      className="  object-contain w-24 h-24 "
                    />
          </h1>
        </Link>
        <p
          className={`text-muted-foreground text-sm ${
            color === "red" ? "text-red-600" : "text-gray-600"
          } ${
            size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-xl"
          } `}
        >
          {label}
        </p>
      </div>
    </>
  );
};
