import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useNoteStore = create(
  persist(
    (set) => ({
      notes: [
        { id: 1, title: "Alışveriş", content: "Süt, ekmek, yumurta" },
        {
          id: 2,
          title: "Toplantı",
          content: "Cuma 10:00 tasarım gözden geçirme",
        },
      ],

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, { ...note, id: Date.now() }],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),
    }),
    { name: "notes-task" }
  )
);
