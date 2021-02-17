import React, { useEffect, useState} from 'react';
import Upload from './components/Upload.js'
import { db } from './firebase/firebase';

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        let post = doc.data();
        setPosts(prevState => [...prevState, post]);
      })
    })
  }, [])
  return (
    <div>
      <Upload />
      {
        posts.map((post) => (
          <img src={post.src} alt={post.title} height='200px' />
        ))
      }
    </div>
  )
}
