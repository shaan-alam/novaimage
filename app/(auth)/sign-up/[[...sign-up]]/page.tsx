import { Wavebackgound } from "@/components/ui/wave-background";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Theme } from "@clerk/types";

export default function Page() {
  return (
    <div className="h-screen">
      <Wavebackgound />
      <div className="flex h-screen relative w-full justify-center items-center">
        <SignUp
          appearance={dark as Theme}
          signInFallbackRedirectUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
          }
        />
      </div>
    </div>
  );
}
