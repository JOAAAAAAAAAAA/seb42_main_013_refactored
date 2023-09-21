import { IconButton, InputBase, Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import Banner from './Banner';
import ConcerTab from './ConcerTab';
import Grid from '@mui/material/Unstable_Grid2';
import { UserConcernSkeleton, BannerSkeleton, ConcernTabSkeleton } from './Skeletons';
import { Suspense } from 'react';
import { cookies } from 'next/headers';


export default async function Suggest() {

  const { default : UserConcern } = await import('./UserConcern')

  
  // const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/health`,{
  //   method: 'GET',
  //   cache: 'no-store',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'cookie': `session=${sessionCookie}`,
  //   }
  // })

  return (
    <div className="container flex flex-col gap-[--gap-md] bg-[--black-500] font-nanumGothic">
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] px-[--gap-sm] py-[--gap-md]">
        <div className='flex w-full border-b border-[#999999]'>
          <InputBase id="search input" placeholder="새로운 영양제 탐색" fullWidth />
          <IconButton type="submit" aria-label="search" size="small">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconButton>
        </div>

        <Suspense fallback={<UserConcernSkeleton />}>
          <UserConcern />
        </Suspense>
        
        <Suspense fallback={<BannerSkeleton />}>
          <Banner />
        </Suspense>

      </Paper>
      <Paper square elevation={0} className="flex flex-col gap-[--gap-sm]  px-[--gap-sm] py-[--gap-md]">
        <h1 className="font-semibold"><span className="text-[--blue-100]">건강고민</span>별 영양제 찾기</h1>

        <Suspense fallback={<ConcernTabSkeleton />} >
          <ConcerTab />
        </Suspense>

      </Paper>
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] px-[--gap-sm] py-[--gap-md]">
        <h1 className="font-semibold text-[--blue-100]">생활 건강 정보</h1>
        <Grid
          container
          spacing={2}
          className="
        [&>div:nth-child(4n)>div>p]:pt-32 [&>div:nth-child(4n)>div>p]:text-right [&>div:nth-child(4n+1)>div>p]:pb-32
        [&>div:nth-child(4n+2)>div>p]:self-center [&>div:nth-child(4n+2)>div>p]:text-center
        [&>div:nth-child(4n+2)>div]:flex [&>div:nth-child(4n+3)>div>p]:self-center [&>div:nth-child(4n+3)>div>p]:text-center
        [&>div:nth-child(4n+3)>div]:flex [&>div>div>img]:object-cover
        [&>div>div>img]:object-center
        [&>div>div>p]:relative [&>div>div>p]:p-[--gap-sm] [&>div>div>p]:font-semibold
        [&>div>div]:relative [&>div>div]:h-full [&>div>div]:w-full
        "
        >
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src="/cards/card1.jpg"
                fill
                sizes="100%"
                alt="tip background image"
              />
              <p>{"술과 담배는 가급적 멀리해 주세요"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src="/cards/card2.jpg"
                fill
                sizes="100%"
                alt="tip background image"
              // placeholder="blur"
              ></Image>
              <p>{"규칙적으로 꾸준히 운동을 진행해 주세요!"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src="/cards/card3.jpg"
                fill
                sizes="100%"
                alt="tip background image"
              />
              <p>{"체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src="/cards/card4.jpg"
                fill
                //! sizes error...
                // https://github.com/vercel/next.js/discussions/40643
                sizes="100%"
                className="opacity-70"
                alt="tip background image"
              />
              <p>{"짠 음식 섭취는 혈압을 높게 만들어요"}</p>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>

  )
}
