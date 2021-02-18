import React from 'react'
import { Container, Post, Image } from './SyledComonents';

export default function Home({ posts, handleClick }) {
  return(
    <div>
      <Container>
      {
        posts ? posts.map(post => (
          <Post key={post.data.title} onClick={() => handleClick(post)}>
            <Image src={post.data.src} alt={post.data.title} />
          </Post>
        ))
        : null
      }
      </Container>
    </div>
  )
}