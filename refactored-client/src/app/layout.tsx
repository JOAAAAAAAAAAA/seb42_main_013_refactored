import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic, Roboto } from 'next/font/google'
import WebAside from './components/WebAside'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Children, Suspense } from 'react'
import { auth } from '../../firebase/firebaseApp'
import Loading from './loading'
import HeaderProvider from './HeaderProvider'
import { redirect } from 'next/navigation'

config.autoAddCss = false

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-NanumGothic',
})

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-Roboto',
})

export const metadata: Metadata = {
  title: 'I PILL U',
  description: '당신을 위한 영양제 맞춤 서비스',
}


export default function RootLayout({
  dashboard,
  login,
  header,
  childeren,
}: {
  dashboard: React.ReactNode
  login: React.ReactNode
  header: React.ReactNode
  childeren: React.ReactNode
}) {
  const isLoggedin = auth.currentUser
  console.log("root layout")
  console.log("isLoggedin", isLoggedin)
  return (

    <html lang="en">
      <body className={`${nanumGothic.variable} ${roboto.variable}`}>
        <div className='root-container'>
          <WebAside />
          <Suspense fallback={<Loading />}>
            <div className='app-container'>
              {/* <HeaderProvider /> */}
              {header}
              {childeren}
              {isLoggedin ? dashboard : login}
            </div>
          </Suspense>
        </div>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </body>
    </html>
  )
}
