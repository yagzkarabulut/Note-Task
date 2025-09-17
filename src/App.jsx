import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteList from './components/NoteList';
import TaskList from './components/TaskList';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
