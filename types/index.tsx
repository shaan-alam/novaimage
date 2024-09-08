import { TRANSFORMATION_TYPE } from "@prisma/client";
import { ControllerRenderProps } from "react-hook-form";
import { z } from "zod";

export type AspectRatioKeyField = ControllerRenderProps<
  {
    aspect_ratio_key: string;
    aspectRatio: string;
    title: string;
    width: string;
    height: string;
  },
  "aspect_ratio_key"
>;

export enum REDIRECTION {
  GENERATIVE_FILL = "generative-fill",
  OBJECT_REMOVAL = "object-removal",
  GENERATIVE_RECOLOR = "generative-recolor",
}

export const zodTransformationTypeSchema = z.enum([
  TRANSFORMATION_TYPE.GENERATIVE_FILL,
  TRANSFORMATION_TYPE.GENERATIVE_RECOLOR,
  TRANSFORMATION_TYPE.OBJECT_REMOVAL,
]);

export type TransformationConfig = {
  fillBackground?: boolean;
  aspectRatio?: string;
  remove?: string;
  title?: string;
  height: number;
  width: number;
};
