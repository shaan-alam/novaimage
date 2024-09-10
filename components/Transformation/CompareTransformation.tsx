import { TransformationConfig } from "@/types";
import { ImgComparisonSlider } from "@img-comparison-slider/react";
import { Transformation } from "@prisma/client";
import Image from "next/image";

type CompareTransformationProps = {
  transformation: Transformation;
  config: TransformationConfig;
};

const CompareTransformation = ({
  transformation,
  config,
}: CompareTransformationProps) => {
  return (
    <>
      <ImgComparisonSlider hover>
        <Image
          height={transformation.original_height}
          width={transformation.original_width}
          src={transformation.imageURL}
          slot="first"
          alt="Original Image"
        />
        <Image
          height={transformation.transformed_height as number}
          width={transformation.transformed_width as number}
          src={transformation.transformationURL}
          slot="second"
          alt="Transformed Image"
        />
      </ImgComparisonSlider>
    </>
  );
};

export default CompareTransformation;
