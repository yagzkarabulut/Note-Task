import { create } from "zustand";
import { v4 as uuid } from "uuid";

const load = () => JSON.parse(localStorage.getItem("notes") || "[]");
const save = (items) => localStorage.setItem("notes", JSON.stringify(items));

export const useNotes = create((set, get) => ({
  items: load(),

  add: ({ title, content }) => {
    const now = new Date().toISOString();
    const newNote = { id: uuid(), title, content, createdAt: now, updatedAt: now };
    const next = [newNote, ...get().items];
    save(next);
    set({ items: next });
  },

  update: (id, payload) => {
    const next = get().items.map((n) =>
      n.id === id ? { ...n, ...payload, updatedAt: new Date().toISOString() } : n
    );
    save(next);
    set({ items: next });
  },

  remove: (id) => {
    const next = get().items.filter((n) => n.id !== id);
    save(next);
    set({ items: next });
  },
}));
