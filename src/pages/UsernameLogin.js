import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export default function UsernameLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // New user - create user doc
        await addDoc(usersRef, {
          username,
          createdAt: serverTimestamp(),
        });
      }
      // Log in (set username in app state)
      onLogin(username);
    } catch (err) {
      setError('Error checking username. Try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Login with Username</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value.trim())}
        required
        style={{ width: '100%', padding: 8, marginBottom: 12, fontSize: 16 }}
      />
      <button type="submit" disabled={loading} style={{ padding: '8px 16px', fontSize: 16 }}>
        {loading ? 'Checking...' : 'Login / Register'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
