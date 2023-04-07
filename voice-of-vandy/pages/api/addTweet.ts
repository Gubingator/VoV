// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TweetBody } from '@/typings'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const data: TweetBody = JSON.parse(req.body) 
    console.log("\\\\\\\\\\\\\\\\")
    console.log(data)

    const mutations = {
        mutations: [
            {
                create: {
                    _type: 'tweet',
                    text: data.text,
                    username: data.username,
                    blockTweet: false,
                    profileImg: data.profileImg,
                    image: data.image,
                    audio: data.audio,
                    upvotes: data.upvotes,
                }
            }
        ]
    }

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
    
    console.log(apiEndpoint)

    const result = await fetch(apiEndpoint, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`, 
            // New Editor SANITY_API_TOKEN Works!! Problem was the API Token permission in sanity.io was not set to editor
        },
        body: JSON.stringify(mutations),
        method: 'POST',
    })

    const json = await result.json()

    console.log(json)

    res.status(200).json({ message: 'Added Tweet!' })
}
