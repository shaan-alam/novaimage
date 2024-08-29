"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/shared/Sidebar";
import { SIDEBAR_LINKS } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="bg-neutral-900 flex">
      <Sidebar>
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
            
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
};

export default DashboardLayout;
