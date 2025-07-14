import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://ngatimaruwebsitevite.local/wp-json/wp/v2/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to fetch posts:', err))
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="mb-6">
          <h2 className="text-xl font-semibold">{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      ))}
    </div>
  )
}

export default Home