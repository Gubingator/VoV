import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

// Responsive design: by default hidden, only show when screen is large enough 

function Widgets() {
  return (
    <div className="col-span-3 hidden lg:inline mt-2 px-2 p-2">
        {/* Twitter embed */}
        <div className="text-center text-3xl font-serif font-semibold">
          <u>Latest Vandy News!</u>
        </div>

        <div className='mt-5'>
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