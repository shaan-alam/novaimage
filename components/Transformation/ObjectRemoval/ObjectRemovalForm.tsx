"use client";

import { applyTransformationAction } from "@/app/actions/cloudinary.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useSaveTransformation } from "@/hooks/save-transformation";
import { ActiveTab, TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation, TRANSFORMATION_TYPE } from "@prisma/client";
import { IconSparkles } from "@tabler/icons-react";
import { useEffect, useState } from "react";
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
  transformation: Transformation;
};

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  title: z.string().min(1, "Title is required"),
});

export default function ObjectRemovalForm({
  transformation,
}: ObjectRemovalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("original-image");
  const [isTransformed, setTransformed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { isPending, execute: applyTransformation } = useServerAction(
    applyTransformationAction
  );

  const { isPending: isSaving, saveTransformation } =
    useSaveTransformation(transformation);

  const [config, setConfig] = useState<TransformationConfig>({
    height: transformation.transformed_height || transformation.original_height,
    width: transformation.transformed_width || transformation.original_width,
    remove: transformation.prompt || "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: transformation.prompt || "",
      title: transformation.title || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onApplyTransformation = async () => {
    const { prompt } = form.getValues();

    const newConfig = {
      remove: prompt,
      height: transformation.original_height,
      width: transformation.original_width,
    };

    setConfig(newConfig);

    toast
      .promise(
        applyTransformation({
          config: newConfig,
          publicId: transformation.publicId,
        }),
        {
          loading: "Hang on! We're removing the object from your image",
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
    const { prompt, title } = values;

    saveTransformation({
      height,
      width,
      title,
      transformationType: TRANSFORMATION_TYPE.OBJECT_REMOVAL,
      remove: prompt,
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-screen">
      <div className="w-full lg:w-1/4 bg-background p-4 border border-secondary rounded-xl flex flex-col">
        <h1 className="flex items-center text-primary font-semibold text-xl mb-4 mt-8 md:mt-2">
          <IconSparkles className="mr-2" />
          Object Removal
        </h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Remove unwanted objects from your photos seamlessly. No more
          photobombs or distracting elements!
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
                    <Input
                      placeholder="Enter a title for your transformation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you want to remove from the image..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="button"
                className="w-full"
                disabled={isPending || !form.formState.isValid}
                onClick={onApplyTransformation}
              >
                {isPending ? "Removing..." : "Remove Object"}
              </Button>
              <Button
                variant="secondary"
                type="submit"
                className="w-full"
                disabled={isSaving || !isTransformed}
              >
                {isSaving ? "Saving..." : "Save"}
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
