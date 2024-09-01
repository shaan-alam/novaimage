"use server";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { Transformation } from "@prisma/client";
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
        thumbnail
      },
    });
  });

export const applyTransformation = createServerAction()
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      publicId: z.string().min(1, { message: "Public ID is required" }),
      src: z.string().min(1, { message: "src is required" }),
      aspectRatio: z.string().min(1, { message: "Aspect Ratio is required" }),
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

    const { id, src, aspectRatio, height, width, publicId, title } = input;

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
        userId: user.id,
      },
    });

    return transformation;
  });

export const deleteImage = createServerAction()
  .input(
    z.object({
      publicId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const { publicId } = input;

    await cloudinary.uploader.destroy(publicId);
    return { message: "Your image has been successfully deleted!" };
  });