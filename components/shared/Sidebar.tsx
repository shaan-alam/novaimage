"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarBody, Sidebar as SidebarUI } from "@/components/ui/sidebar-ui";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { User } from "@prisma/client";
import {
  IconCameraCancel,
  IconChevronDown,
  IconColorFilter,
  IconLayoutGrid,
  IconPhotoEdit,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import ThemeToggler from "./ThemeToggler";

export default function Sidebar({ user }: { user: User }) {
  const [openAITools, setOpenAITools] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarUI open={sidebarOpen} setOpen={setSidebarOpen}>
      <SidebarBody>
        <aside className="flex h-screen flex-col bg-zinc-1000 dark:bg-zinc-900 text-primary p-2 relative z-20 w-full md:w-[300px]">
          <div className="background">
            <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[80%] pt-[30%] left-[20%] top-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[50%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[35%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[50%] pt-[30%] right-[80%] top-[80%] transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center justify-between space-x-2">
              <UserButton />
              <span className="text-sm font-medium">{user.username}</span>
            </div>
            <ThemeToggler />
          </div>
          <nav className="flex-1 overflow-y-auto mt-5">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
              >
                <span className="flex items-center">
                  <IconLayoutGrid className="w-5 h-5 mr-2" />
                  Dashboard
                </span>
              </Button>
            </Link>

            <Collapsible open={openAITools} onOpenChange={setOpenAITools}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                >
                  <span className="flex items-center">
                    <IconSparkles className="w-5 h-5 mr-2" />
                    AI Tools
                  </span>
                  <IconChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform duration-200 ml-2",
                      openAITools ? "transform rotate-180" : ""
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4">
                <div className="animate-collapsible">
                  <Link href="/generative-fill">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                    >
                      <IconPhotoEdit className="w-5 h-5 mr-2" />
                      AI Generative Fill
                    </Button>
                  </Link>
                </div>
                <div className="animate-collapsible">
                  <Link href="/generative-recolor">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                    >
                      <IconColorFilter className="w-5 h-5 mr-2" />
                      AI Generative Recolor
                    </Button>
                  </Link>
                </div>
                <div className="animate-collapsible">
                  <Link href="/object-removal">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                    >
                      <IconCameraCancel className="w-5 h-5 mr-2" />
                      AI Object Removal
                    </Button>
                  </Link>
                </div>
                <div className="animate-collapsible">
                  <Link href="/image-gen">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                    >
                      <IconSparkles className="w-5 h-5 mr-2" />
                      AI Image Generation
                    </Button>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            {/* <ul>
              <li className="mt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-1 h-9 text-sm hover:bg-primary hover:text-primary-foreground text-primary/80"
                >
                  <span className="flex items-center">
                    <IconUser className="w-5 h-5 mr-2" />
                    Billing
                  </span>
                </Button>
              </li>
            </ul> */}
          </nav>
        </aside>
      </SidebarBody>
    </SidebarUI>
  );
}
