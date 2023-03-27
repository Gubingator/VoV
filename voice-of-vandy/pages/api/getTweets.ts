// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {createClient, groq} from 'next-sanity'
import { sanityClient } from '../../sanity'
import { Tweet } from '../../typings'

// groq is like sanity's query language
const feedQuery = groq`
    *[_type == "tweet" && !blockTweet] {
        _id,
        ...
    } | order(_created_At desc)
`

type Data = {
  tweets: Tweet[] // custome type tweet array
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // fetch tweets
    const tweets: Tweet[] = await sanityClient.fetch(feedQuery)

    console.log(tweets)
    res.status(200).json({ tweets })
}
