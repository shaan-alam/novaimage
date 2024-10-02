"use client";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Generation, Recolor, Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import DeleteGenerationDialog from "./DeleteGenerationDialog";
import ExportGeneration from "./ExportGeneration";

type ImageGenerationProps = {
  generation: Generation;
};

const ImageGenerationCard = ({ generation }: ImageGenerationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{
        scale: 0.85,
        opacity: 0,
        filter: "blur(10px)",
      }}
      animate={
        hasAnimated
          ? {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <Card className="relative h-[300px] w-[300px] group cursor-pointer hover:scale-105 transition-all group">
        <div className="absolute inset-0 h-full w-full z-10 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100"></div>
        <div className="absolute z-20 h-full w-full items-end justify-start p-4 hidden group-hover:flex space-x-2">
          <DeleteGenerationDialog generationId={generation.id} />
          <ExportGeneration url={generation.imageUrl} onCard />
        </div>
        <Image
          src={generation.imageUrl}
          height={generation.height}
          width={generation.width}
          alt={generation.prompt}
        />
      </Card>
    </motion.div>
  );
};

export default ImageGenerationCard;
