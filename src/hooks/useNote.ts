"use client";

import { NoteContext } from "@/providers/NoteProvider";
import { useContext } from "react";

const useNote = () => {
  const context = useContext(NoteContext);

  if (!context) throw new Error("useNote must be used within a NoteContext");

  return context;
};

export default useNote;
