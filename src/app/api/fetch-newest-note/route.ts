import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const userId = searchParams.get("userId") || "";
  console.log("🚀 ~ GET ~ userId:", userId);

  const newestNote = await prisma.note.findFirst({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
  });
  console.log("🚀 ~ GET ~ newestNote:", newestNote);

  return NextResponse.json({
    newestNoteId: newestNote?.id,
  });
}
