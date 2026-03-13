import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./components/buttons/Button";
import { SlideText } from "./components/ui/SlideText";
import NoteCard from "./components/NoteCard/NoteCard";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  // get all notes
  const fetchNotes = () => {
    axios
      .get("https://reline-notes.onrender.com/api/notes")
      .then((res) => setNotes(res.data.allNotes))
      .catch((err) => console.log(err));
  };

  const resetFormValue = () => {
    setFormTitle("");
    setFormDescription("");
    setEditingNoteId(null);
  };

  // Create or update note
  const handelSubmit = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;

    const newTitle = title.value.trim();
    const newDescription = description.value.trim();

    if (newTitle === "" || newDescription === "") return;

    if (editingNoteId) {
      axios
        .patch(`https://reline-notes.onrender.com/api/notes/${editingNoteId}`, {
          title: newTitle,
          description: newDescription,
        })
        .then(() => {
          fetchNotes();
          resetFormValue();
        })
        .catch((err) => console.log(err));
      return;
    }

    axios
      .post("https://reline-notes.onrender.com/api/notes", {
        title: newTitle,
        description: newDescription,
      })
      .then(() => {
        fetchNotes();
        resetFormValue();
      })
      .catch((err) => console.log(err));
  };

  // Delete note
  const handelDeleteNote = (noteId) => {
    axios
      .delete(`https://reline-notes.onrender.com/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      })
      .catch((err) => console.log(err));
  };

  // Start editing a note
  const handelUpdateNote = (noteId, currentTitle, currentDescription) => {
    setEditingNoteId(noteId);
    setFormTitle(currentTitle);
    setFormDescription(currentDescription);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neutral-100 text-neutral-800 flex justify-center items-center overflow-x-hidden">
      <div className="w-full h-full md:p-20 flex flex-col gap-y-30 justify-start items-center max-w-6xl">
        {/* form */}
        <div className="form text-neutral-600 flex flex-col gap-7 items-start justify-center">
          <h2 className="font-Kameron text-2xl">What's on your mind?</h2>

          <form
            onSubmit={handelSubmit}
            className="flex flex-col bg-neutral-200 w-full md:w-96 px-5 py-7 rounded-2xl gap-5"
          >
            <input
              name="title"
              className="outline-none"
              type="text"
              placeholder="Enter title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
            />
            <textarea
              name="description"
              className="outline-none"
              placeholder="Enter description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
            <Button className="w-full pt-2 pb-0.5 cursor-pointer">
              <SlideText text={editingNoteId ? "Update" : "Create"} />
            </Button>
          </form>
        </div>

        {/* notes */}
        <div className="flex flex-col items-center md:flex-row flex-wrap md:items-start gap-5 w-full h-full">
          {notes.map((note, index) => (
            <NoteCard
              key={note._id ?? index}
              note={note}
              index={index}
              handelDeleteNote={() => handelDeleteNote(note._id)}
              onEdit={() =>
                handelUpdateNote(note._id, note.title, note.description)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
