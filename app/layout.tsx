import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Artsy",
  description: "Online Image enhancer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider defaultTheme="dark" attribute="class">
            {children}
          </ThemeProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              loading: {
                className: "text-base p-4",
                icon: (
                  <Image
                    alt="Loader"
                    height={14}
                    width={14}
                    src="/images/loader.svg"
                    className="h-4 w-4"
                  />
                ),
              },
              error: {
                className: "text-base bg-destructive text-white",
                style: {
                  background: "hsl(0 62.8% 30.6%)",
                },
              },
              success: {
                icon: <IconRosetteDiscountCheckFilled size={15} />,
                className: "text-base p-4",
              },
              style: {
                background: "#182027",
                color: "#fff",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
