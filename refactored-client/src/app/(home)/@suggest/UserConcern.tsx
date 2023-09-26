import { getUser } from "@/lib/user"
import  Button  from "@mui/material/Button"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"


export default async function UserConcern() {

  const { default : Card } = await import('@mui/material/Card')

  const sessionCookie = cookies().get('session')?.value || ""
  const user = await getUser(sessionCookie)

  return (
    <>
      <div className="pl-[4px] text-[14px]"> 환영합니다, <span>{user?.displayName}</span>님✨</div>
      <Card variant='outlined' className="p-[--gap-md]">
        {user?.concerns
          ? (
            <div className="flex flex-col">
              <div className="mb-[--gap-sm]" ><span className="font-bold text-[--blue-100]">{user?.displayName}</span>님을 위한 영양제 추천</div>
              <div className="relative flex h-[100px] w-full items-center justify-around">
                {user.concerns.map((ele: string, idx: number) => (
                    <div className="text-center" key={idx}>
                      <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                      <span className="text-xs">{ele}</span>
                    </div>
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
