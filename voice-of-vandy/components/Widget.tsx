import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

// Responsive design: by default hidden, only show when screen is large enough 

function Widgets() {
  return (
    <div className="col-span-3 hidden lg:inline mt-2 px-2">

        {/* Searhc */}
        {/* <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-500 p-3">
            <SearchIcon className="h-5 w-5 text-gray-400" />
            <input 
                type="text"
                placeholder="Search Twitter"
                className="flex-1 bg-transparent outline-none" 
            />
        </div> */}

        {/* Twitter embed */}
        <div className="mt-5">
          <TwitterTimelineEmbed
              sourceType="profile"
              screenName="VanderbiltU"
              options={{height: 1000}}
          />
        </div>
        

    </div>
  )
}

export default Widgets