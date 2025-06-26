import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Editor({ user }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      alert('Please login first');
      navigate('/');
      return;
    }
    if (!title || !content) {
      alert('Please fill out both title and content');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        title,
        content,
        authorName: user,
        createdAt: serverTimestamp(),
      });

      alert('Post published!');
      setTitle('');
      setContent('');
      navigate('/');
    } catch (error) {
      alert('Error publishing post: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <input
        placeholder="Post Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', fontSize: 20, padding: 10, marginBottom: 15 }}
      />
      <textarea
        rows={15}
        placeholder="Write your post content here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{ width: '100%', fontSize: 16, padding: 10 }}
      />
      <button
        onClick={handleSubmit}
        style={{ marginTop: 20, padding: '10px 20px', fontSize: 16 }}
      >
        Publish
      </button>
    </div>
  );
}

