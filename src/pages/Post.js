import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        setPost(null);
      }
    };
    loadPost();
  }, [id]);

  if (post === null) return <p>Loading...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <Link to="/">← Back to Home</Link>
      <h1>{post.title}</h1>
      <p style={{ color: '#666' }}>by {post.authorName || 'Anonymous'}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: post.content }} style={{ marginTop: 20 }} />
    </div>
  );
}
