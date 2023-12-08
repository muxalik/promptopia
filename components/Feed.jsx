'use client'

import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({ data, onTagClick }) => {
  const handleTagClick = (tag) => {
    return () => onTagClick(tag)
  }

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} onTagClick={handleTagClick(post.tag)} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [search, setSearch] = useState('')
  const [posts, setPosts] = useState([])

  const onSearchChange = (e) => setSearch(e.target.value)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(search.toLowerCase()) ||
      post.tag.toLowerCase().includes(search.toLowerCase()) ||
      post.creator.username.toLowerCase().includes(search.toLowerCase()) || 
      post.creator.email.toLowerCase().includes(search.toLowerCase()) 
  )

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={search}
          onChange={onSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList data={filteredPosts} onTagClick={setSearch} />
    </section>
  )
}

export default Feed
