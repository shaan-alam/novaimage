"use client";
import { dataUrl } from "@/lib/utils";
import { Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type OriginalImageProps = {
  transformation: Transformation;
  slot?: string;
};

const OriginalImage = ({
  transformation,
  slot = "first",
}: OriginalImageProps) => {
  return (
    <CldImage
      src={transformation?.publicId}
      alt="Original Image"
      placeholder={dataUrl as PlaceholderValue}
      height={transformation.original_height}
      width={transformation.original_width}
      slot={slot}
    />
  );
};

export default OriginalImage;
