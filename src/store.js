import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNotes = create(
  persist(
    (set, get) => ({
      notes: [
        { id: 1, title: "Alışveriş", content: "Süt, ekmek, yumurta" },
        { id: 2, title: "Toplantı", content: "Cuma 10:00 tasarım gözden geçirme" },
      ],
      addNote: (data) =>
        set((s) => ({ notes: [...s.notes, { id: Date.now(), ...data }] })),
      updateNote: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch } : n)),
        })),
      removeNote: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
      getById: (id) => get().notes.find((n) => n.id === id),
    }),
    { name: "easy-notes" } // localStorage key
  )
);
