import { 
    UploadIcon,
    PhotographIcon, 
    MicrophoneIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import  { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

import { v4 as uuidv4 } from 'uuid'
import { sanityClient } from '../sanity'
import tweet from '@/sanity/schemas/tweet'
import { SanityAssetDocument } from '@sanity/client'
import { useReactMediaRecorder, ReactMediaRecorder } from "react-media-recorder"

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {

    const [input, setInput] = useState<string>('')
    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const [micBoxIsOpen, setMicBoxOpen] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [initialUpvote, setUpvote] = useState<number>(0)
    const [fileAssets, setFileAssets] = useState<SanityAssetDocument | undefined>()
    const [isActive, setIsActive] = useState(false);

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }
    const addFileToTweet = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        
        if (!e.target.files) {
            return
        }

        const selectedFile = e.target.files[0];

        console.log("selectedFile");
        console.log(selectedFile);
        console.log(selectedFile.type);
        console.log(selectedFile.name);


        sanityClient.assets.upload('file', selectedFile)
        .then((data) => {
            console.log("00000000000000000000000");
            console.log(data)
            setFileAssets(data);
        } 
        ).catch((error) => {
          console.log('Upload failed:', error.message);
        });
        
        console.log("fileAssets");
        console.log(fileAssets?._id);
    }

    function blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
          reader.onerror = reject;
        });
      }

    const postTweet = async () => {
        var base64data = null;
        let mediaBlob = await fetch(mediaBlobUrl!).then(r => r.blob());

        base64data = await blobToBase64(mediaBlob);

        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
            audio: base64data,
            upvotes: initialUpvote,
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        })

        const json = await result.json()

        const newTweets = await fetchTweets()
        setTweets(newTweets)

        toast('Tweet Posted', {
            icon: '🎉',
        })

        return json
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        postTweet();
        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)
        // setFileAssets(void)
    }

    const {
        startRecording,
        stopRecording,
        pauseRecording,
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
                                    pauseRecording();
                                }
                
                                setIsActive(!isActive);
                            }}
                        className="font-bold text-white">{isActive ? "Pause" : "Start Recording"}</button>

                        <button
                            onClick={() => {
                                if (isActive) {
                                    stopRecording();
                                    console.log('done recording')
                                }
                                
                                setIsActive(false)
                            }}
                        className="font-bold text-white">{isActive ? "Stop" : ""}</button>
                        <audio src={mediaBlobUrl} controls loop />
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default TweetBox