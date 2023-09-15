import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';


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
    className="rounded h-[5.5rem] font-semibold
    [&>div>div>a]:flex [&>div>div>a]:p-2 	[&>div>div>a]:justify-around [&>div>div>a]:align-center
    [&>div>div>a>div]:flex [&>div>div>a>div]:flex-col [&>div>div>a>div]:justify-center"
  >
    <SwiperSlide className="bg-[#ffedba]">
      <Link href="/search?query=오메가3">
        <div className="text-center">
          <p>다른 건 몰라도 이 영양제는 꼭 드세요!</p>
          <p>오메가3 구매하러 가기</p>
        </div>
        <div className="slide-icon">
          <Image width={60} height={60} src="/images/icon-suggest1.png" alt="slide-icon" />
        </div>
      </Link>
    </SwiperSlide>
    <SwiperSlide className="bg-[#e6e3f4]">
      <Link href="/summary">
        <div className="text-center">
          <p>너무 많아 관리하기 힘든 내 영양제...</p>
          <p>'알약관리'에 등록해 보셨나요?</p>
        </div>
        <div className="slide-icon">
          <Image width={60} height={60} src="/images/icon-suggest2.png" alt="slide-icon" />
        </div>
      </Link>
    </SwiperSlide>
    <SwiperSlide className="bg-[#d2f4e1]">
      <Link href="/search?query=감기예방">
        <div className="text-center">
          <p>꽃샘추위 감기 조심하세요!</p>
          <p>미리미리 준비하고 감기예방하기</p>
        </div>
        <div className="slide-icon">
          <Image width={60} height={60} src="/images/icon-suggest3.png" alt="slide-icon" className="cough" />
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
    <SwiperSlide className="bg-[#cedcff]">
      <div className="flex flex-col p-2 justify-around text-center">
        <p>🍙양반김에 양조간장🥢팀</p>
        <p>프로젝트 정말정말 고생 많으셨습니다!</p>
      </div>
    </SwiperSlide>
  </Swiper>
    </div>
  )

}