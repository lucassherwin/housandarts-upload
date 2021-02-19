import React, { useEffect, useState} from 'react';
import Upload from './components/Upload.js';
import { db } from './firebase/firebase';
import { Route, Switch, useHistory } from 'react-router-dom';
import PostPage from './components/PostPage.js';
import Home from './components/Home.js';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    db.collection('posts').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        // console.log(doc.id)
        let post = {data: doc.data(), id: doc.id}
        setPosts(prevState => [...prevState, post]);
      })
    })
  }, [])

  let history = useHistory();
  const handleClick = (post) => {
    setCurrentPost(post);
    history.push(`/${post.id}`);
  }


  // TODO:
  // auth

  return (
    <div>
      <Switch>
        <Route exact path='/'>
          <Home posts={posts} handleClick={handleClick} />
        </Route>
        <Route exact path='/upload'>
          <Upload />
        </Route>
        <Route exact path='/:title'>
          <PostPage currentPost={currentPost} />
        </Route>
      </Switch>
    </div>
  )
}
