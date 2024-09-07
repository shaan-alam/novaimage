import MediaUploader from "@/components/Media/MediaUploader";
import { REDIRECTION } from "@/types";
import { IconBackground } from "@tabler/icons-react";

const ObjectRemoval = () => {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-5xl md:text-6xl flex items-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-[#E91E63] to-orange-400 p-4">
          <IconBackground size={72} className="text-gray-500" />
          Object Removal
        </h1>
        <MediaUploader redirectTo={REDIRECTION.OBJECT_REMOVAL} transformationType="OBJECT_REMOVAL" />
      </div>
    </>
  );
};

export default ObjectRemoval;
