import { Tweet } from "@/typings";

// REST API call to our back end

export const fetchTweets = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`)

    const data = await res.json();
    const tweets: Tweet[] = data.tweets;

    return tweets
}
