import React, { useEffect } from "react";

const NoteForm = ({ newNote, setNewNote, handleSubmit, editId }) => {
  useEffect(() => {
    if (!newNote.content && editId) {
      setNewNote({ title: "", content: "" });
    }
  }, [newNote.content, editId, setNewNote]);

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={newNote.title}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Content"
        value={newNote.content}
        onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
      />
      <button type="submit">
        {editId && newNote.content ? "Update" : "Add"} Note
      </button>
    </form>
  );
};

export default NoteForm;
