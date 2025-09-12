import { create } from 'zustand'


export const UseStore = create((set) => ({
    notes: [],
    addNote: (text) => set((state) => ({
    notes: [...state.notes, {id:Date.now(), text} ]

    })),
    removeNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
    })),
    updateNote: (id, newText) => set((state) => ({
        notes: state.notes.map((note) =>
            note.id === id ? { ...note, text: newText } : note)
    }))
}))

export default UseStore