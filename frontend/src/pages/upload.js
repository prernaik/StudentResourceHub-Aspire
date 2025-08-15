// src/pages/Upload.js
import React, { useState } from 'react';
import api from '../services/api';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('Submitting…');
    try {
      // Example POST with file:
      // const form = new FormData();
      // form.append('title', title);
      // form.append('subject', subject);
      // form.append('file', file);
      // await api.post('/api/notes', form, { headers: {'Content-Type': 'multipart/form-data'} });

      // For milestone you can leave this disabled and implement later
      setMsg('Upload endpoint not enabled yet (do this after milestone).');
    } catch (err) {
      setMsg(err.message || 'Upload failed');
    }
  };

  return (
    <div className="container">
      <h2>Upload Note (form stub)</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
