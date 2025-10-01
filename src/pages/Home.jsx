import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import CategoryFilter from "../components/CategoryFilter";

const Home = () => {
  return (
    <div className="container">
      <h1>📝 Notly</h1>
      <NoteForm />
   
      <NoteList />
    </div>
  );
};

export default Home;
