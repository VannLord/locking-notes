"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCn,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";
type Props = {
  notes: Note[];
};

const SidebarGroupNotes = ({ notes }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [localNotes, setLocalNotes] = useState(notes);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, []);

  const filterNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  return (
    <SidebarGroupContentShadCn>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu>
        {filterNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <SelectNoteButton note={note} />

            <DeleteNoteButton
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCn>
  );
};

export default SidebarGroupNotes;
