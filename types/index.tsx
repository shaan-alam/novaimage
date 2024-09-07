import { ControllerRenderProps } from "react-hook-form";

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
}

export type TransformationConfig = {
  fillBackground?: boolean;
  aspectRatio?: string;
  remove?: string;
  title?: string;
  height: number;
  width: number;
};
