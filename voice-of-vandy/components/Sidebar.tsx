import React from 'react'
import{
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon, 
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import SidebarRow from './SidebarRow'

function Sidebar() {
  return (
    <div>
      <img className="h-10 w-10" src = "https://fox17.com/resources/media2/16x9/full/1015/center/80/6ce69a1a-c627-4a26-8113-981281ef3682-large16x9_Vandyathletics.png"
      alt="" />

      <SidebarRow Icon={UserIcon} title = "Sign In" />
      <SidebarRow Icon={HomeIcon} title = "Home" />
      <SidebarRow Icon={HomeIcon} title = "Home" />
      <SidebarRow Icon={HomeIcon} title = "Home" />
      <SidebarRow Icon={HomeIcon} title = "Home" />

    </div>
  )
}

export default Sidebar