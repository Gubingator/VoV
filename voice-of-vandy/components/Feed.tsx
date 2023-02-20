import { Tweet } from '@/typings'
import {RefreshIcon} from '@heroicons/react/outline'
import React from 'react'
import TweetComponent from './Tweet' // renamed to resolve same name comflict
import Tweetbox from './Tweetbox'

interface Props{
  tweets: Tweet[]
}

function Feed({ tweets }: Props) {
  return (
    <div className = "flex flex-col col-span-5 border-x"> 
        <div className='flex items-center justify-between'>
            <h1 className='p-5 pb-0 text-xl font-bold'>Home</h1>
            <RefreshIcon className='mr-5 mt-5 h-8 w-8 cursor-pointer text-FlatGold transition-all duration-500 ease-out hover:rotate-180 active:scale-125' />
        </div>

        <div className='flex items-center justify-between'>
            <Tweetbox/>
        </div>

      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet}/>
        ))}
      </div>

    </div>
  )
}

export default Feed