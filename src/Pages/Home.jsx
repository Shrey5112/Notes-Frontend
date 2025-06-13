import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import Navbar from "../components/Navbar";
import "../App.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (editId && !notes.find((note) => note.id === editId)) {
      setEditId(null);
      setNewNote({ title: "", content: "" });
    }
  }, [notes, editId]);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/notes");
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.title.trim()) return alert("Title is required");

    if (editId) {
      await axios.put(`http://localhost:5000/notes/${editId}`, newNote);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/notes", {
        ...newNote,
        timestamp: new Date().toISOString(),
      });
    }

    setNewNote({ title: "", content: "" });
    fetchNotes();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete?")) {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    }
  };

  const handleEdit = (note) => {
    setNewNote({ title: note.title, content: note.content });
    setEditId(note.id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <NoteForm
        newNote={newNote}
        setNewNote={setNewNote}
        handleSubmit={handleSubmit}
        editId={editId}
      />

      <NoteList
        notes={filteredNotes}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
