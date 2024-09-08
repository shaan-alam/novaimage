import MediaUploader from "@/components/Media/MediaUploader";
import { REDIRECTION } from "@/types";
import { TRANSFORMATION_TYPE } from "@prisma/client";
import { IconSparkles } from "@tabler/icons-react";

const GenerativeFill = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-7xl my-12 font-semibold gradient-heading flex items-center">
        <IconSparkles size={72} className="text-gray-500" />
        Generative Fill
      </h1>
      <MediaUploader
        redirectTo={REDIRECTION.GENERATIVE_FILL}
        transformationType={TRANSFORMATION_TYPE.GENERATIVE_FILL}
      />
    </div>
  );
};

export default GenerativeFill;
