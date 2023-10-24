import { Paper } from '@mui/material';
import Image from 'next/image';
import Banner from './Banner';
import ConcernTab from './ConcernTab';
import Grid from '@mui/material/Unstable_Grid2';
import { UserConcernSkeleton, BannerSkeleton, ConcernTabSkeleton } from './Skeletons';
import { Suspense } from 'react';
import card1 from '@/../public/cards/card1.jpg'
import card2 from '@/../public/cards/card2.jpg'
import card3 from '@/../public/cards/card3.jpg'
import card4 from '@/../public/cards/card4.jpg'
import Await from '@/app/components/Await';
import { getHealth } from '@/lib/health';
import UserConcern from './UserConcern';
import SearchForm from './SearchForm';


export default async function Suggest() {
  return (
    <section className="main gap-[--gap-md] bg-[--black-500] px-0 pt-[48px] font-nanumGothic">
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] px-[--gap-sm] py-[--gap-md]">
        <SearchForm />
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
          <Await promise={getHealth()}>
            {(dataWithbase64) => <ConcernTab initialData={dataWithbase64} />}
          </Await>
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
                src={card1}
                fill
                alt="health info card"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
                placeholder="blur"
              />
              <p>{"술과 담배는 가급적 멀리해 주세요"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src={card2}
                fill
                alt="health info card"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
                placeholder="blur"
              />
              <p>{"규칙적으로 꾸준히 운동을 진행해 주세요!"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src={card3}
                fill
                alt="health info card"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
                placeholder="blur"
              />
              <p>{"체중이 많이 나간다면 좀 더 가볍게 조절해 주세요"}</p>
            </Paper>
          </Grid>
          <Grid xs={6}>
            <Paper variant="outlined" elevation={0}>
              <Image
                src={card4}
                fill
                placeholder="blur"
                className="opacity-70"
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
                alt="health info card"
              />
              <p>{"짠 음식 섭취는 혈압을 높게 만들어요"}</p>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </section>
  )
}
