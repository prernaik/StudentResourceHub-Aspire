// src/pages/NoteDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function NoteDetails() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/notes/${id}`); // adjust path if needed
        setNote(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!note) return <p>Note not found</p>;

  return (
    <div className="container">
      <h2>{note.title}</h2>
      <p className="meta">{note.subject} • {note.author}</p>
      <div className="note-body">
        <p>{note.content || note.description}</p>
        {/* If content has HTML, you can use dangerouslySetInnerHTML after sanitizing */}
      </div>
    </div>
  );
}
