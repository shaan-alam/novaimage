"use client";
import {
  SidebarBody,
  SidebarLink,
  Sidebar as SidebarUI,
} from "@/components/ui/sidebar-ui";
import { SIDEBAR_LINKS } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Theme } from "@clerk/types";
import { User } from "@prisma/client";
import { IconCoin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <SidebarUI>
      <SidebarBody className="bg-gradient-to-br from-neutral-900 to-transparent bg-opacity-20">
        <div className="h-[95vh] flex flex-col">
          <div className="my-6 flex items-center space-x-2">
            <Image
              src="/images/artsy_logo.png"
              alt="Artsy logo"
              height={100}
              width={100}
              className="h-[50px] w-[50px]"
            />
            <h1 className="font-bold text-2xl">Artsy</h1>
          </div>
          <div>
            <ul>
              {SIDEBAR_LINKS.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarLink
                    link={item}
                    key={item.href}
                    className="my-4"
                    isActive={isActive}
                  />
                );
              })}
            </ul>
          </div>
          <div className="mt-auto">
            <Link href="buy-credits">
              <div className="flex items-center space-x-4 text-neutral-700 hover: dark:text-neutral-200 text-sm mb-6 hover:bg-neutral-700 rounded-xl py-2 px-2">
                <IconCoin color="gold" />
                <p>Buy Credits</p>
              </div>
            </Link>
            <div className="flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <UserButton appearance={dark as Theme} />
                <p className="text-gray-300 font-medium">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <p className="text-gray-400 text-xs">10 Credits</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarBody>
    </SidebarUI>
  );
};

export default Sidebar;
