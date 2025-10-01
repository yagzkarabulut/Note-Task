import React from 'react';
import { Link } from 'react-router-dom';
import useNoteStore from '../store/noteStore';


const categoryDetails = {
  Ev: { icon: "🏠", class: 'bg-emerald-500' },
  İş: { icon: "💼", class: 'bg-amber-500' },
  Okul: { icon: "🎓", class: 'bg-blue-600' },
  Kişisel: { icon: "👤", class: 'bg-purple-600' },
  Hobiler: { icon: "🎨", class: 'bg-pink-500' }, 
  Diğer: { icon: "📌", class: 'bg-gray-500' },
};

const NoteItem = ({ note }) => {
 
  const { deleteNote } = useNoteStore();

  
  if (!note) {
    return null; 
  }
  
  const details = categoryDetails[note.category] || categoryDetails['Diğer'];

  const handleDelete = () => {
    if (window.confirm(`${note.title} başlıklı notu silmek istediğinize emin misiniz?`)) {
      deleteNote(note.id);
    }
  };

  return (
    <div className="note-card"> 
      

      <div className={`category-label ${details.class}`}>
        <span className="mr-1">{details.icon}</span>
        {note.category}
      </div>

      <h3 className="text-xl font-bold text-gray-800 mt-8 mb-2 line-clamp-2">{note.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{note.date}</p>
      
   
      <p className="text-gray-700 mb-4 line-clamp-4">{note.content}</p>

      <div className="flex justify-end space-x-2 mt-4">
    
        <Link
          to={`/edit/${note.id}`}
          className="edit"
        >
          Düzenle
        </Link>
        
       
        <button
          onClick={handleDelete}
          className="delete"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default NoteItem;