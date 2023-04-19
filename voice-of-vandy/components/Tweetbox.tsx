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
    const emptyVoice = 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+PGh0bWwgbGFuZz0iZW4iPjxoZWFkPjxzdHlsZSBkYXRhLW5leHQtaGlkZS1mb3VjPSJ0cnVlIj5ib2R5e2Rpc3BsYXk6bm9uZX08L3N0eWxlPjxub3NjcmlwdCBkYXRhLW5leHQtaGlkZS1mb3VjPSJ0cnVlIj48c3R5bGU+Ym9keXtkaXNwbGF5OmJsb2NrfTwvc3R5bGU+PC9ub3NjcmlwdD48bWV0YSBjaGFyU2V0PSJ1dGYtOCIvPjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgiLz48dGl0bGU+NDA0OiBUaGlzIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kPC90aXRsZT48bWV0YSBuYW1lPSJuZXh0LWhlYWQtY291bnQiIGNvbnRlbnQ9IjMiLz48bm9zY3JpcHQgZGF0YS1uLWNzcz0iIj48L25vc2NyaXB0PjxzY3JpcHQgZGVmZXI9IiIgbm9tb2R1bGU9IiIgc3JjPSIvX25leHQvc3RhdGljL2NodW5rcy9wb2x5ZmlsbHMuanM/dHM9MTY4MTkzMDAyNjc3OSI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Ii9fbmV4dC9zdGF0aWMvY2h1bmtzL3dlYnBhY2suanM/dHM9MTY4MTkzMDAyNjc3OSIgZGVmZXI9IiI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Ii9fbmV4dC9zdGF0aWMvY2h1bmtzL21haW4uanM/dHM9MTY4MTkzMDAyNjc3OSIgZGVmZXI9IiI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Ii9fbmV4dC9zdGF0aWMvY2h1bmtzL3BhZ2VzL19hcHAuanM/dHM9MTY4MTkzMDAyNjc3OSIgZGVmZXI9IiI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Ii9fbmV4dC9zdGF0aWMvY2h1bmtzL3BhZ2VzL19lcnJvci5qcz90cz0xNjgxOTMwMDI2Nzc5IiBkZWZlcj0iIj48L3NjcmlwdD48c2NyaXB0IHNyYz0iL19uZXh0L3N0YXRpYy9kZXZlbG9wbWVudC9fYnVpbGRNYW5pZmVzdC5qcz90cz0xNjgxOTMwMDI2Nzc5IiBkZWZlcj0iIj48L3NjcmlwdD48c2NyaXB0IHNyYz0iL19uZXh0L3N0YXRpYy9kZXZlbG9wbWVudC9fc3NnTWFuaWZlc3QuanM/dHM9MTY4MTkzMDAyNjc3OSIgZGVmZXI9IiI+PC9zY3JpcHQ+PG5vc2NyaXB0IGlkPSJfX25leHRfY3NzX19ET19OT1RfVVNFX18iPjwvbm9zY3JpcHQ+PC9oZWFkPjxib2R5PjxkaXYgaWQ9Il9fbmV4dCI+PGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBSb2JvdG8sICZxdW90O1NlZ29lIFVJJnF1b3Q7LCAmcXVvdDtGaXJhIFNhbnMmcXVvdDssIEF2ZW5pciwgJnF1b3Q7SGVsdmV0aWNhIE5ldWUmcXVvdDssICZxdW90O0x1Y2lkYSBHcmFuZGUmcXVvdDssIHNhbnMtc2VyaWY7aGVpZ2h0OjEwMHZoO3RleHQtYWxpZ246Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXIiPjxkaXY+PHN0eWxlPgogICAgICAgICAgICAgICAgYm9keSB7IG1hcmdpbjogMDsgY29sb3I6ICMwMDA7IGJhY2tncm91bmQ6ICNmZmY7IH0KICAgICAgICAgICAgICAgIC5uZXh0LWVycm9yLWgxIHsKICAgICAgICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMyk7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAgICAgQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykgewogICAgICAgICAgICAgICAgICBib2R5IHsgY29sb3I6ICNmZmY7IGJhY2tncm91bmQ6ICMwMDA7IH0KICAgICAgICAgICAgICAgICAgLm5leHQtZXJyb3ItaDEgewogICAgICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgLjMpOwogICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICB9PC9zdHlsZT48aDEgY2xhc3M9Im5leHQtZXJyb3ItaDEiIHN0eWxlPSJkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MDttYXJnaW4tcmlnaHQ6MjBweDtwYWRkaW5nOjAgMjNweCAwIDA7Zm9udC1zaXplOjI0cHg7Zm9udC13ZWlnaHQ6NTAwO3ZlcnRpY2FsLWFsaWduOnRvcDtsaW5lLWhlaWdodDo0OXB4Ij40MDQ8L2gxPjxkaXYgc3R5bGU9ImRpc3BsYXk6aW5saW5lLWJsb2NrO3RleHQtYWxpZ246bGVmdDtsaW5lLWhlaWdodDo0OXB4O2hlaWdodDo0OXB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PGgyIHN0eWxlPSJmb250LXNpemU6MTRweDtmb250LXdlaWdodDpub3JtYWw7bGluZS1oZWlnaHQ6NDlweDttYXJnaW46MDtwYWRkaW5nOjAiPlRoaXMgcGFnZSBjb3VsZCBub3QgYmUgZm91bmQ8IS0tIC0tPi48L2gyPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjxzY3JpcHQgc3JjPSIvX25leHQvc3RhdGljL2NodW5rcy9yZWFjdC1yZWZyZXNoLmpzP3RzPTE2ODE5MzAwMjY3NzkiPjwvc2NyaXB0PjxzY3JpcHQgaWQ9Il9fTkVYVF9EQVRBX18iIHR5cGU9ImFwcGxpY2F0aW9uL2pzb24iPnsicHJvcHMiOnsicGFnZVByb3BzIjp7InN0YXR1c0NvZGUiOjQwNH19LCJwYWdlIjoiL19lcnJvciIsInF1ZXJ5Ijp7fSwiYnVpbGRJZCI6ImRldmVsb3BtZW50IiwiaXNGYWxsYmFjayI6ZmFsc2UsImdpcCI6dHJ1ZSwic2NyaXB0TG9hZGVyIjpbXX08L3NjcmlwdD48L2JvZHk+PC9odG1sPg=='
    const [input, setInput] = useState<string>('')
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

        if (base64data.length == emptyVoice.length) {
            base64data = '';
        }
        console.log('here')
        console.log(base64data)

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
        setMicBoxOpen(false)
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