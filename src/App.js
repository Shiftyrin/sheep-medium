import React, { useState } from 'react';
import UsernameLogin from './pages/UsernameLogin';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Post from './pages/Post';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(null); // username string

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <Routes>
        {/* If not logged in, any route shows login */}
        {!user && <Route path="*" element={<UsernameLogin onLogin={setUser} />} />}

        {/* Logged-in routes */}
        {user && (
          <>
            <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
            <Route path="/editor" element={<Editor user={user} />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}


