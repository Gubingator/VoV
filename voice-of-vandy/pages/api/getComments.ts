// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {groq} from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Comment } from '../../typings'

// groq is like sanity's query language
const commentQuery = groq`
    *[_type == "comment" && references(*[_type== 'tweet' && _id == $tweetId]._id)] {
        _id,
        ...
    } | order(_created_At desc)
`

type Data = {
  tweet: Comment[] // custome type Comment array
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { tweetId } = req.query;

    // fetch tweets
    const comments: Comment[] = await sanityClient.fetch(commentQuery, {
        tweetId, // from const { tweetId } = req.query;
    })

    res.status(200).json( comments )
}
