'use client';

import { Controls, DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';




export default function LottiePlayer({
  width,
  height,
  src
}: {
  width: number,
  height: number,
  src: string
}
): JSX.Element {
  return (
    <DotLottiePlayer
      style={{ height, width }}
      loop
      src={src}
      autoplay
    >
    </DotLottiePlayer>
  );
}