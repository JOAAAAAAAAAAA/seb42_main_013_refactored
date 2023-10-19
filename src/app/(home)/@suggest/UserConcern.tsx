import  Card  from "@mui/material/Card"
import  Button  from "@mui/material/Button"
import Image from "next/image"
import Link from "next/link"
import { getUserInServer } from "@/lib/user"


export default async function UserConcern() {

  // const { authUser } = useContext(AuthContext);
  const authUser = await getUserInServer()
  
  return (
    <>
      <div className="pl-[4px] text-[14px]"> 환영합니다, <span>{authUser?.displayName}</span>님✨</div>
      <Card variant='outlined' className="p-[--gap-md]">
        {authUser?.concerns
          ? (
            <div className="flex flex-col">
              <div className="mb-[--gap-sm]" ><span className="font-bold text-[--blue-100]">{authUser?.displayName}</span>님을 위한 영양제 추천</div>
              <div className="relative flex h-[100px] w-full items-center justify-around">
                {authUser.concerns.map((ele: string, idx: number) => (
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
