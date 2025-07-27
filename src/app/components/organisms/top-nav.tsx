"use client";

import { usePathname } from "next/navigation";
import images from "@/app/assets/list-image";
import Image from "next/image";
import Link from "next/link";
import SelectLanguange from "../molecules/select-language";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Notification02Icon } from "@hugeicons/core-free-icons";
import { Bell, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavItem = [
  { id: 1, label: "Home", link: "/" },
  { id: 2, label: "Explore", link: "/explore" },
  { id: 3, label: "Application", link: "/application" },
  { id: 4, label: "Saved job", link: "/saved" },
];

const TopNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full top-0 sticky z-10 bg-white py-2 lg:px-6 px-4 flex items-center justify-between border-b border-gray-50">
      <div className="flex items-baseline-last space-x-8">
        <div className="flex items-center space-x-0">
          <Image
            src={images.logo}
            alt="next_leap_logo"
            width={35}
            height={35}
            priority={true}
          />
          <h1 className="text-md font-semibold text-neutral-900">Next Leap</h1>
        </div>
        <ul className="lg:flex items-center gap-x-6  hidden">
          {NavItem.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li key={item.id} className="text-xs ">
                <Link
                  href={item.link}
                  className={
                    isActive
                      ? "text-black font-bold"
                      : "text-gray-700 hover:text-black"
                  }
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center">
        <div className="flex items-center lg:px-6 px-0 lg:border-r border-gray-100 gap-x-4">
          <SelectLanguange />
          <Button className="relative hover:bg-gray-100 px-1 py-2 has-[>svg]:px-2 cursor-pointerz  w-auto h-auto bg-white border shadow-none border-gray-200 rounded-full">
            <Bell className="text-black " />
            <div className="w-[6px] h-[6px] rounded-full bg-red-600 absolute top-2 right-2" />
          </Button>
          <Button className="relative hover:bg-gray-100 px-1 py-2 has-[>svg]:px-2 cursor-pointerz  w-auto h-auto bg-white border shadow-none border-gray-200 rounded-full">
            <MessageCircle className="text-black " />
            <div className="w-[6px] h-[6px] rounded-full bg-red-600 absolute top-2 right-2" />
          </Button>
        </div>
        <div className="items-center space-x-2 ml-6 lg:flex hidden">
         <h1 className="text-sm font-semibold text-neutral-900">Antony Goat</h1>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
