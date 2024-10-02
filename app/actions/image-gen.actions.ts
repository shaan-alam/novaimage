"use server";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createServerAction, ZSAError } from "zsa";
import { getUserByClerkId } from "./user.actions";

export const generateImage = createServerAction()
  .input(
    z.object({
      prompt: z.string(),
      model: z.string(),
      seed: z.number(),
      width: z.number(),
      height: z.number(),
      enhance: z.boolean(),
    })
  )
  .handler(async ({ input }) => {
    const { userId } = auth();

    const user = await getUserByClerkId(userId as string);

    if (!user || !userId) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const { prompt, model, seed, width, height, enhance } = input;

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}&enhance=${enhance}&nologo=True`;
    await fetch(url);

    const newImage = await db.generation.create({
      data: {
        prompt,
        model,
        seed,
        width,
        height,
        imageUrl: url,
        enhance,
        userId: user.id,
        nologo: true,
        private: true,
      },
    });

    return newImage;
  });

export const generateRandomPrompt = createServerAction().handler(async () => {
  const randomNumber = Math.floor(Math.random() * 10000000);
  const promptGenerationPrompt = `Generate a detailed and creative image prompt for an AI art generator, including vivid scene descriptions, emotions, color schemes, lighting, and specific subjects, ensuring a visually captivating and imaginative result. Do not return the markdown result. Just give me the prompt`;
  const prompt = await fetch(
    `https://text.pollinations.ai/${encodeURIComponent(promptGenerationPrompt)}seed=${randomNumber}&model=mistral&system=${encodeURIComponent("You are a prompt engineer")}`
  );
  const result = await prompt.text();

  return result;
});

export const deleteGeneratedImage = createServerAction()
  .input(
    z.object({
      generationId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    const { generationId } = input;

    const { userId } = auth();

    const user = await getUserByClerkId(userId as string);

    if (!user || !userId) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const image = await db.generation.findUnique({
      where: {
        id: generationId,
        userId: user.id,
      },
    });

    if (!image) {
      throw new ZSAError("NOT_FOUND");
    }

    await db.generation.delete({
      where: {
        id: generationId,
      },
    });

    return { message: "Deleted your Generation successfully!" };
  });
