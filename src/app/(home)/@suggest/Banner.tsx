"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Banner(){
  return (
    <div className="container">

    <Swiper
    pagination={{
      dynamicBullets: true,
    }}
    autoplay={{ delay: 3000 }}
    rewind={true}
    modules={[Pagination]}
    className="h-[5.5rem] rounded font-semibold
    [&>div>div>a>div:nth-child(2)]:relative [&>div>div>a>div:nth-child(2)]:aspect-square 	[&>div>div>a>div:nth-child(2)]:w-[13%] [&>div>div>a>div]:flex
    [&>div>div>a>div]:flex-col [&>div>div>a>div]:justify-center [&>div>div>a]:flex [&>div>div>a]:items-center [&>div>div>a]:justify-around [&>div>div>a]:p-2 [&>div>div>a]:pt-3
    "
  >
    <SwiperSlide className="bg-[#ffedba]">
      <Link href="/search?query=오메가3">
        <div className="text-center">
          <p>다른 건 몰라도 이 영양제는 꼭 드세요!</p>
          <p>오메가3 구매하러 가기</p>
        </div>
        <div>
          <Image fill sizes="100%" className="object-contain" src="/images/icon-suggest1.png" alt="slide-icon" />
        </div>
      </Link>
    </SwiperSlide>
    <SwiperSlide className="bg-[#e6e3f4]">
      <Link href="/summary">
        <div className="text-center">
          <p>너무 많아 관리하기 힘든 내 영양제...</p>
          <p>'알약관리'에 등록해 보셨나요?</p>
        </div>
        <div>
          <Image fill sizes="100%" className="object-contain" src="/images/icon-suggest2.png" alt="slide-icon" />
        </div>
      </Link>
    </SwiperSlide>
    <SwiperSlide className="bg-[#d2f4e1]">
      <Link href="/search?query=감기예방">
        <div className="text-center">
          <p>꽃샘추위 감기 조심하세요!</p>
          <p>미리미리 준비하고 감기예방하기</p>
        </div>
        <div>
          <Image fill sizes="100%" className="object-contain" src="/images/icon-suggest3.png" alt="slide-icon"/>
        </div>
      </Link>
    </SwiperSlide>
    <SwiperSlide className="bg-[#f9e3ee]">
      <Link href="/mypage">
        <div className="text-center">
          <p>새로운 건강고민이 생기셨나요?</p>
          <p>건강고민 선택하고 맞춤 영양제 추천 받아보세요!</p>
        </div>
      </Link>
    </SwiperSlide>
  </Swiper>
    </div>
  )

}