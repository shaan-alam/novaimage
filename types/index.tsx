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
