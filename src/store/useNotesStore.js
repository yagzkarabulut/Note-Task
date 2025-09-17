import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotesStore = create(
  persist(
    (set, get) => ({
      // Notes state
      notes: [],
      
      // Tasks state
      tasks: [],
      
      // Note methods
      addNote: (note) => {
        const newNote = {
          id: Date.now().toString(),
          title: note.title,
          content: note.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          notes: [newNote, ...state.notes],
        }));
      },
      
      updateNote: (id, updatedNote) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  title: updatedNote.title,
                  content: updatedNote.content,
                  updatedAt: new Date().toISOString(),
                }
              : note
          ),
        }));
      },
      
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      
      getNote: (id) => {
        return get().notes.find((note) => note.id === id);
      },
      
      clearNotes: () => {
        set({ notes: [] });
      },

      // Task methods
      addTask: (task) => {
        const newTask = {
          id: Date.now().toString(),
          title: task.title,
          description: task.description || '',
          completed: false,
          priority: task.priority || 'medium',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          tasks: [newTask, ...state.tasks],
        }));
      },

      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updatedTask,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      getTask: (id) => {
        return get().tasks.find((task) => task.id === id);
      },

      toggleTaskComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: !task.completed,
                  updatedAt: new Date().toISOString(),
                }
              : task
          ),
        }));
      },

      clearTasks: () => {
        set({ tasks: [] });
      },

      clearAll: () => {
        set({ notes: [], tasks: [] });
      },
    }),
    {
      name: 'notes-tasks-storage',
    }
  )
);

export default useNotesStore;
