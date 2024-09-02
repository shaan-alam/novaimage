"use client";
import { Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type TransformedImageProps = {
  data: Transformation;
  aspectRatio: string;
};

const TransformedImage = ({ data, aspectRatio }: TransformedImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      {isLoading && <Skeleton className="w-full h-[400px]" />}
      <CldImage
        src={data.transformationURL}
        alt="Transformation Image"
        onLoad={() => setLoading(false)}
        fillBackground
        aspectRatio={aspectRatio}
      />
    </>
  );
};

export default TransformedImage;
