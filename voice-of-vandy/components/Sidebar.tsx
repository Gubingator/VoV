import React from 'react'
import{
  ChatIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'
// import Logo from '../public/images/logo.png'
import { signIn, signOut, useSession } from 'next-auth/react'

function Sidebar() {
    const {data: session} = useSession();
    // const [session, loading] = useSession()

  return (
    <div className = "flex flex-col col-span-2 items-center px-4 md:items-start">
      <p className="font-bold text-5xl justify-center text-center text-FlatGold m-6">Voice of Vandy</p>
      <img className="m-10 h-30 w-30" 
        src="https://upload.wikimedia.org/wikipedia/commons/6/61/Vanderbilt_Commodores_logo.svg"
      alt="" />

      {/* <SidebarRow Icon={HomeIcon} title = "Home" /> */}
      {/* <SidebarRow Icon={UserIcon} title = "Profile" />
      <SidebarRow Icon={ChatIcon} title = "Chats" /> */}

      <div className="relative inset-y-30 h-16 w-60">
        <p className='m-4 h-100 w-60 text-3xl'>
          <u>Daily Prompt:</u>
        </p>

        <p className='m-5 h-10 w-40 text-center'>
          <i>
            Give us your best SpongeBob impression!
          </i>
        </p>
      </div>

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