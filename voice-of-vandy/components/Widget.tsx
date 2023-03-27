import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'

// Responsive design: by default hidden, only show when screen is large enough 

function Widget() {
  return (
    <div className='mt-2 px-2'>Widget
      <div>

      </div>

      <div className="flex rounded-full items-center space-x-2 bg-gray-500">
        <SearchIcon className='h-5 w-5 text-gray-200' />
        <input type="text" placeholder="Search" className='flex-1 outline-none bg-transparent'/>
      </div>
    </div>
  )
}

export default Widget