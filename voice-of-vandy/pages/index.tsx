import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'


const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Voice of Vandy</title>
      </Head>

      <main>
        <Sidebar/>
        
      </main>
    </div>
  )
}

export default Home