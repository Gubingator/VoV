import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Navbar from '@/components/Navbar'


const Home: NextPage = () => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl bg-black">
      <Head>
        <title>Voice of Vandy</title>
      </Head>

      <Navbar/>

      <main className= "grid grid-cols-9">
        <Sidebar/>
        <Feed/>

        
      </main>
    </div>
  )
}

export default Home