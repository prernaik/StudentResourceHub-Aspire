import React, { useState } from 'react';

const LoginSignupPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('login')}>Login</button>
        <button onClick={() => setActiveTab('signup')}>Signup</button>
      </div>
      {activeTab === 'login' ? (
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="text" placeholder="Name" />
          <select>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button type="submit">Signup</button>
        </form>
      )}
    </div>
  );
};

export default LoginSignupPage;