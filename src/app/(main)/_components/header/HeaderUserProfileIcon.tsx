"use client";

import Image from "next/legacy/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../context";

type HeaderUserProfileIconProps = {
  profileImage?: string;
};

export const HeaderUserProfileIcon = ({
  profileImage = "https://i.pinimg.com/736x/b2/b1/97/b2b197e5f03fc839ce36ffef82cfcf80.jpg",
}: HeaderUserProfileIconProps) => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
      >
        Sign in
      </Link>
    );
  }

  return (
    <Link href="/profile" className="cursor-pointer">
      <div className="relative h-9 w-9 overflow-hidden rounded-full">
        <Image
          src={profileImage}
          alt="profile_img"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </Link>
  );
};
