import { 
    PhotographIcon, 
    MicrophoneIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import  { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { useReactMediaRecorder } from "react-media-recorder"

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {
    const [input, setInput] = useState<string>('')
    const [base64Audio, setBase64Audio] = useState<string>('')
    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const [micBoxIsOpen, setMicBoxOpen] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [initialUpvote, setUpvote] = useState<number>(0)
    const [isActive, setIsActive] = useState(false);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    function blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
          };
          reader.onerror = reject;
        });
      }

    const postTweet = async () => {
        let mediaBlob = await fetch(mediaBlobUrl!).then(r => r.blob());
        let base64data = await blobToBase64(mediaBlob);
        
        if (base64data.substring(5,14) === 'text/html') {
            base64data = '';
        }

        setBase64Audio(base64data); // why dont this work???

        console.log('audio turned into base64 here')
        console.log(base64data) // too big to console log 
        console.log(base64Audio)

        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
            audio: base64Audio,
            upvotes: initialUpvote,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })

        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Voice Posted', {
            icon: '🎉',
        })

        // base64data = ''; // set to null again after posting <- also dont work!!!

        return json
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        postTweet();
        setInput('');
        setImage('');
        setBase64Audio('');
        setImageUrlBoxIsOpen(false);
        setMicBoxOpen(false);
    }

    const {
        startRecording,
        stopRecording,
        mediaBlobUrl
      } = useReactMediaRecorder({
        video: false,
        audio: true,
      });

  return (
    <div className="flex space-x-2 p-5">
        <img 
            className="h-14 w-14 mt-4 rounded-full object-cover"
            src={ session?.user?.image || 'https://links.papareact.com/gll'} 
            alt="" 
        />

        <div className="flex flex-1 items-center pl-2">
            <div className="flex flex-1 flex-col">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Voice something..." 
                    className="h-24 w-full rounded-md text-s outline-none break-normal placeholder:text-xl p-2 pl-5" 
                />
                <div className="flex items-center">
                    <div className="flex flex-1 space-x-2 text-FlatGold">
                        <PhotographIcon 
                            onClick={ () => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen) }
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" 
                        />
                        <MicrophoneIcon 
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
                            onClick={ () => setMicBoxOpen(!micBoxIsOpen) }
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!input || !session}
                        className="rounded-full bg-MetallicGold px-5 py-2 font-bold text-black disabled:opacity-40 mt-1"
                    >
                        Voice It!
                    </button>
                </div>

                {/* Image adding form  */}
                { imageUrlBoxIsOpen && (
                    <div className="rounded-lg mt-5 flex bg-MetallicGold/60 py-2 px-4">
                        <input 
                            ref={imageInputRef}
                            type="text" 
                            className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                            placeholder="Enter Image URL..." 
                        />
                        <button type="submit" onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
                    </div>
                )}

                {/* Image show after adding */}
                { image && (
                    <img 
                        className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                        src={image} 
                        alt="" 
                    />
                )}

                { micBoxIsOpen && (
                    <div className="rounded-lg mt-5 flex justify-between bg-MetallicGold/60 py-2 px-4">
                        <button
                            onClick={() => {
                                if (!isActive) {
                                    startRecording();
                                    console.log('started recording')
                                } else {
                                    stopRecording();
                                    console.log('done recording')
                                }
                
                                setIsActive(!isActive);
                            }}
                            className="rounded-full bg-MetallicGold px-5 py-2 font-bold text-black disabled:opacity-40 mt-1">
                            {isActive ? "Stop" : "Start Recording"}</button>
                        <audio src={mediaBlobUrl as string} controls/>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default TweetBox