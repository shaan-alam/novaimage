"use client";
import { applyTransformationAction } from "@/app/actions/cloudinary.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useSaveTransformation } from "@/hooks/save-transformation";
import { ActiveTab, TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation, TRANSFORMATION_TYPE } from "@prisma/client";
import { IconSparkles } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import ExportTransformation from "../../shared/ExportTransformation";
import DeleteTransformationDialog from "../DeleteTransformationDialog";
import TransformedImage from "../TransformedImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OriginalImage from "../OriginalImage";
import { v4 } from "uuid";

type ObjectRemovalProps = {
  transformation: Transformation;
};

const formSchema = z.object({
  prompt: z.string(),
  title: z.string(),
});

const ObjectRemovalForm = ({ transformation }: ObjectRemovalProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("original-image");
  const [isTransformed, setTransformed] = useState(false);

  const { isPending, execute: applyTransformation } = useServerAction(
    applyTransformationAction
  );

  const { isPending: isSaving, saveTransformation } =
    useSaveTransformation(transformation);

  const [config, setConfig] = useState<TransformationConfig>({
    height: transformation.transformed_height || 0,
    width: transformation.transformed_width || 0,
    remove: transformation.prompt || "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: transformation.prompt || "",
      title: transformation.title || "",
    },
  });

  const onApplyTransformation = async () => {
    const { prompt } = form.getValues();

    const config = {
      remove: prompt,
      height: transformation.original_height,
      width: transformation.original_width,
    };

    setConfig(config);

    toast
      .promise(
        applyTransformation({ config, publicId: transformation.publicId }),
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
      title: title || "",
      transformationType: TRANSFORMATION_TYPE.OBJECT_REMOVAL,
      remove: prompt,
    });
  };

  return (
    <>
      <div className="flex gap-x-2 h-full">
        <div className="flex flex-col w-[20%] bg-background px-6 py-4 border border-secondary rounded-xl">
          <h1 className="flex items-center text-primary font-semibold text-xl mt-7">
            <IconSparkles />
            &nbsp; Object Removal
          </h1>
          <p className="my-4 leading-6 text-sm text-muted-foreground">
            Remove unwanted objects from your photos seamlessly. No more
            photobombs or distracting elements!
          </p>
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
                    <FormLabel>Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what you want to remove from the image..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex space-x-2">
                <Button
                  type="button"
                  className="mt-2 w-full"
                  isLoading={isPending}
                  onClick={onApplyTransformation}
                  disabled={!form.getValues().prompt}
                >
                  Remove Object
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  className="mt-2 w-full"
                  isLoading={isSaving}
                  disabled={!isTransformed}
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
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as ActiveTab)}
            >
              <TabsList className="w-full">
                <TabsTrigger className="w-full" value="original-image">
                  Original Image
                </TabsTrigger>
                <TabsTrigger className="w-full" value="transformed-image">
                  Transformed Image
                </TabsTrigger>
              </TabsList>
              <TabsContent className="w-full" value="original-image">
                <OriginalImage transformation={transformation} />
              </TabsContent>
              <TabsContent className="w-full" value="transformed-image">
                <TransformedImage
                  publicId={transformation.publicId}
                  config={config}
                  key={v4()}
                />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default ObjectRemovalForm;
