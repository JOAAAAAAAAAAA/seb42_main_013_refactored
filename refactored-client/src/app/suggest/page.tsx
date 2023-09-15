"use client"
import { Card, CardContent, IconButton, Input, InputBase, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles'


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
import Link from 'next/link';
import { health } from '@/data';
import Banner from './Banner';


export default function Suggest() {
  const { authUser } = useContext(AuthContext);

  const userconcern = ["락티움", "아연", "프로폴리스"]
  return (
    <div className="container flex-col font-nanumGothic bg-[--black-500] gap-[--gap-lg]">
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] p-[--gap-sm]">
        <div className='flex border-b w-full border-[#999999]'>
          <InputBase id="search input" placeholder="새로운 영양제 탐색" fullWidth />
          <IconButton type="submit" aria-label="search" size="small">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
          </IconButton>
        </div>
        <div className="px-[20px] text-[14px]">환영합니다, <span className="highlight">{authUser?.displayName}</span>님!</div>
        <Card variant='outlined'>
          <CardContent>
            <div className="mb-[--gap-md]" ><span className="font-[--blue-100] font-1.1">{authUser?.displayName}</span>님을 위한 영양제 추천</div>
            <div className="w-full h-full flex justify-around items-center font-nanumGothic">
              {userconcern.map((ele, idx) => {
                return <>
                  <div className="text-center" key={idx} >
                    <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                    <span className="text-xs">{ele}</span>
                  </div>
                </>
              })}
            </div>
          </CardContent>
        </Card>
        <Banner />
      </Paper>
      <Paper square elevation={0} className="flex flex-col  gap-[--gap-sm] p-[--gap-sm]">
        {/* <h1 className="mt-[--gap-md] font-semibold"><span className="text-[--blue-100]">건강고민</span>별 영양 찾기</h1>
        <div>
          <Swiper
            spaceBetween={4}
            slidesPerView={5}
          >
            {health.map(el => {
              return (
                <SwiperSlide key={el.id} className={el.id === selectedConcern ? "selected-area category" : "category"} onClick={clickHandler} id={el.id}>
                  <CategoryIconDiv className={el.id === selectedConcern ? "category-select" : ""}>
                    <img src={el.src} alt="health-icon" />
                  </CategoryIconDiv>
                  <div>{el.title}</div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div> */}

      </Paper>


      {/* <ThemeProvider
        theme={createTheme({
          typography: {
            useNextVariants: true
          },
          overrides: Component.getTheme(muiBaseTheme)
        })}
      >
        <Component />
      </ThemeProvider>
        <LargeContent>
          <div className="lg-content-title"><img src="images/icon--ipu.png" alt="ipu-icon" className="ipu-icon" />{clickedConcern?.title}에 좋은 영양제</div>
          <SupplementsArea>
            {clickedConcern?.supplementsList.map((el, idx) => {
              return (
                <SupplementDiv key={idx} id={el.supplementName} onClick={supplementClick}>
                  <SupplementImgDiv><img src={el.imageURL || "images/icon-pill4.png"} alt="supplement-icon" className={el.imageURL ? "" : "icon-image"} /></SupplementImgDiv>
                  <div>{el.supplementName}</div>
                </SupplementDiv>
              )
            })}
          </SupplementsArea>
        </LargeContent>
        <SmallContentTitle>건강한 생활정보</SmallContentTitle>
        {clickedConcern?.concernId === 17 ? (
          <div className="smallcontent-area">
            <SmallContent1>
              <div>{"술과 담배는 가급적 멀리해 주세요"}</div>
            </SmallContent1>
            <SmallContent2>
              <div>{"규칙적으로 꾸준히 운동을 진행해 주세요!"}</div>
            </SmallContent2>
            <SmallContent3>
              <div>{"체중이 많이 나간다면 좀 더 가볍게\n조절해 주세요"}</div>
            </SmallContent3>
            <SmallContent4>
              <div>{"짠 음식 섭취는 혈압을 높게 만들어요"}</div>
            </SmallContent4>
          </div>
        ) : (
          <div className="smallcontent-area">
            <SmallContent1>
              <div>{clickedConcern?.contents[numbers[0]]}</div>
            </SmallContent1>
            <SmallContent2>
              <div>{clickedConcern?.contents[numbers[1]]}</div>
            </SmallContent2>
            <SmallContent3>
              <div>{clickedConcern?.contents[numbers[2]]}</div>
            </SmallContent3>
            <SmallContent4>
              <div>{clickedConcern?.contents[numbers[3]]}</div>
            </SmallContent4>
          </div>
        )} */}
    </div>

  )
}
