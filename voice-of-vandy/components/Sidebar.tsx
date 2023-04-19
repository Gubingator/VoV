import React from 'react'
import{
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
import { signIn, signOut, useSession } from 'next-auth/react'

function Sidebar() {
    const {data: session} = useSession();
    const names = ['John Cena', 'Spongebob', 'Perry the Platypus', 'Drake', 'Nicki Minaj', 'Jason Derulo', 'Ariana Grande',
                   'Morgan Freeman', 'Barack Obama', 'Donald Trump', 'Joe Biden'];

  return (
    <div className = "col-span-2 items-center">
      <p className="font-bold text-5xl justify-center text-center text-FlatGold m-6">Voice of Vandy</p>

      <img className="justify-center text-center mx-auto my-2" 
        src="https://upload.wikimedia.org/wikipedia/commons/6/61/Vanderbilt_Commodores_logo.svg"
      alt="" />

      <p className='mt-40 text-3xl justify-center text-center'><u>Daily Prompt:</u></p>
      <p className='text-xl justify-center text-center'><i>Give us your best {names[Math.ceil(new Date().getTime() / 86400000) % names.length]} impression!</i></p>

      <div className="absolute bottom-0 left-45 h-16 w-60">
        <SidebarRow 
        onClick={session ? signOut : signIn } 
        Icon={HomeIcon} 
        title = {session ? 'Sign Out': "Sign In"} />
      </div>
    </div>
  ) 
}

Sidebar.auth = true

export default Sidebar