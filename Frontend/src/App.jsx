import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);
  function fetchNotes() {
    axios.get("https://deployment-2-0c7t.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function createNote(e) {
    e.preventDefault();
    const { title, desc } = e.target.elements;
    axios
      .post("https://deployment-2-0c7t.onrender.com/api/notes", {
        title: title.value,
        desc: desc.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }
  function deleteNote(noteId) {
    console.log(noteId);
    axios
      .delete("https://deployment-2-0c7t.onrender.com/api/notes/" + noteId)
      .then((req, res) => {
        fetchNotes();
      });
  }
  return (
    <>
      <div className="notes-form">
        <form onSubmit={createNote}>
          <input name="title" type="text" placeholder="enter title" />
          <input name="desc" type="text" placeholder="enter desc" />
          <button>Create Note</button>
        </form>
      </div>
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.desc}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteNote(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
