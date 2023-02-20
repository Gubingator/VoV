import React, {SVGProps} from 'react'

interface Props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title:string
}
function SidebarRow({Icon, title}: Props) {
  return (
    <div className = "group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-500">
        <Icon className="h-6 w-6" />
        <p className="hidden md:inline-flex group-hover: text-MetallicGold">{title}</p>
    </div>
  )
}

export default SidebarRow