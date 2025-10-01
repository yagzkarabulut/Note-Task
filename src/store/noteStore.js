import { create } from "zustand";

const useNoteStore = create((set, get) => ({

  categories: ["Ev", "İş", "Okul", "Kişisel", "Hobiler", "Diğer"], 
  

  notes: [
    { id: 'n1', title: 'Hoş Geldiniz Notu', content: 'Uygulamayı test etmek için bu notu kullanabilirsiniz.', date: new Date().toLocaleDateString('tr-TR'), category: 'Ev' },
    { id: 'n2', title: 'React Projesi', content: 'Tüm CRUD işlemleri Zustand ile yönetilmektedir.', date: new Date().toLocaleDateString('tr-TR'), category: 'İş' },
    { id: 'n3', title: 'Kitap Okuma Hedefi', content: 'Kişisel gelişime odaklan!', date: new Date().toLocaleDateString('tr-TR'), category: 'Kişisel' },
    { id: 'n4', title: 'Yeni Boya Seti', content: 'Suluboya setini alıp resim yapmaya başlamalıyım.', date: new Date().toLocaleDateString('tr-TR'), category: 'Hobiler' },
  ],


  categoryFilter: "Hepsi", 
  setCategoryFilter: (cat) => set({ categoryFilter: cat }),
  

  addCategory: (newCategory) => {
    const formattedCat = newCategory.trim();
    const { categories } = get();
    
    if (!formattedCat || categories.includes(formattedCat)) {
        return; 
    }
    
    set((state) => ({
        categories: [...state.categories, formattedCat]
    }));
  },


  deleteCategory: (categoryToDelete) => {
    set((state) => {
      const updatedCategories = state.categories.filter(
        (cat) => cat !== categoryToDelete
      );

      const updatedNotes = state.notes.map((note) =>
        note.category === categoryToDelete
          ? { ...note, category: "Diğer" }
          : note
      );

      const newFilter =
        state.categoryFilter === categoryToDelete ? "Hepsi" : state.categoryFilter;

      return {
        categories: updatedCategories,
        notes: updatedNotes,
        categoryFilter: newFilter,
      };
    });
  },

 
  addNote: (note) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Date.now().toString(), 
          date: new Date().toLocaleDateString('tr-TR'),
          ...note,
        },
      ],
    })),


  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((n) => (
        n.id === updatedNote.id 
          ? { ...n, ...updatedNote } 
          : n
      )),
    })),


  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),


  getFilteredNotes: () => {
    const { notes, categoryFilter } = get();
    if (categoryFilter === 'Hepsi') {
      return notes;
    }
    return notes.filter(n => n.category === categoryFilter);
  }
}));

export default useNoteStore;