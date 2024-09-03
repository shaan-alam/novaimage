"use client";
import { Transformation } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type TransformedImageProps = {
  data: Transformation;
};

const TransformedImage = ({ data }: TransformedImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const fetchImage = async () => {
    setLoading(true);
    await axios.get(data.transformationURL);
    setLoading(false);
  };

  useEffect(() => {
    fetchImage();
  }, [data]);

  return (
    <div className="h-full flex items-center justify-center">
      {isLoading && <Skeleton className="w-full h-[400px] bg-[#182027]" />}

      <Image
        src={data.transformationURL}
        height={data.transformed_height as number}
        width={data.transformed_width as number}
        alt="Transformed Image"
      />
    </div>
  );
};

export default TransformedImage;
