import React from 'react';

const ResourceListingPage = () => {
  return (
    <div>
      <input type="text" placeholder="Search resources..." />
      <div className="sidebar">
        <select>
          <option value="">College</option>
          {/* Add options */}
        </select>
        <select>
          <option value="">Semester</option>
          {/* Add options */}
        </select>
        <select>
          <option value="">Subject</option>
          {/* Add options */}
        </select>
        <select>
          <option value="">Uploader Type</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      <div className="main-grid">
        {/* Resource cards */}
        <div>
          <h3>Resource Title</h3>
          <span>📄</span>
          <span>★ ★ ★ ★ ★</span>
          <span>✅</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceListingPage;