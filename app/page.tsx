"use client";

import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import GridPattern from "@/components/magicui/animated-grid-pattern";
import { BorderBeam } from "@/components/magicui/border-beam";
import Navbar from "@/components/shared/navbar";
import { FAQAccordion } from "@/components/ui/accordian";
import { Benefits } from "@/components/ui/benefits";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import PricingSection from "@/components/ui/pricings";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { features, testimonials } from "@/constants";
import { IconShare, IconTool, IconUpload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnimatedHeading = ({ children, className }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.h1
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
    >
      {children}
    </motion.h1>
  );
};

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <section className="min-h-screen relative z-40">
          <GridPattern className="opacity-50" />
          <div className="background">
            <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[30%] pt-[30%] left-[20%] top-[20%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[40%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] right-[80%] top-[80%] transform translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <motion.div
            className="relative z-10 container pt-24 px-4 sm:px-6 lg:px-8 mx-auto flex flex-col items-center justify-center h-full"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.div variants={fadeInUp}>
              <AnimatedGradientText className="my-4 text-center">
                Introducing Nova Image
              </AnimatedGradientText>
            </motion.div>
            <AnimatedHeading className="text-secondary-foreground font-bold text-2xl sm:text-4xl text-center">
              Transform Your Images with
            </AnimatedHeading>
            <motion.div className="flex items-center" variants={fadeInUp}>
              <h1 className="text-5xl md:text-6xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E91E63] to-purple-400  p-4">
                <span>Nova Image</span>
              </h1>
            </motion.div>

            <motion.h4
              className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              variants={fadeInUp}
            >
              With Nova Image, unleash the power of AI to create, edit, and
              enhance images effortlessly.
            </motion.h4>
            <motion.div
              className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4"
              variants={fadeInUp}
            >
              <Link href="/sign-up">
                <Button className="w-full sm:w-auto">Get Started!</Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto">
                View Demo
              </Button>
            </motion.div>
            <motion.div
              className="mt-12 w-full px-4 sm:px-0"
              variants={fadeInUp}
            >
              <div className="relative rounded-xl shadow-2xl">
                <BorderBeam />
                <Image
                  src="/images/demo.png"
                  alt="Demo"
                  width={1920}
                  height={960}
                  className="rounded-lg"
                  layout="responsive"
                />
              </div>
            </motion.div>
          </motion.div>
          <div className="container mx-auto pt-20 px-4 sm:px-6 lg:px-8 relative z-20">
            <AnimatedHeading className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-secondary-foreground">
              Easy as 1-2-3
            </AnimatedHeading>
            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              <motion.div
                className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent"
                variants={fadeInUp}
              >
                <IconUpload className="w-8 h-8 sm:w-10 sm:h-10" />
                <h1 className="text-primary font-bold text-lg sm:text-xl mb-4 mt-2">
                  Upload Your Image
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Start by uploading an image you want to transform.
                </p>
              </motion.div>
              <motion.div
                className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent"
                variants={fadeInUp}
              >
                <IconTool className="w-8 h-8 sm:w-10 sm:h-10" />
                <h1 className="text-primary font-bold text-lg sm:text-xl mb-4 mt-2">
                  Choose Your Tool
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Select from our powerful AI tools to edit, recolor, or
                  generate new visuals.
                </p>
              </motion.div>
              <motion.div
                className="p-6 sm:p-8 lg:p-12 border border-secondary rounded-xl backdrop-blur-3xl bg-gradient-to-br from-background to-transparent"
                variants={fadeInUp}
              >
                <IconShare className="w-8 h-8 sm:w-10 sm:h-10" />
                <h1 className="text-primary font-bold text-lg sm:text-xl mb-4 mt-2">
                  Download and Share
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Download your transformed image and share it with the world!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="pt-20 sm:pt-32 lg:pt-40 bg-[length_150%] relative z-40">
          <div className="background">
            <div className="gradient bg-gradient-to-br from-[#61dbfa] to-[#7bff00] w-[15%] pt-[10%] right-[80%] top-[80%] transform translate-x-1/2 -translate-y-1/2 opacity-40"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[30%] pt-[30%] left-[20%] top-[30%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[40%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
            <AnimatedHeading className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-secondary-foreground">
              Revolutionize Your Image Editing Experience
            </AnimatedHeading>
            <motion.h4
              className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Explore our innovative features designed to transform your images
              with ease and precision.
            </motion.h4>
            <motion.div
              className="mt-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Benefits />
            </motion.div>
          </div>
          <div className="container mx-auto pt-20 px-4 sm:px-6 lg:px-8">
            <AnimatedHeading className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-secondary-foreground relative z-50">
              Discover the Power of Nova Image
            </AnimatedHeading>
            <motion.h4
              className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Unlock a suite of AI-powered tools that effortlessly elevate your
              images with creativity and precision.
            </motion.h4>
            <motion.div
              className="mt-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <StickyScroll content={features} contentClassName="" />
            </motion.div>
          </div>
        </section>

        <section className="pt-20 sm:pt-32 lg:pt-40 bg-background relative">
          <div className="background">
            <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[30%] pt-[30%] left-[20%] top-[30%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[40%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] left-[80%] top-[80%] transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
            <AnimatedHeading className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-secondary-foreground">
              What Our Users Are Saying
            </AnimatedHeading>
            <motion.h4
              className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Hear from creators, designers, and businesses who trust Nova Image
              to elevate their visuals effortlessly.
            </motion.h4>
            <motion.div
              className="mt-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <InfiniteMovingCards items={testimonials} speed="slow" />
            </motion.div>
          </div>
        </section>

        <section className="pt-20 sm:pt-32 lg:pt-40 bg-background relative z-40">
          <div className="background">
            <div className="gradient bg-gradient-to-br from-[#efdb0a] to-[#e420ef] w-[30%] pt-[30%] left-[20%] top-[35%] transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#ff7800] to-[#1c71d8] w-[40%] pt-[40%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="gradient bg-gradient-to-br from-[#c061cb] to-[#e01b24] w-[30%] pt-[30%] left-[80%] top-[40%] transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
            <motion.div
              className="mt-12"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <PricingSection />
            </motion.div>
          </div>

          <div className="container mx-auto px-4">
            <AnimatedHeading className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-secondary-foreground">
              Frequently Asked Questions
            </AnimatedHeading>
            <motion.h4
              className="text-muted-foreground text-center text-lg sm:text-xl my-4 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              Find answers to common questions about using Nova Image and its
              AI-powered features.
            </motion.h4>
            <motion.div
              className="mt-12 w-full sm:w-3/4 lg:w-1/2 mx-auto"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <FAQAccordion />
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Home;
