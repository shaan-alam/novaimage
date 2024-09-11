"use client";

import { applyTransformationAction } from "@/app/actions/cloudinary.actions";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { aspectRatiosOptions, socialMediaPostDimensions } from "@/constants";
import { useSaveTransformation } from "@/hooks/save-transformation";
import { ActiveTab, AspectRatioKeyField, TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation, TRANSFORMATION_TYPE } from "@prisma/client";
import {
  IconDeviceFloppy,
  IconPaintFilled,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 } from "uuid";
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
import OriginalImage from "../OriginalImage";
import TransformedImage from "../TransformedImage";

type GenerativeFillFormProps = {
  transformation: Transformation;
};

const formSchema = z.object({
  title: z.string(),
  height: z.number(),
  width: z.number(),
  aspectRatio: z.string({ message: "Aspect Ratio is required!" }),
  aspect_ratio_key: z.string(),
});

export default function GenerativeFillForm({
  transformation,
}: GenerativeFillFormProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("original-image");

  const [config, setConfig] = useState<TransformationConfig>({
    aspectRatio: transformation.aspectRatio || "",
    title: transformation.title || "",
    height: transformation.transformed_height || transformation.original_height,
    width: transformation.transformed_width || transformation.original_width,
    fillBackground: transformation.fillBackground || false,
  });

  const { isPending, execute: applyTransformation } = useServerAction(
    applyTransformationAction
  );

  const { isPending: isSaving, saveTransformation } =
    useSaveTransformation(transformation);

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
        .then((value) => setActiveTab("transformed-image"));
    }
  };

  const onSaveTransformation = (values: z.infer<typeof formSchema>) => {
    const { aspectRatio, title, aspect_ratio_key, width, height } = values;

    saveTransformation({
      title,
      aspect_ratio_key,
      width,
      height,
      aspectRatio,
      transformationType: TRANSFORMATION_TYPE.GENERATIVE_FILL,
      fillBackground: true,
    });
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
    <div className="flex flex-col lg:flex-row gap-4 h-screen">
      <div className="w-full lg:w-1/4 bg-background p-4 border border-secondary rounded-xl">
        <h1 className="flex items-center text-primary font-semibold text-xl mb-4 mt-8 md:mt-2">
          <IconSparkles className="mr-2" />
          Generative Fill
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Transform your images effortlessly with our AI-powered generative fill
          feature, adding or removing elements with ease. 🚀
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSaveTransformation)}
            className="space-y-4"
          >
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
                  <SelectTrigger className="w-full">
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
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                isLoading={isPending}
                className="w-full"
                disabled={!form.getValues().aspectRatio}
                onClick={onApplyTransformation}
              >
                <IconPaintFilled size={15} className="mr-2" />
                Apply
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                isLoading={isSaving}
              >
                <IconDeviceFloppy size={15} className="mr-2" />
                Save
              </Button>
            </div>
          </form>
        </Form>
        {transformation && (
          <div className="mt-4">
            <ExportTransformation
              publicId={transformation.publicId}
              config={config}
            />
          </div>
        )}
        <div className="mt-4">
          <DeleteTransformationDialog
            transformationId={transformation?.id as string}
          />
        </div>
      </div>
      <div className="w-full lg:w-3/4 bg-background border border-secondary rounded-xl flex flex-col p-3">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ActiveTab)}
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-1/2" value="original-image">
              Original Image
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="transformed-image">
              Transformed Image
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100vh-12rem)] p-4">
            <TabsContent value="original-image">
              <OriginalImage transformation={transformation} />
            </TabsContent>
            <TabsContent value="transformed-image">
              <TransformedImage
                publicId={transformation.publicId}
                config={config}
                key={v4()}
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
