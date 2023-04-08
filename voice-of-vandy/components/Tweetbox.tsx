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

import { sanityClient } from '../sanity'

import { SanityAssetDocument } from '@sanity/client'

interface Props {
    setTweets: Dispatch<SetStateAction<Tweet[]>>
}

const TweetBox = ({ setTweets }: Props) => {

    const [input, setInput] = useState<string>('')
    const { data: session } = useSession()
    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)
    const [image, setImage] = useState<string>('')
    const imageInputRef = useRef<HTMLInputElement>(null)

    const [initialUpvote, setUpvote] = useState<number>(0)
    
    const [uploadBoxIsOpen, setUploadBoxIsOpen] = useState<boolean>(false)
    const [fileAssets, setFileAssets] = useState<SanityAssetDocument | undefined>()
    const [wrongFileType, setWrongFileType] = useState(false)


    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }
    //const addFileToTweet = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        // sanityClient.assets.upload('file', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })

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

        // setUploadBoxIsOpen(false)

        
        // sanityClient.assets
        // .upload('file', fileToUpload)
        // .then((document) => {
        //     console.log("---------------------")
        //     // console.log(document._id)
        //     setFileAssets({ document}
        //     );
        
        // })
        // .catch((error) => {
        //   console.log('Upload failed:', error.message);
        // });

        // const doc = {
        //       _type: 'file',
        //       asset: {
        //         _type: 'reference',
        //         _ref: document?._id,
        //       },
        //   };

    }


    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image,
            //audio: {_type: 'file', asset: {fileAssets} }, 
            // audio: {
            //     _id: fileAssets?._id,
            //     url: fileAssets?.path,
            // },
            upvotes: 0,
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

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        postTweet();

        setInput('')
        setImage('')
        setImageUrlBoxIsOpen(false)

        // setFileAssets(void)
        setUploadBoxIsOpen(false)
    }

    function getUrlFromId(): string | undefined {
        throw new Error('Function not implemented.')
    }

  return (
    <div className="flex space-x-2 p-5">
        
        <img 
            className="h-14 w-14 mt-4 rounded-full object-cover"
            src={ session?.user?.image || 'https://links.papareact.com/gll'} 
            alt="" 
        />

        <div className="flex flex-1 items-center pl-2">
            <form className="flex flex-1 flex-col">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Voice Something..." 
                    className="h-24 w-full text-xl outline-none placeholder:text-xl" 
                />
                <div className="flex items-center">
                    <div className="flex flex-1 space-x-2 text-FlatGold">
                        <PhotographIcon 
                            onClick={ () => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen) }
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" 
                        />
                        <UploadIcon 
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" 
                            onClick={ () => setUploadBoxIsOpen(!uploadBoxIsOpen) }
                        />
                        <MicrophoneIcon 
                            className="h-7 w-7 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" 
                            
                        />
                    </div>
                    <button 
                        onClick={handleSubmit}
                        disabled={!input || !session}
                        className="rounded-full bg-MetallicGold px-5 py-2 font-bold text-black disabled:opacity-40"
                    >
                        Voice It!
                    </button>
                </div>

                {/* Image adding form  */}
                { imageUrlBoxIsOpen && (
                    <form className="rounded-lg mt-5 flex bg-MetallicGold/60 py-2 px-4">
                        <input 
                            ref={imageInputRef}
                            type="text" 
                            className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                            placeholder="Enter Image URL..." 
                        />
                        <button type="submit" onClick={addImageToTweet} className="font-bold text-white">Add Image</button>
                    </form>
                )}

                {/* Image show after adding */}
                { image && (
                    <img 
                        className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
                        src={image} 
                        alt="" 
                    />
                )}

                {/* File adding form  */}
                { uploadBoxIsOpen && (
                    <form className="rounded-lg mt-5 flex bg-MetallicGold/60 py-2 px-4">
                        <input 
                            type= "file" 
                            className="flex-1 2 text-white bg-transparent outline-none placeholder:text-white"
                            onChange={addFileToTweet}
                        />
                        {/* <button type="submit" onClick={e => addFileToTweet} className="font-bold text-white">Upload</button> */}
                    </form>
                )}

                {/* File show after adding */}
                { fileAssets && (
                    <audio controls>
                        <source src= {getUrlFromId()} type="audio/mpeg"/>
                    </audio>
                )}

            </form>
        </div>


    </div>
  )
}

export default TweetBox