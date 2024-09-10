import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full hidden lg:block lg:w-[30%] lg:h-auto rounded-tr-xl rounded-br-xl overflow-hidden relative border border-border">
        <div className="background bg-transparent">
          <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[30%] pt-[30%] top-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[30%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] right-[80%] top-[80%] transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="space-y-4 p-6">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">
            Welcome to Nova Image
          </h1>
          <p className="text-base mt-6 text-muted-foreground">
            Sign in now to unleash your creativity and transform your images
            like never before!
          </p>
          <Link href="/">
            <Button className="mt-6">Back</Button>
          </Link>
        </div>
        <div className="absolute top-[100%] -translate-y-[80%] w-[90%] left-1/2">
          <img
            src="/images/demo1.png"
            alt="Placeholder image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="w-full lg:w-[70%] flex-grow flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-md">
          <SignIn
            signUpFallbackRedirectUrl={
              process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
            }
          />
        </div>
      </div>
    </div>
  );
}
