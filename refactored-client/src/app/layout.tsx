import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic } from 'next/font/google'
import WebAside from './components/WebAside'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const nanumGothic = Nanum_Gothic({ 
  weight: '400',
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
      <body className={nanumGothic.className}>
        <div className='root-container'>
          <WebAside />
          <div className='app-container'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
