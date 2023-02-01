import React, { useState } from 'react'


function Tweetbox() {
    // Using states to dispable the button if nothing is typed in the box.
    const [input, setInput] = useState<string>('')


  return (

    <div className='flex space-x-2 p-5'>
        <img className='h-14 w-14 rounded-full object-rover mt-4'
        src='https://cdn2.iconfinder.com/data/icons/business-hr-and-recruitment/100/account_blank_face_dummy_human_mannequin_profile_user_-512.png' alt='' />
    
    
        <div className='flex flex-1 items-center pl-2'>
            <form className='flex flex-1 flex-col'>
                <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                type = "text" 
                placeholder="Voice something..." 
                className='h-24 w-full text-xl p-3 rounded-lg outline-none placeholder:text-xl'/>

                <div className='flex iterms-center'>

                    <button className='rounded-full px-5 py-2 font-bold text-white bg-FlatGold'>
                        <img className='inline h-6 w-6 rounded-full object-rover' 
                            src='https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/56-512.png' alt='' />
                        Record!
                    </button>

                    <button 
                    // disable button if no inpu
                    disabled={!input}
                    className='rounded-full px-5 py-2 font-bold text-white bg-FlatGold disabled:opacity-40
                    cursor-pointer transition-transform duration-125 ease-out hover:scale-125'>
                        Voice it 
                    </button>
                </div>
            </form>
        </div>
    </div>

    
  )
}

export default Tweetbox