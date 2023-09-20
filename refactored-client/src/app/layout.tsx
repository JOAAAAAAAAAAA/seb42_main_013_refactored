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
import ThemeRegistry from '@/mui/ThemeRegistry/ThemeRegistry'
import HeaderProvider from './HeaderProvider'



config.autoAddCss = false

const nanumGothic = Nanum_Gothic({
  weight: ['400', '700', '800'],
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
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${nanumGothic.variable} ${roboto.variable}`}>
        <ThemeRegistry>
          <div className='root-container'>
            <WebAside />
            <Suspense fallback={<Loading />}>
              <div className='app-container'>
                <AuthProvider>
                  <HeaderProvider />
                  {children}
                </AuthProvider>
              </div>
            </Suspense>
          </div>
        </ThemeRegistry>
        <script src="https://apis.google.com/js/platform.js" async defer></script>
      </body>
    </html>
  )
}
