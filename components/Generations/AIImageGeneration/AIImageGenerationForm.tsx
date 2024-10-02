"use client";

import {
  generateImage,
  generateRandomPrompt,
} from "@/app/actions/image-gen.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconArrowsRandom,
  IconArrowsShuffle,
  IconChevronDown,
  IconChevronUp,
  IconLoader2,
  IconSparkles,
  IconWand,
} from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useServerAction } from "zsa-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RandomPromptButton from "./RandomPromptButton";
import DeleteGenerationDialog from "../DeleteGenerationDialog";
import ExportGeneration from "../ExportGeneration";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  model: z.string().default("flux"),
  seed: z.number().int().min(-1).default(-1),
  width: z.number().int().min(64).max(2048).default(1024),
  height: z.number().int().min(64).max(2048).default(1024),
  nologo: z.boolean().default(false),
  private: z.boolean().default(false),
  enhance: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function ImageGenerator() {
  const {
    execute: generateAIImage,
    isPending: isLoading,
    data,
  } = useServerAction(generateImage);

  const { execute: generatePrompt, isPending: isPromptLoading } =
    useServerAction(generateRandomPrompt, {
      onSuccess: ({ data }) => {
        form.setValue("prompt", data);
      },
    });

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "flux",
      seed: -1,
      width: 1024,
      height: 1024,
      nologo: false,
      private: false,
      enhance: false,
    },
  });

  function onSubmit(data: FormValues) {
    const queryParams = new URLSearchParams({
      ...data,
      prompt: encodeURIComponent(data.prompt),
      seed: data.seed.toString(),
      width: data.width.toString(),
      height: data.height.toString(),
      nologo:
        data.nologo.toString().at(0)?.toUpperCase() +
        data.nologo.toString().substring(1),
      private: data.private.toString(),
      enhance: data.enhance.toString(),
    }).toString();

    const { prompt, enhance, height, model, seed, width } = data;
    generateAIImage({
      prompt,
      enhance,
      height,
      model,
      seed,
      width,
    });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-screen">
      <div className="w-full lg:w-1/4 bg-background p-4 border border-secondary rounded-xl">
        <h1 className="flex items-center text-primary font-semibold text-xl mb-4 mt-8 md:mt-2">
          <IconSparkles className="mr-2" />
          AI Image Generation
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Create Stunning images with our AI-powered generative image generator.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-x-2">
                    <span>Enter your prompt</span>
                    {!isPromptLoading ? (
                      <RandomPromptButton
                        generateRandomPrompt={() => generatePrompt()}
                      />
                    ) : (
                      <span>
                        <IconLoader2 className="h-3 w-3 animate-spin" />
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A serene landscape with mountains and a lake..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between items-center"
                >
                  Additional Settings
                  {isOpen ? (
                    <IconChevronUp className="h-4 w-4" />
                  ) : (
                    <IconChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="flux">Flux</SelectItem>
                            <SelectItem value="stable-diffusion">
                              Stable Diffusion
                            </SelectItem>
                            <SelectItem value="dalle">DALL-E</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="seed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seed</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Generate Image
            </Button>
          </form>
        </Form>
        {data && <ExportGeneration url={data.imageUrl} />}
        {/* {data && (
          <div className="mt-4">
            <ExportTransformation
              publicId={transformation.publicId}
              config={config}
            />
          </div>
        )} */}
        {/* <div className="mt-4">
          <DeleteTransformationDialog
            transformationId={transformation?.id as string}
          />
          </div> */}
      </div>
      <div className="w-full lg:w-3/4 bg-background border border-secondary rounded-xl flex flex-col p-3 items-center justify-center">
        {isLoading && (
          <div>
            <Skeleton className="h-[400px] w-[400px]" />
          </div>
        )}
        {data && (
          <Image
            src={data.imageUrl}
            alt="Generated Image"
            width={data.width}
            height={data.height}
          />
        )}
      </div>
    </div>
  );
}
