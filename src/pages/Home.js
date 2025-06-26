import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

export default function Home({ user, onLogout }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    loadPosts();
  }, []);

  const handleEditorAccess = () => {
    if (!user) {
      alert('You must log in first.');
      navigate('/');
    } else {
      navigate('/editor');
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: '2rem' }}>
      <div style={{ marginBottom: 20 }}>
        Welcome, <strong>{user}</strong>!
        <button onClick={onLogout} style={{ marginLeft: 10, padding: '4px 8px' }}>
          Logout
        </button>
      </div>

      <button onClick={handleEditorAccess} style={{ margin: '1rem 0', padding: '0.5rem 1rem' }}>
        Write a New Post
      </button>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map(post => (
        <Link
          to={`/post/${post.id}`}
          key={post.id}
          style={{
            display: 'block',
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <h2>{post.title}</h2>
          <p style={{ color: '#666', fontSize: 14 }}>by {post.authorName || 'Anonymous'}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.slice(0, 150) + (post.content.length > 150 ? '...' : ''),
            }}
          />
        </Link>
      ))}
    </div>
  );
}
