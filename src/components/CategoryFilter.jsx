import useNoteStore from "../store/noteStore";
import React, { useState } from 'react';

const CategoryFilter = () => {
  const categories = useNoteStore((state) => state.categories);
  const categoryFilter = useNoteStore((state) => state.categoryFilter);
  const setCategoryFilter = useNoteStore((state) => state.setCategoryFilter);
  const addCategory = useNoteStore((state) => state.addCategory);
  const deleteCategory = useNoteStore((state) => state.deleteCategory); 

  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = (cat) => {
    if (["Ev", "İş", "Okul", "Diğer", "Kişisel", "Hobiler"].includes(cat)) {
        alert(`Varsayılan kategori ("${cat}") silinemez.`);
        return;
    }
    if (window.confirm(`"${cat}" kategorisini sildiğinizde, bu kategoriye ait tüm notlar "Diğer" kategoriye taşınacaktır. Emin misiniz?`)) {
      deleteCategory(cat);
    }
  };

  const allCategories = ["Hepsi", ...categories];

  return (
    <div className="mb-8">
    
      <div className="flex flex-wrap gap-3 p-3 bg-white rounded-xl shadow-md">
        <span className="text-gray-600 font-medium self-center mr-2">Kategoriler:</span>
        
        {allCategories.map((cat) => (
          <div key={cat} className="relative group flex items-center">
            <button
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition duration-200 ease-in-out ${
                categoryFilter === cat 
                  ? "bg-blue-600 text-white shadow-md transform scale-105" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
            
          
            {cat !== "Hepsi" && !["Ev", "İş", "Okul", "Diğer", "Kişisel", "Hobiler"].includes(cat) && (
                <button
                    onClick={(e) => { 
                        e.stopPropagation();
                        handleDeleteCategory(cat); 
                    }}
                    title={`${cat} kategorisini sil`}
                    className="absolute -top-1 -right-1.5 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 hover:scale-100"
                >
                    &times;
                </button>
            )}
          </div>
        ))}
      </div>
      
 
      <div className="mt-4 flex gap-2 p-3 bg-white rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Yeni Kategori Adı"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddCategory(); }}}
          className="w-full rounded-lg p-2 border border-gray-300 outline-none transition duration-200 focus:border-blue-600"
        />
        <button
          onClick={handleAddCategory}
          className="bg-green-600 text-white hover:bg-green-700 whitespace-nowrap px-4 py-2 rounded-lg font-semibold transition duration-200"
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;