"use server";

import { createClient } from "@/app/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({ email, password });

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
};

export const logoutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();

    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
};

export const signUpAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signUp({ email, password });

    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Sign up failed");

    // add user to the database
    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    handleError(error);
  }
};
