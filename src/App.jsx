import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNote from "../src/components/AddNote.jsx";
import NotesList from "../src/components/NoteList.jsx";
import EditNote from "../src/components/EditNote.jsx";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NotesList />}/>
      <Route path="/add" element={<AddNote />}/>
      <Route  path="/edit/:id" element={<EditNote />}/>
    </Routes>
       
    </BrowserRouter>
  )
}
