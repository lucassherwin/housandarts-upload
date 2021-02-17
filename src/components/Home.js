import React from 'react'
import { Container, Post, Image } from './SyledComonents';

export default function Home({ posts, handleClick }) {
  return(
    <div>
      <Container>
      {
        posts ? posts.map(post => (
          <Post key={post.title} onClick={() => handleClick(post)}>
            <Image src={post.src} alt={post.title} />
          </Post>
        ))
        : null
      }
      </Container>
    </div>
  )
}