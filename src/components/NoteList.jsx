import React from 'react';
import { Link } from 'react-router-dom';
import useNoteStore from '../store/noteStore';
import NoteItem from './NoteItem'; // 🟢 DÜZELTME: Doğru dosya adı olan NoteItem import edildi
import CategoryFilter from './CategoryFilter'; 

const NoteList = () => {
 
  const notes = useNoteStore((state) => state.notes);
  const categoryFilter = useNoteStore((state) => state.categoryFilter);

  const filteredNotes =
    categoryFilter === "Hepsi"
      ? notes
      : notes.filter((note) => note.category === categoryFilter);

  return (
    <div>
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Notlarım</h1>
        <Link to="/add" className="add">
    
        </Link>
      </div>

      <CategoryFilter />

      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 text-xl p-8 bg-white rounded-xl shadow-lg">
          {categoryFilter !== "Hepsi" 
            ? `"${categoryFilter}" kategorisinde not bulunmuyor.`
            : "Henüz hiç not eklenmedi."
          }
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteItem key={note.id} note={note} /> // 🟢 KULLANIM DÜZELTİLDİ
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;