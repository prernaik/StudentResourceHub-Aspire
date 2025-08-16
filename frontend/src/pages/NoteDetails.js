import React from 'react';

const ResourceDetailPage = () => {
  return (
    <div>
      <h1>Resource Title 📄</h1>
      <p>Uploaded by: User (✅)</p>
      <p>Description goes here...</p>
      <button>Download/View</button>
      <div>
        <h3>Ratings & Comments</h3>
        {/* Add ratings/comments */}
      </div>
    </div>
  );
};

export default ResourceDetailPage;