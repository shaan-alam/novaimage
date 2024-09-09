"use client";
import { applyTransformationAction } from "@/app/actions/cloudinary.actions";
import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/color-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSaveTransformation } from "@/hooks/save-transformation";
import { TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Recolor, Transformation, TRANSFORMATION_TYPE } from "@prisma/client";
import { IconColorFilter } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import ExportTransformation from "../../shared/ExportTransformation";
import DeleteTransformationDialog from "../DeleteTransformationDialog";
import TransformedImage from "../TransformedImage";
import { Switch } from "@/components/ui/switch";

type ObjectRemovalProps = {
  transformation: Transformation & { recolor: Recolor | null };
};

const formSchema = z.object({
  title: z.string().optional(),
  prompt: z.string(),
  to: z.string(),
  multiple: z.boolean().optional().default(false),
});

const GenerativeRecolor = ({ transformation }: ObjectRemovalProps) => {
  const [transformationURL, setTransformationURL] = useState("");

  const {
    isPending,
    data,
    execute: applyTransformation,
  } = useServerAction(applyTransformationAction);

  const { isPending: isSaving, saveTransformation } =
    useSaveTransformation(transformation);

  const [config, setConfig] = useState<TransformationConfig>({
    height: 0,
    width: 0,
    recolor: {
      prompt: "",
      to: "",
      multiple: false,
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: transformation.title || "",
      prompt: transformation.recolor?.prompt || "",
      to: transformation.recolor?.to || "",
      multiple: transformation.recolor?.multiple || false,
    },
  });

  const onApplyTransformation = async () => {
    const { prompt, to, multiple } = form.getValues();

    const config = {
      height: transformation.original_height,
      width: transformation.original_width,
      recolor: {
        prompt,
        to: to.substring(1),
        multiple,
      },
    };

    setConfig(config);

    toast
      .promise(
        applyTransformation({ config, publicId: transformation.publicId }),
        {
          loading: "Hang on! We're recoloring your image...",
          error: "Sorry! We could not perform the request at the moment!",
          success: "Success! Loading your image..",
        }
      )
      .then((value) =>
        setTransformationURL(value[0]?.transformationURL as string)
      );
  };

  const onSaveTransformation = (values: z.infer<typeof formSchema>) => {
    const { width, height } = config;
    const { title, prompt, to, multiple } = values;

    saveTransformation({
      height,
      width,
      title: title || "",
      transformationType: TRANSFORMATION_TYPE.GENERATIVE_RECOLOR,
      recolor: {
        prompt,
        multiple,
        to,
      },
    });
  };

  return (
    <>
      <div className="flex gap-x-2 h-[98vh]">
        <div className="flex flex-col w-[20%] bg-background px-6 py-4 border border-secondary rounded-xl">
          <h1 className="flex items-center text-secondary-foreground font-semibold text-xl mt-7">
            <IconColorFilter />
            &nbsp; Generative Recolor
          </h1>
          <p className="mt-4 leading-7 text-sm text-neutral-400">
            Recolor your images with a single click. Change colors to match your
            brand or create entirely new moods.
          </p>
          <Image
            src={transformation?.thumbnail as string}
            alt="Original Image Thumbnail"
            height={72}
            width={72}
            className="my-6 rounded-md"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSaveTransformation)}>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Object to Recolor</FormLabel>
                    <FormControl>
                      <Input placeholder="Tshirt" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="to"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Pick a color</FormLabel>
                    <ColorPicker
                      color={field.value}
                      onChange={(value) => form.setValue("to", value)}
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
              <FormField
                name="multiple"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>Select multiple: </FormLabel>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormItem>
                )}
              />
              <div className="flex space-x-2 mt-2">
                <Button
                  type="button"
                  className="mt-2 w-full"
                  isLoading={isPending}
                  onClick={onApplyTransformation}
                >
                  Recolor Object
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  className="mt-2 w-full"
                  isLoading={isSaving}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>

          <ExportTransformation
            publicId={transformation.publicId}
            config={config}
          />

          <div className="mt-auto">
            <DeleteTransformationDialog
              transformationId={transformation?.id as string}
            />
          </div>
        </div>
        <div className="w-[80%] px-6 py-4 bg-background border border-secondary rounded-xl flex flex-col items-center justify-center">
          <ScrollArea className="h-[90%]">
            {config && (
              <TransformedImage transformation={data} config={config} />
            )}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default GenerativeRecolor;
