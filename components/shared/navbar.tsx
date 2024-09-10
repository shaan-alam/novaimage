"use client";

import { Button } from "@/components/ui/button";
import { IconLayoutDashboard } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-background/70 fixed top-0 left-0 right-0 z-[70] backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo.png"
                height={50}
                width={50}
                alt="Nova Image Logo"
              />
              <span className="font-bold text-xl text-primary">Nova Image</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggler />
            <SignedOut>
              <Link href="/sign-in">
                <Button className="w-full sm:w-auto">Sign In</Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link href="/dashboard" passHref>
                <Button variant="outline" className="mr-4">
                  <IconLayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
