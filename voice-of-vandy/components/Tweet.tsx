import React, { useEffect, useState } from 'react'
import { Comment, CommentBody, Tweet, TweetBody } from '../typings'
import TimeAgo from 'react-timeago'
import {
  ChatAlt2Icon,
  ThumbUpIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { fetchComments } from '../utils/fetchComments'

interface Props {
  tweet: Tweet
}

function Tweet({ tweet }: Props) {
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const [comments, setComments] = useState<Comment[]>([])

  const { data: session } = useSession()

  const [isUpvoted, setIsUpvoted] = useState(false);

  const handleClick = async () => {
    if (isUpvoted) {
      setIsUpvoted(false);
      tweet.upvotes -= 1;
    } else {
      setIsUpvoted(true);
      tweet.upvotes += 1;
    }
  }

  const refreshComments = async () => {
    const dataComments: Comment[] = await fetchComments(tweet._id)
    setComments(dataComments)
  }

  useEffect(() => {
    refreshComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const commentToast = toast.loading('Posting Comment...')

    // Comment logic
    const commentInfo: CommentBody = {
      comment: input,
      tweetId: tweet._id,
      username: 'anonymous',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      // username: session?.user?.name || 'Unknown User',
    }

    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: 'POST',
    })

    console.log('WOOHOO we made it', result)
    toast.success('Comment Posted!', {
      id: commentToast,
    })

    setInput('')
    setCommentBoxVisible(false)
    refreshComments()
  }

  return (
    <div
      key={tweet._id}
      className="flex flex-col space-x-3 border-y border-gray-100 p-5 "
    >
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImg || 'https://links.papareact.com/gll'}
          alt=""
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">🤫</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{"anonymous"} ·
            </p>

            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.audio && (
            <audio controls
              className='mt-2'>
              <source 
                src={tweet.audio}/>
            </audio>
          )}

          {tweet.image && (
            <img
              src={tweet.image}
              className="m-5 ml-0 mb-1 max-h-60  rounded-lg object-cover shadow-sm"
              alt=""
            />
          )}

        </div>
      </div>

      <div className="mx-5 hidden mt-5 items-center space-x-20 text-gray-100 lg:inline-flex">
        <div
          onClick={(e) => setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <button onClick={handleClick}>
            {isUpvoted ? <ThumbUpIcon className="h-5 w-5 text-blue-400" /> : <ThumbUpIcon className="h-5 w-5" />}
          </button>
    
          <p>{tweet.upvotes}</p>
        </div>
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-lg bg-gray-500 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
          />
          <button
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img
                src={comment.profileImg}
                className="mt-2 h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">🤫</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @anonymous
                  </p>

                  <TimeAgo
                    className="text-sm text-gray-500"
                    date={comment._createdAt}
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
