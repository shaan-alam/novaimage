import { Card } from "@/components/ui/card";
import { Recolor, Transformation } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

type TransformationCardProps = {
  transformation: Transformation & { recolor: Recolor | null };
};

const TransformationCard = ({ transformation }: TransformationCardProps) => {
  const config = {
    recolor: {
      to: transformation?.recolor?.to || "",
      multiple: transformation?.recolor?.multiple || false,
      prompt: transformation?.recolor?.prompt || "",
    },
    remove: transformation.prompt as string,
    fillBackground: transformation.fillBackground as boolean,
    aspectRatio: transformation.aspectRatio as string,
  };

  const transformationLinks = {
    GENERATIVE_FILL: "generative-fill",
    GENERATIVE_RECOLOR: "generative-recolor",
    OBJECT_REMOVAL: "object-removal",
  };

  return (
    <Link
      href={`/${transformationLinks[transformation?.transformationType as keyof typeof transformationLinks]}/update/${transformation.id}`}
    >
      <Card className="relative h-[300px] w-[300px] group cursor-pointer hover:scale-105 transition-all">
        <CldImage
          src={transformation.publicId}
          height={150}
          width={150}
          alt={transformation.title}
          {...config}
          className="rounded-tl-md rounded-tr-md absolute top-0 left-0 object-cover h-full w-full"
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-black/90 to-transparent z-10 transition-all opacity-0 group-hover:opacity-100"></div>
        <div>
          <h1 className="text-lg text-white font-medium opacity-0 absolute bottom-4 left-4 z-20 transition-all group-hover:opacity-100">
            {transformation.title.length != 0 ? (
              transformation.title
            ) : (
              <span className="italic">&lt;No Title&gt;</span>
            )}
          </h1>
        </div>
      </Card>
    </Link>
  );
};

export default TransformationCard;