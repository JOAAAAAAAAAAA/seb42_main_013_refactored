import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic, Roboto } from 'next/font/google'
import WebAside from './components/WebAside'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Suspense } from 'react'
import Loading from './loading'
import { cookies } from 'next/headers'
import AuthProvider from '@/context/AuthProvider'



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


export default async function RootLayout({
  unAuthenticated,
  header,
  children,
}: {
  unAuthenticated: React.ReactNode
  header: React.ReactNode
  children: React.ReactNode
}) {


  const isLoggedin = cookies().has("session")
  console.log('session', isLoggedin)

  return (
    <html lang="en">
      <body className={`${nanumGothic.variable} ${roboto.variable}`}>
        <div className='root-container'>
          <AuthProvider>

          <WebAside />
          <Suspense fallback={<Loading />}>
            <div className='app-container'>
              {/* <HeaderProvider /> */}
              {header}
              {isLoggedin ?children : unAuthenticated}
            </div>
          </Suspense>
          </AuthProvider>

        </div>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </body>
    </html>
  )
}
