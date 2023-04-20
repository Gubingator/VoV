// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'
import { Tweet } from '../../typings'
import { groq } from 'next-sanity'

const feedQuery = groq`
    *[_type == 'tweet' && !blockTweet]{
        _id,
        ...
    } | order(_createdAt desc)
`

type Data = {
  tweets: Tweet[] // custome type tweet array
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Authorization')
    
    // fetch tweets
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery)

    // console.log(tweets)
    res.status(200).json({ tweets })
}
