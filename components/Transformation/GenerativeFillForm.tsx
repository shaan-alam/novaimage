"use client";
import { applyTransformation } from "@/app/actions/cloudinary.actions";
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
import { IconPaintFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import DeleteTransformationDialog from "./DeleteTransformationDialog";
import TransformedImage from "./TransformedImage";

type GenerativeFillFormProps = {
  transformation: Transformation | null;
};

const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string({ message: "Aspect Ratio is required!" }),
  aspect_ratio_key: z.string(),
});

const GenerativeFillForm = ({ transformation }: GenerativeFillFormProps) => {
  const { isPending, execute, data } = useServerAction(applyTransformation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: transformation?.title || "",
      aspectRatio: transformation?.aspectRatio || "",
      aspect_ratio_key: transformation?.aspect_ratio_key || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { aspectRatio, title, aspect_ratio_key } = values;

    if (transformation) {
      const result = await execute({
        id: transformation?.id,
        publicId: transformation?.publicId as string,
        title,
        src: transformation?.imageURL as string,
        aspectRatio,
        aspect_ratio_key,
      });
      console.log(result);
    }
  };

  const onSelectChange = (value: string, field: AspectRatioKeyField) => {
    let aspectRatio = [
      ...aspectRatiosOptions,
      ...socialMediaPostDimensions,
    ].find((ar) => ar.key === value);

    if (aspectRatio) {
      // form.setValue("height", aspectRatio?.dimensions.height.toString());
      // form.setValue("width", aspectRatio?.dimensions.width.toString());
      form.setValue("aspectRatio", aspectRatio?.ratio);
      field.onChange(aspectRatio.key);
    }
  };

  return (
    <div className="flex gap-8 mt-8">
      <div className="w-[70%]">
        {!data && !isPending && (
          <Image
            alt="Original Image"
            src={transformation?.imageURL as string}
            height={transformation?.original_height}
            width={transformation?.original_width}
          />
        )}
        {data && transformation && (
          <>
            <h1 className="text-white font-bold text-2xl mb-6">
              Transformation
            </h1>
            <TransformedImage
              data={data}
              aspectRatio={form.getValues().aspectRatio}
            />
          </>
        )}
      </div>
      {transformation && (
        <div className="w-[30%] mt-6">
          <div className="p-4 w-full rounded-xl border border-border shadow-lg bg-gradient-to-br from-[#182027] backdrop-blur-md to-transparent bg-opacity-[0.09]">
            <Image
              src={transformation?.thumbnail as string}
              alt="Original Image Thumbnail"
              height={72}
              width={72}
              className="my-6 rounded-md"
            />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    isLoading={isPending}
                    disabled={!form.getValues().aspectRatio}
                    className="w-full"
                    icon={<IconPaintFilled size={15} />}
                  >
                    Apply Transformation
                  </Button>
                  <DeleteTransformationDialog
                    transformationId={transformation?.id as string}
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerativeFillForm;
