import { getTimeOfDay } from "@/app/lib/functions";
import { UserState } from "@/app/lib/types";
import Image from "next/image";
import React from "react";
import { FaRegUser } from "react-icons/fa";

interface UserWelcomeProps {
  user: UserState;
}

export default function UserWelcome({ user }: UserWelcomeProps) {
  const timeOfDay = getTimeOfDay();
  return (
    <div className="flex items-center gap-4">
      {user.photoUrl ? (
        <Image
          src={user.photoUrl}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="rounded-full ml-4 object-cover"
        />
      ) : (
        <div className="rounded-full w-20 h-20 bg-gray-300 shadow-md text-4xl ml-4 flex items-center justify-center text-gray-600">
          <FaRegUser />
        </div>
      )}
      <span>
        <h1 className="text-2xl font-bold">
          Good {timeOfDay}, {user.displayName || "Bookworm"}!
        </h1>
        <h3 className="text-lg font-thin">{user.email}</h3>
      </span>
    </div>
  );
}
