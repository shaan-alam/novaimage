import MediaUploader from "@/components/Media/MediaUploader";
import { REDIRECTION } from "@/types";
import { TRANSFORMATION_TYPE } from "@prisma/client";
import { IconSparkles } from "@tabler/icons-react";

const GenerativeFill = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-4xl flex items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-[#E91E63] to-orange-400 p-4">
        <IconSparkles size={60} className="text-gray-500" />
        AI Generative Fill
      </h1>
      <MediaUploader
        redirectTo={REDIRECTION.GENERATIVE_FILL}
        transformationType={TRANSFORMATION_TYPE.GENERATIVE_FILL}
      />
    </div>
  );
};

export default GenerativeFill;
