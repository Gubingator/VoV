// custom type definition file

export interface Tweet extends TweetBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev:string
    _type: 'tweet'
    blockTweet: boolean
}

export type TweetBody = {
    text: string
    username: string
    profileImg: string 
    audio?: file        // trying this for audio
}

export type CommentBody = {
    comment: string
    tweetId: string
    username: string
    profileImg: string 
    audio?: file        // trying this for audio
}

export interface Comment extends CommentBody{
    _createdAt: string
    _id: string
    _rev:string
    _type: 'comment'
    _updatedAt: string
    // reference of the tweet below
    tweet: {
        _ref: string
        _type: 'reference'
    }
}