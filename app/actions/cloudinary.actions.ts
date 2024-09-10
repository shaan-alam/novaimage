"use server";
import { transformationConfigSchema } from "@/constants";
import { db } from "@/db";
import { zodTransformationTypeSchema } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";
import { z } from "zod";
import { createServerAction, ZSAError } from "zsa";
import { getUserByClerkId } from "./user.actions";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = createServerAction()
  .input(
    z.object({
      file: z.string().min(1, { message: "Image is required!" }),
      height: z.number({ message: "Height is required!" }),
      width: z.number({ message: "Width is required!" }),
      type: zodTransformationTypeSchema,
    })
  )
  .handler(async ({ input }) => {
    const { file, height, width, type } = input;
    const { userId } = auth();

    const user = await getUserByClerkId(userId as string);

    if (!user || !userId) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const image = await cloudinary.uploader.upload(file, {
      folder: "artsy",
    });

    const thumbnail = await getCldImageUrl({
      src: image.public_id,
      height: 72,
      width: 72,
      aspectRatio: "1:1",
    });

    return await db.transformation.create({
      data: {
        aspectRatio: "",
        original_height: height,
        original_width: width,
        imageURL: image?.secure_url,
        prompt: "",
        publicId: image.public_id,
        title: "",
        transformationType: type,
        transformationURL: "",
        userId: user.id,
        thumbnail,
        aspect_ratio_key: "",
      },
    });
  });

export const applyTransformationAction = createServerAction()
  .input(
    z.object({
      publicId: z.string().min(1, { message: "Public ID is required" }),
      config: z.object({
        aspectRatio: z
          .string()
          .min(1, { message: "Aspect Ratio is required" })
          .optional(),
        height: z.number(),
        width: z.number(),
        remove: z.string().optional(),
        recolor: z
          .object({
            prompt: z.string(),
            to: z.string(),
            multiple: z.boolean(),
          })
          .optional(),
      }),
    })
  )
  .handler(async ({ input }) => {
    const { config, publicId } = input;

    const transformationURL = await getCldImageUrl({
      src: publicId,
      ...config,
    });

    return {
      transformationURL,
      publicId,
      height: config.height,
      width: config.width,
    };
  });

export const saveTransformationAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      publicId: z.string().min(1, { message: "Public ID is required" }),
      config: transformationConfigSchema,
    })
  )
  .handler(async ({ input }) => {
    const { userId } = auth();

    const user = await getUserByClerkId(userId as string);

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const { id, publicId, config } = input;

    const {
      title,
      aspectRatio,
      aspect_ratio_key,
      height,
      width,
      transformationType,
      remove,
      recolor,
    } = config;

    const transformationURL = getCldImageUrl({
      src: publicId,
      height,
      width,
      recolor,
      ...config,
    });

    const transformation = await db.transformation.update({
      where: {
        id,
      },
      data: {
        title,
        transformationType,
        transformationURL,
        prompt: remove,
        aspect_ratio_key: aspect_ratio_key as string,
        transformed_height: height,
        transformed_width: width,
        fillBackground: config.fillBackground,
        aspectRatio: config.aspectRatio,
      },
    });

    if (recolor && transformationType === "GENERATIVE_RECOLOR") {
      const existingRecolor = await db.recolor.findUnique({
        where: {
          transformationId: transformation.id,
        },
      });

      if (!existingRecolor) {
        await db.recolor.create({
          data: {
            ...recolor,
            transformationId: transformation.id,
          },
        });
      } else {
        await db.recolor.update({
          where: {
            transformationId: transformation.id,
          },
          data: {
            ...recolor,
          },
        });
      }
    }

    return transformation;
  });

export const deleteTransformation = createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const { id } = input;

    const transformation = await db.transformation.findFirst({
      where: {
        id,
      },
    });

    if (!transformation) {
      throw new ZSAError("NOT_FOUND");
    }

    await cloudinary.uploader.destroy(transformation.publicId);

    await db.transformation.delete({
      where: {
        id,
      },
    });

    return { message: "Deleted your transformation successfully!" };
  });
