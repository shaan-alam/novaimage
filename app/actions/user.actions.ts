"use server";
import { db } from "@/db";
import { User } from "@prisma/client";

export type CreateUserParams = Omit<User, "id" | "credits">;
export type UpdateUserParams = {
  id: string;
  user: Omit<User, "id" | "email" | "clerkId" | "credits" | "transformations">;
};

export const createUser = async (user: CreateUserParams) => {
  return await db.user.create({
    data: {
      ...user,
    },
  });
};

export const updateUser = async ({ id, user }: UpdateUserParams) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      ...user,
    },
  });
};

export const deleteUser = async (id: string) => {
  return await db.user.delete({
    where: {
      id,
    },
  });
};

export const getUser = async (id: string) => {
  return await db.user.findFirst({
    where: {
      clerkId: id,
    },
  });
};

export const getUserByClerkId = async (clerkId: string) => {
  return await db.user.findFirst({
    where: {
      clerkId,
    },
  });
};
