import React, { useState } from 'react';

const UploadResourcePage = () => {
  const [progress, setProgress] = useState(0);

  return (
    <form>
      <input type="text" placeholder="Title" />
      <select>
        <option value="notes">Notes</option>
        <option value="youtube">YouTube Playlist</option>
        <option value="papers">Past Papers</option>
        <option value="project">Project Doc</option>
      </select>
      <input type="text" placeholder="Subject" />
      <input type="text" placeholder="Semester" />
      <input type="text" placeholder="College" />
      <input type="file" />
      <input type="text" placeholder="Link (optional)" />
      <button type="submit" onClick={() => setProgress(100)}>Submit</button>
      <progress value={progress} max="100" />
    </form>
  );
};

export default UploadResourcePage;