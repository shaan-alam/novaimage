import MediaUploader from "@/components/Media/MediaUploader";
import { IconDropletHalf2 } from "@tabler/icons-react";

const GenerativeFill = () => {
  return (
    <div className="container mx-auto bg-[#12181D] p-12 border border-secondary rounded-xl">
      <h1 className="flex items-center text-white font-bold text-4xl">
        <IconDropletHalf2 color="white" />
        &nbsp; Generative Fill
      </h1>
      <p className="mt-4 leadinng-7 w-1/2 text-neutral-400">
        Transform your images with our AI-powered generative fill feature,
        allowing you to seamlessly add or remove elements with ease. 🚀
      </p>
      <div className="my-6">
        <MediaUploader />
      </div>
    </div>
  );
};

export default GenerativeFill;
