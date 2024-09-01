"use client";
import { getImageHeight, getImageWidth } from "@/lib/utils";
import { Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type TransformedImageProps = {
  data: Transformation,
  aspectRatio: string;
};

const TransformedImage = ({ data, aspectRatio }: TransformedImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const imageProps = {
    src: data.transformationURL,
    width: getImageWidth(aspectRatio),
    height: getImageHeight(aspectRatio),
  };

  return (
    <>
      {isLoading && <Skeleton className="w-full h-[400px]" />}
      <CldImage
        {...imageProps}
        alt="Transformation Image"
        onLoad={() => setLoading(false)}
        fillBackground
      />
    </>
  );
};

export default TransformedImage;
