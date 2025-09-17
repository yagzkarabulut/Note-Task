import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useNotesStore from '../store/useNotesStore';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { tasks, clearTasks } = useNotesStore();
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  // Task düzenleme event listener'ı
  useEffect(() => {
    const handleEditTask = (event) => {
      setEditingTaskId(event.detail);
      setShowForm(true);
    };

    window.addEventListener('editTask', handleEditTask);
    return () => window.removeEventListener('editTask', handleEditTask);
  }, []);

  // Taskları filtreleme ve sıralama
  const filteredAndSortedTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filterBy === 'completed') return matchesSearch && task.completed;
      if (filterBy === 'pending') return matchesSearch && !task.completed;
      if (filterBy === 'high') return matchesSearch && task.priority === 'high';
      if (filterBy === 'medium') return matchesSearch && task.priority === 'medium';
      if (filterBy === 'low') return matchesSearch && task.priority === 'low';
      
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'updated':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'title':
          return a.title.localeCompare(b.title, 'tr');
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const handleAddTask = () => {
    setEditingTaskId(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTaskId(null);
  };

  const handleClearAll = () => {
    console.log('Tümünü Sil butonu tıklandı!');
    if (window.confirm('Tüm taskları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      console.log('Onay verildi, tasklar siliniyor...');
      clearTasks();
      console.log('Tüm tasklar silindi!');
    } else {
      console.log('Silme işlemi iptal edildi.');
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="header-gradient shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="text-white">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold">Tasklarım</h1>
              </div>
              <div className="flex items-center space-x-6 text-blue-100 text-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{completedTasks} Tamamlandı</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>{pendingTasks} Beklemede</span>
                </div>
                <span>• {filteredAndSortedTasks.length} görüntüleniyor</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-0 flex space-x-4">
              <Link
                to="/notes"
                className="btn-secondary glass-effect"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Notlara Git</span>
              </Link>
              <button
                onClick={handleAddTask}
                className="btn-primary glass-effect"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Yeni Task</span>
              </button>
              {tasks.length > 0 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Tümünü Sil butonu tıklandı!');
                    handleClearAll();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2 gentle-bounce"
                  style={{ cursor: 'pointer', zIndex: 10, position: 'relative' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Tümünü Sil</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 floating-animation"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24 floating-animation" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-4">
        <div className="card">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Arama */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Tasklarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Filtreleme */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  <label htmlFor="filter" className="text-sm font-semibold text-gray-700">
                    Filtrele:
                  </label>
                </div>
                <select
                  id="filter"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="input-field w-auto min-w-[120px]"
                >
                  <option value="all">Tümü</option>
                  <option value="pending">Beklemede</option>
                  <option value="completed">Tamamlanmış</option>
                  <option value="high">Yüksek Öncelik</option>
                  <option value="medium">Orta Öncelik</option>
                  <option value="low">Düşük Öncelik</option>
                </select>
              </div>

              {/* Sıralama */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <label htmlFor="sort" className="text-sm font-semibold text-gray-700">
                    Sırala:
                  </label>
                </div>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-auto min-w-[150px]"
                >
                  <option value="newest">En Yeni</option>
                  <option value="oldest">En Eski</option>
                  <option value="updated">Son Güncellenen</option>
                  <option value="title">Başlığa Göre</option>
                  <option value="priority">Önceliğe Göre</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasklar Listesi */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-16">
            <div className="card max-w-md mx-auto">
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {searchTerm || filterBy !== 'all' ? 'Arama sonucu bulunamadı' : 'Henüz task yok'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || filterBy !== 'all'
                    ? 'Farklı anahtar kelimeler veya filtreler deneyin'
                    : 'İlk taskınızı eklemek için aşağıdaki butona tıklayın'
                  }
                </p>
                {!searchTerm && filterBy === 'all' && (
                  <button
                    onClick={handleAddTask}
                    className="btn-primary"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>İlk Taskımı Ekle</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredAndSortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          taskId={editingTaskId}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default TaskList;
