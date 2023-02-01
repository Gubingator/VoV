import React from 'react'
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="flex items-center justify-center px-4 py-3 bg-gray-800">
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder="Search voices..."
        className="w-full py-2 px-4 text-gray-200 bg-gray-700 rounded-lg outline-none focus:shadow-outline"
      />
    </div>
  </nav>
  )
}

export default Navbar