import { Tweet } from "@/typings";

// REST API call to our back end

export const fetchTweets = async () => {
    const res = await fetch(`/api/getTweets`)

    const data = await res.json();
    const tweets: Tweet[] = data.tweets;

    return tweets
}
