import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="">      
      
      <main className="container mx-auto flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            {session?.user !== undefined ? (
              <span className="text-gray-900">Welcome Back {session?.user?.name?.split(" ")[0]}</span>
            ) : (
              <span className="text-gray-900">Voice of Vandy</span>
            )}
        </h1>
      </main>
    </div>
  )
}

export default Home
