// src/pages/Notes.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/notes'); // <-- change path to match backend
        setNotes(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h2>All Notes</h2>
      {loading && <p>Loading notes…</p>}
      {error && <p className="error">{error}</p>}
      <div className="grid">
        {notes.length === 0 && !loading ? <p>No notes found.</p> : notes.map(n => (
          <NoteCard key={n._id || n.id} note={n} />
        ))}
      </div>
    </div>
  );
}
