'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/profile'

const UserProfile = ({ params }) => {
  const [posts, setPosts] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()
  const username = searchParams.get('name')

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()

      setPosts(data)
    }

    if (params.id) fetchPosts()
  }, [])

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username} profile page`}
      data={posts}
    />
  )
}

export default UserProfile
