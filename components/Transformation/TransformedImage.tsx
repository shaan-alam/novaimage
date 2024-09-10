"use client";
import { dataUrl } from "@/lib/utils";
import { TransformationConfig } from "@/types";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type TransformedImageProps = {
  publicId: string;
  config: TransformationConfig;
  slot?: string;
};

const TransformedImage = ({
  publicId,
  config,
  slot = "second",
}: TransformedImageProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      {publicId && (
        <CldImage
          src={publicId}
          alt="Transformed Image"
          placeholder={dataUrl as PlaceholderValue}
          {...config}
          slot={slot}
        />
      )}
    </div>
  );
};

export default TransformedImage;
