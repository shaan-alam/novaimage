"use client";
import {
  applyTransformationAction,
  saveTransformationAction,
} from "@/app/actions/cloudinary.actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aspectRatiosOptions, socialMediaPostDimensions } from "@/constants";
import { AspectRatioKeyField } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation } from "@prisma/client";
import {
  IconDeviceFloppy,
  IconPaintFilled,
  IconSparkles,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import ExportTransformation from "../../shared/ExportTransformation";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import DeleteTransformationDialog from "../DeleteTransformationDialog";
import TransformedImage from "../TransformedImage";

type GenerativeFillFormProps = {
  transformation: Transformation | null;
};

const formSchema = z.object({
  title: z.string(),
  height: z.number(),
  width: z.number(),
  aspectRatio: z.string({ message: "Aspect Ratio is required!" }),
  aspect_ratio_key: z.string(),
});

const GenerativeFillForm = ({ transformation }: GenerativeFillFormProps) => {
  const [transformationURL, setTransformationURL] = useState<
    string | undefined
  >("");

  const [config, setConfig] = useState({
    aspectRatio: "",
    title: "",
    height: 0,
    width: 0,
    fillBackground: false,
  });

  const {
    isPending,
    execute: applyTransformation,
    data,
  } = useServerAction(applyTransformationAction);

  const { isPending: isSaving, execute: saveTransformation } = useServerAction(
    saveTransformationAction
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: transformation?.title || "",
      aspectRatio: transformation?.aspectRatio || "",
      aspect_ratio_key: transformation?.aspect_ratio_key || "",
    },
  });

  const onApplyTransformation = async () => {
    const { title, aspectRatio, width, height } = form.getValues();

    const config = {
      title,
      aspectRatio,
      height,
      width,
      fillBackground: true,
    };

    setConfig(config);

    if (transformation) {
      toast
        .promise(
          applyTransformation({
            config: {
              aspectRatio,
              height,
              width,
            },
            publicId: transformation.publicId,
          }),
          {
            loading: "Working on your transformation",
            error: "Could not process your image!",
            success: "Success! Loading your image...",
          }
        )
        .then((value) => setTransformationURL(value[0]?.transformationURL));
    }
  };

  const onSaveTransformation = (values: z.infer<typeof formSchema>) => {
    const { aspectRatio, title, aspect_ratio_key, width, height } = values;

    if (transformation) {
      toast.promise(
        saveTransformation({
          aspectRatio,
          height,
          width,
          publicId: transformation.publicId,
          aspect_ratio_key,
          id: transformation.id,
          src: transformation.imageURL,
          title,
        }),
        {
          loading: "Saving...",
          error: "Could not save your image!",
          success: "Your image has been successfully saved!",
        }
      );
    }
  };

  const onSelectChange = (value: string, field: AspectRatioKeyField) => {
    let aspectRatio = [
      ...aspectRatiosOptions,
      ...socialMediaPostDimensions,
    ].find((ar) => ar.key === value);

    if (aspectRatio) {
      form.setValue("height", aspectRatio?.dimensions.height);
      form.setValue("width", aspectRatio?.dimensions.width);
      form.setValue("aspectRatio", aspectRatio?.ratio);
      field.onChange(aspectRatio.key);
    }
  };

  return (
    <div className="flex gap-x-2 h-[98vh]">
      <div className="flex flex-col backdrop-blur-lg w-[20%] bg-[#161c20]/50 px-6 py-4 border border-secondary rounded-xl">
        <h1 className="flex items-center text-[#a9c7db] font-semibold text-xl mt-7">
          <IconSparkles />
          &nbsp; Generative Fill
        </h1>
        <p className="mt-4 leading-7 text-sm text-neutral-400">
          Transform your images effortlessly with our AI-powered generative fill
          feature, adding or removing elements with ease. 🚀
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
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aspect_ratio_key"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => onSelectChange(value, field)}
                >
                  <SelectTrigger className="w-full my-4">
                    <SelectValue placeholder="Aspect Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>General</SelectLabel>
                      {aspectRatiosOptions.map((ar) => (
                        <SelectItem value={ar.key} key={ar.key}>
                          {ar.ratio} {ar.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Social Media Covers</SelectLabel>
                      {socialMediaPostDimensions.map((sm) => (
                        <SelectItem value={sm.key} key={sm.key}>
                          {sm.ratio} {sm.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <div className="mt-6 flex items-center space-x-4">
              <Button
                type="button"
                isLoading={isPending}
                className="w-full"
                disabled={!form.getValues().aspectRatio}
                icon={<IconPaintFilled size={15} />}
                onClick={onApplyTransformation}
              >
                Apply
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                isLoading={isSaving}
                icon={<IconDeviceFloppy size={15} />}
                disabled={!transformationURL}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
        {transformation && (
          <ExportTransformation
            transformation={{ ...transformation, ...config }}
          />
        )}
        <div className="mt-auto">
          <DeleteTransformationDialog
            transformationId={transformation?.id as string}
          />
        </div>
      </div>
      <div className="w-[80%] px-6 py-4 bg-[#0f1316]/70 backdrop-blur-lg border border-secondary rounded-xl flex flex-col items-center justify-center">
        <ScrollArea className="h-[90%]">
          <TransformedImage transformation={data} config={config} />
        </ScrollArea>
      </div>
    </div>
  );
};

export default GenerativeFillForm;
