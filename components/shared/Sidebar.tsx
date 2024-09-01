"use client";
import {
  SidebarBody,
  SidebarLink,
  Sidebar as SidebarUI,
} from "@/components/ui/sidebar-ui";
import { SIDEBAR_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Theme } from "@clerk/types";
import { User } from "@prisma/client";
import { IconCoin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <SidebarUI open={open} setOpen={setOpen}>
      <SidebarBody className="fixed top-0 left-1 z-30">
        <div className="h-[95vh] flex flex-col">
          <div className="my-6 flex items-center space-x-2">
            <Image
              src="/images/artsy_logo.png"
              alt="Artsy logo"
              height={100}
              width={100}
              className={cn(
                "object-cover transition-all",
                !open ? "h-[30px] w-[30px]" : "h-[50px] w-[50px]"
              )}
            />
            <h1
              className={cn(
                "font-bold text-2xl transition-all",
                open ? "opacity-100" : "opacity-0"
              )}
            >
              Artsy
            </h1>
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
            <Link
              href="buy-credits"
              className={cn(
                "text-neutral-400 hover:dark:text-neutral-200 text-sm mb-6 hover:bg-neutral-700 rounded-xl",
                open ? "flex items-center space-x-2 p-2" : "block"
              )}
            >
              <IconCoin
                color="gold"
                className={cn("h-[20px] w-[20px] rounded-full")}
              />
              <p
                className={cn(
                  "transition-all",
                  open ? "opacity-100" : "opacity-0"
                )}
              >
                Buy Credits
              </p>
            </Link>
            <div className="flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <UserButton appearance={dark as Theme} />
                <p
                  className={cn(
                    "text-gray-300 font-medium transition-all duration-500",
                    open ? "block" : "hidden"
                  )}
                >
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <p
                  className={cn(
                    "text-gray-400 text-xs transition-all duration-500",
                    open ? "block" : "hidden"
                  )}
                >
                  10 Credits
                </p>
              </div>
            </div>
          </div>
        </div>
      </SidebarBody>
    </SidebarUI>
  );
};

export default Sidebar;
