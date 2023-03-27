import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from 'next-auth/react'

export default function MyApp({ Component, pageProps: {session, ...pageProps} }: any) {
  return (

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>

    // <Component {...pageProps} />
  //   <SessionProvider session={pageProps.session}>
  //   {Component.auth
  //     ? <Auth><Component {...pageProps} /></Auth>
  //     : <Component {...pageProps} />
  //   }
  // </SessionProvider>
  )
}

// function Auth({ children }) {
//   const [session, loading] = useSession()
//   const isUser = !!session?.user
//   React.useEffect(() => {
//     if (loading) return // Do nothing while loading
//     if (!isUser) signIn() // If not authenticated, force log in
//   }, [isUser, loading])

//   if (isUser) {
//     return children
//   }
  
//   // Session is being fetched, or no user.
//   // If no user, useEffect() will redirect.
//   return <div>Loading...</div>
// }
