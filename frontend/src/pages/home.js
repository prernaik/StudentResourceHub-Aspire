import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Form states
  const [resourceForm, setResourceForm] = useState({
    title: '', description: '', content: '', type: 'note', 
    subject: '', semester: 1, college: ''
  });
  const [commentForm, setCommentForm] = useState({
    resourceId: '', content: '', rating: 5
  });
  const [profileForm, setProfileForm] = useState({
    username: '', email: '', role: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setProfileForm({
      username: parsedUser.username,
      email: parsedUser.email,
      role: parsedUser.role
    });
    fetchResources();
  }, [navigate]);

  const fetchResources = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/resources');
      const data = await res.json();
      setResources(data.resources || []);
    } catch (err) {
      setError('Failed to fetch resources');
    }
  };

  const fetchComments = async (resourceId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/comments/resource/${resourceId}`);
      const data = await res.json();
      // Comments will be used for displaying in the future
      console.log('Comments:', data.comments || []);
    } catch (err) {
      setError('Failed to fetch comments');
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...resourceForm, uploaderId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResourceForm({
        title: '', description: '', content: '', type: 'note', 
        subject: '', semester: 1, college: ''
      });
      fetchResources();
      setActiveTab('resources');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...commentForm, userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCommentForm({ resourceId: '', content: '', rating: 5 });
      fetchComments(commentForm.resourceId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login-signup');
  };

  const deleteResource = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchResources();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f8fafc;
        }
        
        .sidebar {
          width: 250px;
          background: #2d3748;
          color: white;
          padding: 20px 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }
        
        .sidebar-header {
          padding: 0 20px 20px;
          border-bottom: 1px solid #4a5568;
          margin-bottom: 20px;
        }
        
        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        
        .sidebar-subtitle {
          font-size: 12px;
          color: #a0aec0;
        }
        
        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .nav-item {
          padding: 12px 20px;
          cursor: pointer;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .nav-item:hover {
          background: #4a5568;
        }
        
        .nav-item.active {
          background: #667eea;
        }
        
        .logout-btn {
          margin: 20px;
          padding: 10px;
          background: #e53e3e;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          width: calc(100% - 40px);
        }
        
        .main-content {
          margin-left: 250px;
          flex: 1;
          padding: 20px;
        }
        
        .content-header {
          background: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .content-body {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        .form-label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #4a5568;
        }
        
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          box-sizing: border-box;
        }
        
        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .btn-primary {
          background: #667eea;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }
        
        .btn-danger {
          background: #e53e3e;
          color: white;
          padding: 6px 12px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .resource-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          transition: box-shadow 0.2s;
        }
        
        .resource-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .resource-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 8px;
        }
        
        .resource-title {
          font-size: 16px;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 4px;
        }
        
        .resource-meta {
          font-size: 12px;
          color: #718096;
        }
        
        .resource-description {
          color: #4a5568;
          margin: 8px 0;
        }
        
        .error-alert {
          background: #fed7d7;
          color: #c53030;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 15px;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .stat-card {
          background: #667eea;
          color: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
        }
        
        .stat-number {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">Student Hub</div>
          <div className="sidebar-subtitle">Welcome, {user?.username}</div>
        </div>
        
        <ul className="sidebar-nav">
          <li 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </li>
          <li 
            className={`nav-item ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Resources
          </li>
          <li 
            className={`nav-item ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Upload Resource
          </li>
          <li 
            className={`nav-item ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            💬 Add Comment
          </li>
          <li 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </li>
        </ul>
        
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      <div className="main-content">
        {error && <div className="error-alert">{error}</div>}
        
        {activeTab === 'dashboard' && (
          <>
            <div className="content-header">
              <h1>Dashboard Overview</h1>
              <p>Welcome back to your resource hub</p>
            </div>
            
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{resources.length}</div>
                <div className="stat-label">Total Resources</div>
              </div>
              <div className="stat-card" style={{background: '#48bb78'}}>
                <div className="stat-number">{user?.points || 0}</div>
                <div className="stat-label">Your Points</div>
              </div>
              <div className="stat-card" style={{background: '#ed8936'}}>
                <div className="stat-number">{user?.role}</div>
                <div className="stat-label">Account Type</div>
              </div>
            </div>
            
            <div className="content-body">
              <h3>Recent Resources</h3>
              {resources.slice(0, 3).map(resource => (
                <div key={resource._id} className="resource-card">
                  <div className="resource-title">{resource.title}</div>
                  <div className="resource-meta">
                    {resource.type} • {resource.subject} • Semester {resource.semester}
                  </div>
                  <div className="resource-description">{resource.description}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'resources' && (
          <>
            <div className="content-header">
              <h1>All Resources</h1>
              <p>Browse and manage resources</p>
            </div>
            <div className="content-body">
              {resources.map(resource => (
                <div key={resource._id} className="resource-card">
                  <div className="resource-header">
                    <div>
                      <div className="resource-title">{resource.title}</div>
                      <div className="resource-meta">
                        {resource.type} • {resource.subject} • Semester {resource.semester} • {resource.college}
                      </div>
                    </div>
                    {resource.uploaderId === user?.id && (
                      <button 
                        className="btn-danger"
                        onClick={() => deleteResource(resource._id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="resource-description">{resource.description}</div>
                  <div style={{marginTop: '10px'}}>
                    <a href={resource.content} target="_blank" rel="noopener noreferrer">
                      View Resource →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'upload' && (
          <>
            <div className="content-header">
              <h1>Upload New Resource</h1>
              <p>Share your knowledge with the community</p>
            </div>
            <div className="content-body">
              <form onSubmit={handleResourceSubmit}>
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    className="form-input"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({...resourceForm, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Type</label>
                    <select
                      className="form-select"
                      value={resourceForm.type}
                      onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                    >
                      <option value="note">Note</option>
                      <option value="video">Video</option>
                      <option value="question_paper">Question Paper</option>
                      <option value="project">Project</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      className="form-input"
                      value={resourceForm.subject}
                      onChange={(e) => setResourceForm({...resourceForm, subject: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Semester</label>
                    <input
                      className="form-input"
                      type="number"
                      min="1"
                      max="8"
                      value={resourceForm.semester}
                      onChange={(e) => setResourceForm({...resourceForm, semester: parseInt(e.target.value)})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">College</label>
                    <input
                      className="form-input"
                      value={resourceForm.college}
                      onChange={(e) => setResourceForm({...resourceForm, college: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    value={resourceForm.description}
                    onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Content URL</label>
                  <input
                    className="form-input"
                    type="url"
                    value={resourceForm.content}
                    onChange={(e) => setResourceForm({...resourceForm, content: e.target.value})}
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload Resource'}
                </button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'comments' && (
          <>
            <div className="content-header">
              <h1>Add Comment</h1>
              <p>Share your feedback on resources</p>
            </div>
            <div className="content-body">
              <form onSubmit={handleCommentSubmit}>
                <div className="form-group">
                  <label className="form-label">Select Resource</label>
                  <select
                    className="form-select"
                    value={commentForm.resourceId}
                    onChange={(e) => setCommentForm({...commentForm, resourceId: e.target.value})}
                    required
                  >
                    <option value="">Choose a resource...</option>
                    {resources.map(resource => (
                      <option key={resource._id} value={resource._id}>
                        {resource.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select
                    className="form-select"
                    value={commentForm.rating}
                    onChange={(e) => setCommentForm({...commentForm, rating: parseInt(e.target.value)})}
                  >
                    <option value="1">⭐ 1 Star</option>
                    <option value="2">⭐⭐ 2 Stars</option>
                    <option value="3">⭐⭐⭐ 3 Stars</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars</option>
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Comment</label>
                  <textarea
                    className="form-textarea"
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                    placeholder="Share your thoughts about this resource..."
                    required
                  />
                </div>
                
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'profile' && (
          <>
            <div className="content-header">
              <h1>Profile Settings</h1>
              <p>Manage your account information</p>
            </div>
            <div className="content-body">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  className="form-input"
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  className="form-input"
                  value={profileForm.role}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Points</label>
                <input
                  className="form-input"
                  value={user?.points || 0}
                  disabled
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Member Since</label>
                <input
                  className="form-input"
                  value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  disabled
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
