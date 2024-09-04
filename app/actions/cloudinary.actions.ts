"use server";
import { db } from "@/db";
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
    })
  )
  .handler(async ({ input }) => {
    const { file, height, width } = input;
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
        transformationType: "gen-fill",
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
      aspectRatio: z.string().min(1, { message: "Aspect Ratio is required" }),
      height: z.number(),
      width: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const { aspectRatio, publicId, height, width } = input;
    const transformationURL = await getCldImageUrl({
      src: publicId,
      fillBackground: true,
      aspectRatio,
      height,
      width,
    });

    return {
      transformationURL,
      publicId,
      height,
      width,
    };
  });

export const saveTransformationAction = createServerAction()
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      publicId: z.string().min(1, { message: "Public ID is required" }),
      src: z.string().min(1, { message: "src is required" }),
      aspectRatio: z.string().min(1, { message: "Aspect Ratio is required" }),
      aspect_ratio_key: z.string(),
      height: z.number(),
      width: z.number(),
    })
  )
  .handler(async ({ input }) => {
    const { userId } = auth();

    const user = await getUserByClerkId(userId as string);

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const {
      id,
      aspectRatio,
      publicId,
      title,
      aspect_ratio_key,
      width,
      height,
    } = input;

    const transformationURL = getCldImageUrl({
      src: publicId,
      fillBackground: true,
      aspectRatio,
      height,
      width,
    });

    const transformation = db.transformation.update({
      where: {
        id,
      },
      data: {
        title,
        transformationType: "genrative-fill",
        transformationURL,
        aspectRatio,
        aspect_ratio_key: aspect_ratio_key as string,
        transformed_height: height,
        transformed_width: width,
      },
    });

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
