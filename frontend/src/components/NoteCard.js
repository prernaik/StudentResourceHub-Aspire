// src/components/NoteCard.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteCard({ note }) {
  return (
    <article className="card">
      <h3>{note.title || 'Untitled'}</h3>
      <p className="meta">{note.subject || 'General'} • {note.author || 'Unknown'}</p>
      <p className="excerpt">{(note.excerpt || (note.description || '').slice(0, 120)) + (note.description?.length > 120 ? '…' : '')}</p>
      <div className="card-actions">
        <Link to={`/notes/${note._id || note.id}`}>Open</Link>
      </div>
    </article>
  );
}
