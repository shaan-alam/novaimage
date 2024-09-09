"use client";
import { dataUrl } from "@/lib/utils";
import { TransformationConfig } from "@/types";
import { Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type TransformedImageProps = {
  publicId: string;
  config: TransformationConfig;
};

const TransformedImage = ({ publicId, config }: TransformedImageProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      {publicId && (
        <CldImage
          src={publicId}
          alt="Transformed Image"
          placeholder={dataUrl as PlaceholderValue}
          {...config}
        />
      )}
    </div>
  );
};

export default TransformedImage;
