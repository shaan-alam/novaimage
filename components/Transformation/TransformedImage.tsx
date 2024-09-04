"use client";
import { dataUrl } from "@/lib/utils";
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
};

const TransformedImage = ({ transformation }: TransformedImageProps) => {
  return (
    <div className="h-full flex items-center justify-center">
      {transformation && (
        <CldImage
          src={transformation?.publicId}
          height={transformation?.height}
          width={transformation?.width}
          fillBackground
          alt="Transformed Image"
          placeholder={dataUrl as PlaceholderValue}
        />
      )}
    </div>
  );
};

export default TransformedImage;
