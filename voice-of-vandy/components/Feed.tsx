import { Tweet } from '@/typings'
import { fetchTweets } from '@/utils/fetchTweets'
import { fetchComments } from '@/utils/fetchComments'
import {RefreshIcon} from '@heroicons/react/outline'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import TweetComponent from './Tweet' // renamed to resolve same name comflict
import TweetBox from './Tweetbox'

interface Props{
  tweets: Tweet[]
}

// `tweets: tweetsProp` to rename the Prop
function Feed({ tweets: tweetsProp }: Props) {

  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  // async function that updates the tweet state
  const handleRefresh = async () => {
    // using react-hot-toast below
    const refreshToast = toast.loading('Refreshing...')

    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feed Updated!', {
      id: refreshToast
    })
  }

  return (
    <div className="col-span-7 max-h-screen overflow-scroll scrollbar-hide lg:col-span-5 border-x">
        {/* RefreshIcon */}
        <div className="flex items-center justify-between">
            <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
            <RefreshIcon 
              onClick={handleRefresh} 
              className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" 
            />
        </div>

        {/* Tweetbox */}
        <div>
            <TweetBox setTweets={setTweets} />
        </div>

        {/* Feed */}
        <div>
          { tweets.map(tweet => (
            <TweetComponent key={tweet._id} tweet={tweet} />
          ))}
        </div>


    </div>
  )
}

export default Feed