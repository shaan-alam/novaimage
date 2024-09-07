import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import SparklesText from "@/components/magicui/sparkles-text";
import { FAQAccordion } from "@/components/ui/accordian";
import { Benefits } from "@/components/ui/benefits";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { IconShare, IconTool, IconUpload } from "@tabler/icons-react";
import Image from "next/image";
import { testimonials, features } from "@/constants";
import Footer from "@/components/ui/footer";
import PricingSection from "@/components/ui/pricings";
import Link from "next/link";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <section className="min-h-screen relative z-40 gradient-bg-1">
        <GridPattern className="opacity-50" />
        <div className="relative z-10 container pt-24 px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center justify-center h-full">
          <AnimatedGradientText className="my-6 text-center">
            Introducing Nova Image
          </AnimatedGradientText>
          <h1 className="text-gray-200 font-bold text-2xl sm:text-4xl text-center">
            Transform Your Images with
          </h1>
          <h1 className="flex items-center text-5xl md:text-6xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-purple-400  p-4">
            <Image
              src="/images/logo.png"
              height={150}
              width={150}
              alt="Nova Image"
            />
            <span>Nova Image</span>
          </h1>
          <h4 className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            With Nova Image, unleash the power of AI to create, edit, and
            enhance images effortlessly.
          </h4>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
            <Link href="/sign-up">
              <Button className="w-full sm:w-auto">Get Started!</Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          <div className="mt-12 w-full px-4 sm:px-0">
            <div className="relative rounded-xl shadow-2xl">
              <BorderBeam />
              <Image
                src="/images/demo.png"
                alt="Demo"
                width={1920}
                height={960}
                layout="responsive"
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto pt-20 px-4 sm:px-6 lg:px-8 relative z-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-200">
            Easy as 1-2-3
          </h1>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent">
              <IconUpload className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-white text-lg sm:text-xl mb-4 mt-2">
                Upload Your Image
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Start by uploading an image you want to transform.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent">
              <IconTool className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-white text-lg sm:text-xl mb-4 mt-2">
                Choose Your Tool
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Select from our powerful AI tools to edit, recolor, or generate
                new visuals.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent">
              <IconShare className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-white text-lg sm:text-xl mb-4 mt-2">
                Download and Share
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Download your transformed image and share it with the world!
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 sm:pt-32 lg:pt-40 gradient-bg-1 bg-[length_150%] relative z-40">
        <GridPattern className="opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-200">
            Revolutionize Your Image Editing Experience
          </h1>
          <h4 className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            Explore our innovative features designed to transform your images
            with ease and precision.
          </h4>
          <div className="mt-12">
            <Benefits />
          </div>
        </div>
        <div className="container mx-auto pt-20 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-200 relative z-50">
            Discover the Power of Nova Image
          </h1>
          <h4 className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            Unlock a suite of AI-powered tools that effortlessly elevate your
            images with creativity and precision.
          </h4>
          <div className="mt-12">
            <StickyScroll content={features} contentClassName="" />
          </div>
        </div>
      </section>

      <section className="pt-20 sm:pt-32 lg:pt-40 bg-background relative">
        <GridPattern className="opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-200">
            What Our Users Are Saying
          </h1>
          <h4 className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            Hear from creators, designers, and businesses who trust Nova Image
            to elevate their visuals effortlessly.
          </h4>
          <div className="mt-12">
            <InfiniteMovingCards items={testimonials} speed="slow" />
          </div>
        </div>
      </section>

      <section className="pt-20 sm:pt-32 lg:pt-40 bg-background relative z-40">
        <GridPattern className="opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <div className="mt-12">
            <PricingSection />
          </div>
        </div>
      </section>

      <section className="pt-20 sm:pt-32 lg:pt-40 bg-background relative z-40">
        <GridPattern className="opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-200">
            Frequently Asked Questions
          </h1>
          <h4 className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            Find answers to common questions about using Nova Image and its
            AI-powered features.
          </h4>
          <div className="mt-12 w-full sm:w-3/4 lg:w-1/2 mx-auto">
            <FAQAccordion />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
