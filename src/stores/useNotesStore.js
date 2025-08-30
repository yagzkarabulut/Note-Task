import { create } from "zustand";
import { persist } from "zustand/middleware";

const randomColors = [
  "bg-rose-300",
  "bg-amber-300",
  "bg-lime-300",
  "bg-cyan-300",
  "bg-fuchsia-300",
];

const useNotesStore = create(
  persist(
    (set) => ({
      notes: [],
      addNote: (text) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now(),
              text,
              color:
                randomColors[Math.floor(Math.random() * randomColors.length)],
              rotation: Math.floor(Math.random() * 15) - 5, // -15° … +15°
            },
          ],
        })),
      updateNote: (id, text) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, text } : n)),
        })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
    }),
    { name: "notes-storage" } // localStorage
  )
);

export default useNotesStore;
