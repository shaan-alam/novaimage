import { ControllerRenderProps } from "react-hook-form";

export type AspectRatioFieldSelectType = ControllerRenderProps<
  {
    title: string;
    aspectRatio: string;
    width: string;
    height: string;
  },
  "aspectRatio"
>;
