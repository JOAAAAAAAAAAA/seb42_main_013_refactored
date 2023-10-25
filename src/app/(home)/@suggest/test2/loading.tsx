"use client"

import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'


export default function Loading() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending &&
        <div className='fixed inset-x-0 top-[45%] z-10 flex items-center justify-center [@media(min-width:1024px)]:ml-[420px]'>
          <DotLottiePlayer
            style={{
              height: '80px',
              width: '80px',
              padding: '0px',
            }}
            className='m-auto bg-transparent'
            loop
            src="/lottie/spinPill.lottie"
            autoplay
          >
          </DotLottiePlayer>
        </div>
      }
    </>
  )
}
