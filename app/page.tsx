import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Home = () => {
  return (
    <section>
      <div className="container mx-auto">
        <h1 className="text-6xl tracking-tight font-black mt-52 leading-[5rem]">
          Your All-In-One Image <br />Editing Toolbox: <br /> Simple, Fast, Effective
        </h1>
        <div className="mt-4">
          <Link href="/sign-up">
            <HoverBorderGradient>Get Started</HoverBorderGradient>
          </Link>
          <SignOutButton />
        </div>
      </div>
    </section>
  );
};

export default Home;
