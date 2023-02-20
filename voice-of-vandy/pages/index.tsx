import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Navbar from '@/components/Navbar'
import Widget from '@/components/Widget'
import { fetchTweets } from '@/utils/fetchTweets'
import { Tweet } from '@/typings'
import { Toaster } from 'react-hot-toast'

interface Props{
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  console.log({tweets})

  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl bg-black">
      <Head>
        <title>Voice of Vandy</title>
      </Head>

      <div><Toaster/></div>

      <Navbar/>

      <main className= "grid grid-cols-9">
        <Sidebar/>
        <Feed tweets={tweets}/>

        <Widget/>
      </main>
    </div>
  )
}

export default Home

// server side render: js work is handled on the server, user simple get the output of the response
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    }
  }
}