import { User } from "@/types"
import { Card, CardContent, Button, Skeleton } from "@mui/material"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

export default async function UserConcern() {

  const sessionCookie = cookies().get('session')?.value || ""
  //no cache for dynamic redner
  const { user }: { user: User } = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/user`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'cookie': `session=${sessionCookie}`,
    }
  }).then(res => res.json())
  return (
    <>
      <div className="pl-[4px] text-[14px]"> 환영합니다, <span>{user?.displayName}</span>님✨</div>
      <Card variant='outlined' className="p-[--gap-md]">
        {user.concerns
          ? (
            <div className="flex flex-col">
              <div className="mb-[--gap-sm] h-[calc(1.74*16+12)]" ><span className="font-bold text-[--blue-100]">{user?.displayName}</span>님을 위한 영양제 추천</div>
              <div className="relative flex h-[100px] w-full items-center justify-around">
                {user.concerns.map((ele: string, idx: number) => (
                  <Suspense key={idx} fallback={<Skeleton variant="circular" width={50} height={50} />}>
                    <div className="text-center" key={idx}>
                      <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                      <span className="text-xs">{ele}</span>
                    </div>
                  </Suspense>
                ))}
              </div>
            </div>
          )
          : (<div className="flex flex-col items-center justify-center gap-[--gap-sm]">
            <Image src="/images/medical-report.png" alt="no concern record" height={100} width={100} />
            <Link href="/mypage/edit"><Button variant="outlined">건강 고민 입력</Button></Link>
          </div>
          )
        }

      </Card>
    </>


  )

}
