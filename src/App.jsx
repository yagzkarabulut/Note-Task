

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoteForm from "./components/NoteForm"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
 
        <Route path="/add" element={<NoteForm />} /> 

        <Route path="/edit/:id" element={<NoteForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;

