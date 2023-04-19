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
      <img className="m-3 h-10 w-10" src = "https://fox17.com/resources/media2/16x9/full/1015/center/80/6ce69a1a-c627-4a26-8113-981281ef3682-large16x9_Vandyathletics.png"
      alt="" />

      {/* <SidebarRow Icon={HomeIcon} title = "Home" /> */}
      {/* <SidebarRow Icon={UserIcon} title = "Profile" />
      <SidebarRow Icon={ChatIcon} title = "Chats" /> */}

      <div className="absolute inset-y-60 h-16 w-60">
        <div className='m-4 h-100 w-60 text-3xl'>
          <u>Daily Prompt:</u>
        </div>

        <div className='m-5 h-10 w-40 text-center'>
        Give us your best SpongeBob impression!
        </div>
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