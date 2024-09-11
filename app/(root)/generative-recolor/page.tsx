import MediaUploader from "@/components/Media/MediaUploader";

import { REDIRECTION } from "@/types";
import { TRANSFORMATION_TYPE } from "@prisma/client";
import { IconColorFilter } from "@tabler/icons-react";

const ObjectRemoval = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-4xl flex items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-[#E91E63] to-orange-400 p-4">
          <IconColorFilter size={60} className="text-gray-500 mr-2" />
          Generative Recolor
        </h1>
        <MediaUploader
          redirectTo={REDIRECTION.GENERATIVE_RECOLOR}
          transformationType={TRANSFORMATION_TYPE.GENERATIVE_RECOLOR}
        />
      </div>
    </>
  );
};

export default ObjectRemoval;
