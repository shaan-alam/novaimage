"use server";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { createServerAction, ZSAError } from "zsa";
import { getUserByClerkId } from "./user.actions";
import { z } from "zod";

export const fetchMyTransformations = createServerAction()
  .input(
    z.object({
      userId: z.string(),
    })
  )
  .handler(async () => {
    const { userId } = auth();

    if (!userId) {
      throw new ZSAError("NOT_AUTHORIZED");
    }

    const user = await getUserByClerkId(userId);

    if (!user) {
      throw new ZSAError("NOT_FOUND");
    }

    const transformations = await db.transformation.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        recolor: true,
      },
    });

    return transformations;
  });
