'use client';
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
import Image from "next/image";
import { usePathname } from "next/navigation";

const Sidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <SidebarUI>
      <SidebarBody>
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
          <div className="mt-auto flex items-center space-x-2">
            <UserButton appearance={dark as Theme} />
            <p className="text-gray-400">{user?.first_name} {user?.last_name}</p>
          </div>
        </div>
      </SidebarBody>
    </SidebarUI>
  );
};

export default Sidebar;
