import { createClient } from 'next-sanity'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-03-25',
    useCdn: process.env.NODE_ENV === 'production',

    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,

}

// set up the client for detching data in the getprops page functions
export const sanityClient = createClient(config)