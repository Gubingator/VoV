import React from 'react'
import { Tweet } from '../typings'
import TimeAgo from 'react-timeago'
import { ArrowDownIcon, ArrowUpIcon, ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon } from '@heroicons/react/outline'

interface Props{
    tweet: Tweet
  }

function Tweet({ tweet } : Props) {
    // structure and reder the tweet nicely
  return (
    <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
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
                <p>fake #</p>
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

    </div>
  )
}

export default Tweet