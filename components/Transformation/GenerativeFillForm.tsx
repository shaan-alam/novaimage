"use client";
import { applyTransformation } from "@/app/actions/cloudinary.actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aspectRatiosOptions } from "@/constants";
import { AspectRatioFieldSelectType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Transformation } from "@prisma/client";
import {
  IconPaintFilled
} from "@tabler/icons-react";
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
  width: z.string(),
  height: z.string(),
});

const GenerativeFillForm = ({ transformation }: GenerativeFillFormProps) => {
  const { isPending, execute, data } = useServerAction(applyTransformation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      aspectRatio: "",
      width: transformation?.original_width.toString(),
      height: transformation?.original_height.toString(),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { aspectRatio, height, title, width } = values;

    if (transformation) {
      await execute({
        id: transformation?.id,
        height: +height,
        width: +width,
        publicId: transformation?.publicId as string,
        title,
        src: transformation?.imageURL as string,
        aspectRatio,
      });
    }
  };

  const onSelectChange = (value: string, field: AspectRatioFieldSelectType) => {
    const aspectRatio = aspectRatiosOptions.find((ar) => ar.ratio === value);

    if (aspectRatio) {
      form.setValue("height", aspectRatio?.dimensions.height.toString());
      form.setValue("width", aspectRatio?.dimensions.width.toString());

      field.onChange(value);
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
        <div className="w-[30%] mt-12">
          <div className="p-4 w-full rounded-xl border border-border shadow-lg bg-gradient-to-br from-[#182027] backdrop-blur-md to-transparent bg-opacity-[0.09]">
            <Image
              src={transformation?.thumbnail as string}
              alt="Original Image"
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
                  name="aspectRatio"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value) => onSelectChange(value, field)}
                    >
                      <SelectTrigger className="w-full my-4">
                        <SelectValue placeholder="Aspect Ratio" />
                      </SelectTrigger>
                      <SelectContent>
                        {aspectRatiosOptions.map((ar) => (
                          <SelectItem value={ar.ratio} key={ar.ratio}>
                            {ar.ratio} {ar.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width</FormLabel>
                        <FormMessage />
                        <Input type="number" placeholder="Width" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <FormMessage />
                        <Input type="number" placeholder="Height" {...field} />
                      </FormItem>
                    )}
                  />
                </div>
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
