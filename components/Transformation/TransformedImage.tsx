"use client";
import { dataUrl } from "@/lib/utils";
import { Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

const TransformedImage = ({
  transformation,
}: {
  transformation: Transformation | undefined | null;
}) => {
  return (
    <div className="h-full flex items-center justify-center">
      {transformation && (
        <CldImage
          src={transformation?.publicId}
          height={transformation?.transformed_height as number}
          width={transformation?.transformed_width as number}
          fillBackground
          alt="Transformed Image"
          placeholder={dataUrl as PlaceholderValue}
        />
      )}
    </div>
  );
};

export default TransformedImage;
