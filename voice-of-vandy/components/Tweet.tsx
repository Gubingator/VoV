import React, { useEffect, useState } from 'react'
import { Tweet, Comment } from '../typings'
import TimeAgo from 'react-timeago'
import { ArrowDownIcon, ArrowUpIcon, ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'
import { fetchComments } from '@/utils/fetchComments'

interface Props{
    tweet: Tweet
  }

function Tweet({ tweet } : Props) {
    const [comments, setComments] = useState<Comment[]>([])

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }

    useEffect(() => {
      refreshComments()
    }, [])

    // structure and reder the tweet nicely
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-400'>
        <div className='flex space-x-3'>
            <img 
            className='h-10 w-10 rounded-full object-cover'
            src={tweet.profileImg} alt = "profileImg" 
            />

        </div>
        
        <div>
            <div className='flex items-center space-x-1'>
                <p className='mr-1 font-bold'>{tweet.username}</p>
                <p className='hidden text-sm text-gray-300 sm:inline'>
                    @{tweet.username.replace(/\s+/g, '').toLowerCase()} -
                </p>

                <TimeAgo 
                className='text-sm text-gray-300'
                date={tweet._createdAt}
                />
            </div>

            <p className='pt-1'>
                {tweet.text}
            </p>
            {tweet.audio && (
                <audio src={tweet.audio} controls
                className='m-5 ml-0 mb-1 shadow-sm'/>
            )}
        </div>

        <div className='mt-5 flex justify-between'>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-300'>
                <ChatAlt2Icon className='h-5 w-5' />
                <p>{comments.length}</p>
            </div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-300'>
                <ArrowUpIcon className='h-5 w-5' />
                <p>69</p>
            </div>
            <div className='flex cursor-pointer items-center space-x-3 text-gray-300'>
                <ArrowDownIcon className='h-5 w-5' />
                <p>420</p>
            </div>
        </div>

        {/* comment block logic */}

        {comments?.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>

            {comments.map((comment) => (
                <div key={comment._id} className='relative flex space-x-2'>
                    <hr className='absolute left-5 top-10 h-8 border-x border-MetallicGold/30' />
                    <img 
                        src={comment.profileImg} alt= "profileImg" 
                        className='mt-2 h-7 w-7 rounded-full object-cover'
                    />
                    <div>
                        <div className='flex items-center space-x-1'>
                            <p className='mr-1 font-bold'>{comment.username}</p>
                            <p className='hidden text-sm text-gray-300 lg:inline'>
                                @{comment.username.replace(/\s+/g, '').toLowerCase()} -
                            </p>

                            <TimeAgo 
                            className='text-sm text-gray-300'
                            date={tweet._createdAt}
                            />
                        </div>
                        
                        <p>{comment.comment}</p> 

                    </div>
                </div>
            ))} 
        </div>
        )}

    </div>
  )
}

export default Tweet