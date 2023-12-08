'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const PromptCard = ({ post, onTagClick, onEdit, onDelete }) => {
  const [copied, setCopied] = useState('')
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const onCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }

  const onCreatorClick = (creator) => {
    router.push(`/profile/${creator._id}?name=${creator.username}`)
  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <button
          onClick={
            post.creator._id !== session?.user.id
              ? () => onCreatorClick(post.creator)
              : null
          }
          className='flex-1 justify-start items-center gap-3 cursor-pointer text-left'
        >
          <Image
            src={post.creator.image}
            alt='User Image'
            width={40}
            height={40}
            className='rounded-full object-contain mb-3'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </button>

        <div className='copy_btn' onClick={onCopy}>
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => onTagClick && onTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={onEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={onDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
