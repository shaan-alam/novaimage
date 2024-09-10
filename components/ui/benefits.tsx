"use client";
import Image from "next/image";
import { WobbleCard } from "../ui/wobble-card";

export function Benefits() {
  return (
    <div className="my-12 grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Intuitive Interface
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Designed for ease of use, whether you’re a pro or a beginner.
          </p>
        </div>
        <Image
          src="/images/novaimage-demo.svg"
          width={400}
          height={400}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[5%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Cutting-Edge AI Technology
        </h2>
        <p className="mt-4 w-3/4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Powered by advanced AI models that deliver high-quality results every
          time.
        </p>
        <Image
          src="/images/AI.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -z-10 -right-4 lg:-right-[30%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-1 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Affordable Plans
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Flexible pricing to suit all needs, from casual users to
            professional designers.
          </p>
        </div>
        <Image
          src="/images/dollar.svg"
          width={170}
          height={170}
          alt="linear demo image"
          className="absolute -bottom-6 -right-4 object-contain rounded-2xl -z-10 -rotate-[20deg]"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-green-600 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Regular Updates and New Features
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            We are constantly improving Nova Image to bring you new features and
            better performance.
          </p>
        </div>
        <Image
          src="/images/regular-updates.svg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
