import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import EditNote from "./pages/EditNote";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-indigo-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
