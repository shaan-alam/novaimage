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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { TransformationConfig } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation } from "@prisma/client";
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

type ObjectRemovalProps = {
  transformation: Transformation;
};

const formSchema = z.object({
  prompt: z.string(),
});

const ObjectRemovalForm = ({ transformation }: ObjectRemovalProps) => {
  const {
    isPending,
    data,
    execute: applyTransformation,
  } = useServerAction(applyTransformationAction);

  const [config, setConfig] = useState<TransformationConfig>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onApplyTransformation = async (values: z.infer<typeof formSchema>) => {
    const { prompt } = values;

    const config = {
      remove: prompt,
      height: transformation.original_height,
      width: transformation.original_width,
    };

    setConfig(config);

    toast.promise(
      applyTransformation({ config, publicId: transformation.publicId }),
      {
        loading: "Hang on! We're removing the object from your image",
        error: "Sorry! We could not perform the request at the moment!",
        success: "Success! Loading your image..",
      }
    );
  };

  return (
    <>
      <div className="flex gap-x-2 h-[98vh]">
        <div className="flex flex-col w-[20%] bg-background px-6 py-4 border border-secondary rounded-xl">
          <h1 className="flex items-center text-[#a9c7db] font-semibold text-xl mt-7">
            <IconSparkles />
            &nbsp; Object Removal
          </h1>
          <p className="mt-4 leading-7 text-sm text-neutral-400">
            Remove unwanted objects from your photos seamlessly. No more
            photobombs or distracting elements!
          </p>
          <Image
            src={transformation?.thumbnail as string}
            alt="Original Image Thumbnail"
            height={72}
            width={72}
            className="my-6 rounded-md"
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onApplyTransformation)}>
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
              <Button
                type="submit"
                className="mt-2 w-full"
                isLoading={isPending}
                disabled={!form.getValues().prompt}
              >
                Remove
              </Button>
            </form>
          </Form>

          <ExportTransformation
            transformation={{
              ...transformation,
              prompt: config?.remove as string,
            }}
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

export default ObjectRemovalForm;
