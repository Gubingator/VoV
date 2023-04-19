import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: any) {
  return (

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
