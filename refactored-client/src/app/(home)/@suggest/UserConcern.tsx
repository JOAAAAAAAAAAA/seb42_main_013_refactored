import { AuthUser } from "@/types"
import { Card, CardContent } from "@mui/material"
import { cookies } from "next/headers"

import Image from "next/image"
import Link from "next/link"

export default async function UserConcern() {
  //no cache for dynamic redner
  const sessionCookie = cookies().get('session')
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/user`,{ 
    cache: 'no-store',
    headers: {
      cookie: `session=${sessionCookie}`,
    } })
  // const authUser = await res.json()
  console.log('userconcern', res)
  return (
    <>

      {/* <div className="px-[20px] text-[14px]">환영합니다, <span>{authUser?.displayName}</span>님!</div>
      <Card variant='outlined'>
        <CardContent>
          <div className="mb-[--gap-md]" ><span className="font-[--blue-100]">{authUser?.displayName}</span>님을 위한 영양제 추천</div>
          <div className="flex h-full w-full items-center justify-around">
            {authUser.concerns 
            ? authUser.concerns.map((ele, idx) => (
              <div className="text-center" key={idx}>
                <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                <span className="text-xs">{ele}</span>
              </div>
            ))
            : <Link href="/mypage/edit">건강 고민을 입력해주세요.</Link>
          }

          </div>
        </CardContent>
      </Card> */}
    </>


  )

}
