import React from "react";

const NoteList = ({ notes, handleEdit, handleDelete }) => (
  <div className="card-container">
    {notes.map((note, index) => (
      <div key={note.id} className={`note-card color-${index % 5}`}>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <small className="timestamp">
          {note.updatedAt
            ? `Updated at: ${new Date(note.updatedAt).toLocaleString()}`
            : `Added at: ${new Date(note.createdAt).toLocaleString()}`}
        </small>

        <div className="actions">
          <button
            onClick={() => handleEdit(note)}
            style={{ backgroundColor: "green", color: "white" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(note.id)}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default NoteList;
