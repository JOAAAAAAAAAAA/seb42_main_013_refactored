// 'use client';

// if (typeof window !== 'undefined') import '@dotlottie/player-component';
// import { PlaybackOptions } from '@dotlottie/player-component';

// export interface PlayerProps {
//   src: string;
//   playbackOptions?: PlaybackOptions;
//   controls?: boolean;
//   light?: boolean;
// }

// export default function Player(props: PlayerProps) {
//   return (
//     <div>
//       <dotlottie-player
//         src={props.src}
//         autoplay={props.playbackOptions?.autoplay}
//         defaultTheme={props.playbackOptions?.defaultTheme}
//         direction={props.playbackOptions?.direction}
//         hover={props.playbackOptions?.hover}
//         intermission={props.playbackOptions?.intermission}
//         loop={props.playbackOptions?.loop}
//         playMode={props.playbackOptions?.playMode}
//         speed={props.playbackOptions?.speed}
//         controls={props.controls}
//         light={props.light}
//       ></dotlottie-player>
//     </div>
//   );
// }

'use client';

import { Controls, DotLottiePlayer } from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';

export default function Player(): JSX.Element {
  return (
    <div>
      <DotLottiePlayer
        style={{ height: '400px' }}
        loop
        src="https://lottie.host/c7029f2f-d015-4d88-93f6-7693bf88692b/d7j8UjWsGt.lottie"
        autoplay
      >
        <Controls />
      </DotLottiePlayer>
    </div>
  );
}
