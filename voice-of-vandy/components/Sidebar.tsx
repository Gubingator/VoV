import React from 'react'
import{
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon, 
  DotsCircleHorizontalIcon,
  ChatIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

function Sidebar() {
  return (
    <div className = "flex flex-col col-span-2 items-center px-4 md:items-start">
      <img className="m-3 h-10 w-10" src = "https://fox17.com/resources/media2/16x9/full/1015/center/80/6ce69a1a-c627-4a26-8113-981281ef3682-large16x9_Vandyathletics.png"
      alt="" />

      <SidebarRow Icon={HomeIcon} title = "Home" />
      <SidebarRow Icon={UserIcon} title = "Profile" />
      <SidebarRow Icon={ChatIcon} title = "Chats" />
      <SidebarRow Icon={HomeIcon} title = "Sign In" />

    </div>
  )
}

export default Sidebar