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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSaveTransformation } from "@/hooks/save-transformation";
import { ActiveTab, TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Recolor, Transformation, TRANSFORMATION_TYPE } from "@prisma/client";
import { IconColorFilter } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import ExportTransformation from "../../shared/ExportTransformation";
import DeleteTransformationDialog from "../DeleteTransformationDialog";
import OriginalImage from "../OriginalImage";
import TransformedImage from "../TransformedImage";

type ObjectRemovalProps = {
  transformation: Transformation & { recolor: Recolor | null };
};

const formSchema = z.object({
  title: z.string().optional(),
  prompt: z.string(),
  to: z.string(),
  multiple: z.boolean().optional().default(false),
});

export default function GenerativeRecolor({
  transformation,
}: ObjectRemovalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("original-image");
  const [isTransformed, setTransformed] = useState(false);

  const { isPending, execute: applyTransformation } = useServerAction(
    applyTransformationAction
  );

  const { isPending: isSaving, saveTransformation } =
    useSaveTransformation(transformation);

  const [config, setConfig] = useState<TransformationConfig>({
    height: transformation.original_height,
    width: transformation.original_width,
    recolor: {
      prompt: transformation.recolor?.prompt || "",
      to: transformation.recolor?.to.substring(1) || "",
      multiple: transformation.recolor?.multiple || false,
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
      .then(() => {
        setTransformed(true);
        setActiveTab("transformed-image");
      });
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
        to: to.substring(1),
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-screen">
      <div className="w-full lg:w-1/4 bg-background p-4 border border-secondary rounded-xl flex flex-col">
        <h1 className="flex items-center text-primary font-semibold text-xl mb-4 mt-8 md:mt-2">
          <IconColorFilter className="mr-2" />
          Generative Recolor
        </h1>
        <p className="mb-4 text-sm text-neutral-400">
          Recolor your images with a single click. Change colors to match your
          brand or create entirely new moods.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSaveTransformation)}
            className="space-y-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem className="flex items-center justify-between">
                  <FormLabel>Select multiple</FormLabel>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-readonly
                  />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                className="w-full"
                isLoading={isPending}
                onClick={onApplyTransformation}
              >
                Recolor Object
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="w-full"
                isLoading={isSaving}
                disabled={!isTransformed}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4">
          <ExportTransformation
            publicId={transformation.publicId}
            config={config}
          />
        </div>

        <div className="mt-auto">
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
