import { saveTransformationAction } from "@/app/actions/cloudinary.actions";
import { Transformation, TransformationType } from "@prisma/client";
import toast from "react-hot-toast";
import { useServerAction } from "zsa-react";

type Config = {
  transformationType: TransformationType;
  title: string;
  fillBackground?: boolean;
  remove?: string;
  aspectRatio?: string;
  aspect_ratio_key?: string;
  height: number;
  width: number;
};

export const useSaveTransformation = (transformation: Transformation) => {
  const { id, publicId } = transformation;
  const { execute: save, ...rest } = useServerAction(saveTransformationAction);

  const saveTransformation = (config: Config) => {
    toast.promise(
      save({
        config,
        id,
        publicId,
      }),
      {
        loading: "Saving...",
        error: "Could not save your image!",
        success: "Your image has been successfully saved!",
      }
    );
  };

  return { ...rest, saveTransformation };
};
