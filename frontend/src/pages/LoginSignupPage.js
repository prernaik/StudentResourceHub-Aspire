import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginSignupPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';
      const body = isLogin
        ? { username: form.username, password: form.password }
        : form;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // On success, redirect to home
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .auth-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .auth-title {
          color: #333;
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .auth-subtitle {
          color: #666;
          font-size: 14px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-input, .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e1e5e9;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          outline: none;
          box-sizing: border-box;
        }
        
        .form-input:focus, .form-select:focus {
          border-color: #667eea;
        }
        
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
          margin-bottom: 20px;
        }
        
        .submit-btn:hover {
          transform: translateY(-2px);
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .toggle-btn {
          width: 100%;
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
          padding: 12px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .toggle-btn:hover {
          background: #667eea;
          color: white;
        }
        
        .error-message {
          background: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
          font-size: 14px;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
      
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to your account' : 'Join the Student Resource Hub'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <input
              className="form-input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>
          
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <input
              className="form-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            <div className="btn-content">
              {loading && <div className="loading-spinner"></div>}
              {isLogin ? 'Sign In' : 'Create Account'}
            </div>
          </button>
        </form>
        
        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
}