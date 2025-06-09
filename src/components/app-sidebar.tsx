import { getUser } from "@/app/auth/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupNotes from "./SidebarGroupNotes";

export const AppSidebar = async () => {
  const user = await getUser();

  let notes: Note[] = [];

  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="my-2 text-lg">
            {user ? (
              <>Your notes</>
            ) : (
              <p>
                <Link href="/login" className="underline">
                  Login
                </Link>
              </p>
            )}
          </SidebarGroupLabel>
          {user && <SidebarGroupNotes notes={notes} />}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
