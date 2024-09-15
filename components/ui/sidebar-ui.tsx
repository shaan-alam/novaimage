"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, {
  useState,
  createContext,
  useContext,
  RefAttributes,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, IconMenu2, IconProps, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
}

interface SidebarContextProps {
  open: boolean | undefined;
  setOpen:
    | React.Dispatch<React.SetStateAction<boolean>>
    | React.Dispatch<React.SetStateAction<boolean | undefined>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(openProp);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  return (
    <div className="mr-2 relative hidden md:block">
      <motion.div
        className={cn(
          "h-full hidden rounded-xl md:flex md:flex-col bg-background flex-shrink-0 border border-border",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 flex flex-row md:hidden items-center justify-between border-b border-border bg-white dark:bg-[#121212] fixed top-0 w-full z-30"
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full px-4">
          <IconMenu2
            className="text-black dark:text-white cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-screen w-full inset-0 bg-white dark:bg-[#121212] py-10 z-[100] flex flex-col justify-between border border-border",
                className
              )}
            >
              <div
                className="absolute right-4 top-2 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  isActive,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
  isActive: boolean;
}) => {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2  group/sidebar",
        open && "p-2",
        isActive
          ? "bg-primary rounded-xl text-primary-foreground"
          : "text-primary",
        className
      )}
      {...props}
    >
      <link.icon
        className={cn(
          "h-[30px] w-[30px] rounded-full p-1",
          isActive ? "text-primary-foreground" : "text-primary"
        )}
      />

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};
