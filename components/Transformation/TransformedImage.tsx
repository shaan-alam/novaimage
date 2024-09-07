"use client";
import { dataUrl } from "@/lib/utils";
import { TransformationConfig } from "@/types";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type TransformedImageProps = {
  transformation:
    | {
        height: number;
        width: number;
        publicId: string;
      }
    | undefined;
  config: TransformationConfig;
};

const TransformedImage = ({
  transformation,
  config,
}: TransformedImageProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      {transformation && (
        <CldImage
          src={transformation?.publicId}
          height={transformation?.height}
          width={transformation?.width}
          alt="Transformed Image"
          placeholder={dataUrl as PlaceholderValue}
          {...config}
        />
      )}
    </div>
  );
};

export default TransformedImage;
