"use client"
import { Box, Button, Card, CardContent, IconButton, Input, InputBase, Paper, Typography } from '@mui/material';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner from './Banner';
import ConcerTab, { Item } from './ConcerTab';
import Grid from '@mui/material/Unstable_Grid2';


export default function Suggest() {
  const { authUser } = useContext(AuthContext);

  const userconcern = ["락티움", "아연", "프로폴리스"]
  return (
    <div className="container flex flex-col gap-[--gap-md] bg-[--black-500] font-nanumGothic">
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] px-[--gap-sm] py-[--gap-md]">
        <div className='flex w-full border-b border-[#999999]'>
          <InputBase id="search input" placeholder="새로운 영양제 탐색" fullWidth />
          <IconButton type="submit" aria-label="search" size="small">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </IconButton>
        </div>
        <div className="px-[20px] text-[14px]">환영합니다, <span>{authUser?.displayName}</span>님!</div>
        <Card variant='outlined'>
          <CardContent>
            <div className="mb-[--gap-md]" ><span className="font-[--blue-100]">{authUser?.displayName}</span>님을 위한 영양제 추천</div>
            <div className="flex h-full w-full items-center justify-around">
              {userconcern.map((ele, idx) => (
                <div className="text-center" key={idx}>
                  <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                  <span className="text-xs">{ele}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Banner />
      </Paper>
      <Paper square elevation={0} className="flex flex-col gap-[--gap-sm]  px-[--gap-sm] py-[--gap-md]">
        <h1 className="font-semibold"><span className="text-[--blue-100]">건강고민</span>별 영양제 찾기</h1>
        <ConcerTab />
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
