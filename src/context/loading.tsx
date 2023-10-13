"use client"

import { DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';


export default function Loading() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <DotLottiePlayer
        style={{ height: '200px' , width: '200px'}}
        loop
        src="/lottie/spinPill.lottie"
        autoplay
      >
      </DotLottiePlayer>
    </div>
  )

}