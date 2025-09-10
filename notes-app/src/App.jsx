import { Routes, Route, Navigate } from "react-router-dom";
import NotesList from "./pages/NotesList";
import NewNote from "./pages/NewNote";
import EditNote from "./pages/EditNote";
import Layout from "./layouts/Layout";
import React from 'react';
import './index.css';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<NotesList />} />
        <Route path="new" element={<NewNote />} />
        <Route path="edit/:id" element={<EditNote />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
