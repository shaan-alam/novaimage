"use client";
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
    width: data.transformed_width as number,
    height: data.transformed_height as number,
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
