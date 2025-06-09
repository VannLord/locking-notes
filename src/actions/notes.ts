"use server";

import { getUser } from "@/app/auth/server";
import { prisma } from "@/db/prisma";
import promptToGemini from "@/gemini";
import { handleError } from "@/lib/utils";

export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must log in to create a note");

    await prisma.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      },
    });
    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must log in to update a note");

    await prisma.note.update({
      where: {
        id: noteId,
      },
      data: { text },
    });
    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};

export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must log in to delete a note");

    await prisma.note.delete({
      where: {
        id: noteId,
        authorId: user.id,
      },
    });

    return { errorMessage: null };
  } catch (e) {
    return handleError(e);
  }
};
export const askAIAboutNotesAction = async (
  newQuestions: string[],
  responses: string[],
) => {
  const user = await getUser();
  if (!user) throw new Error("You must log in to delete a note");

  const notes = await prisma.note.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      text: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (notes.length === 0) {
    return "You don't have any notes yet";
  }

  const formattedNotes = notes
    .map(
      (note: { text: string; createdAt: Date; updatedAt: Date }) => `
      Text: ${note.text},
      Created at: ${note.createdAt},
      Updated at: ${note.updatedAt},
    `,
    )
    .join("\n");
  const text = `
      You are the a helpful assistant that answers questions about a user's notes.
      Assume all questions are related to the user's notes.
      Make sure that your answers are not too verbose and you speak succinctly.
      You responses MUST be formatted in clean, valid HTML with proper structure.
      Use tags like <p>,  <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6> and <br/> when appropriate.
      Do NOT wrap the entire response in a single <p> tag unless it's single paragraph.
      Avoid inline styles, JavaScript, or custom attributes.

      Rendered like this in JSX:
      <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} /> 

      Here are the user's notes:
      ${formattedNotes}
    `;
  const contents = [
    {
      text,
    },
  ];

  for (let i = 0; i < newQuestions.length; i++) {
    contents.push({ text: newQuestions[i] });
    if (responses.length > 1) {
      contents.push({ text: responses[i] });
    }
  }

  const answer = await promptToGemini(contents);
  return answer || " A problem has occurred";
};
