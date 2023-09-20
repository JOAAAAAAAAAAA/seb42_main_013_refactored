import { Card, CardContent } from "@mui/material"
import Image from "next/image"

export default function UserConcern() {
  // const { authUser } = useContext(AuthContext);

  const authUser = {
    displayName: '김영희',
    concerns: ['피부건강', '뼈건강', '관절건강']
  }

  return (
    <>
      <div className="px-[20px] text-[14px]">환영합니다, <span>{authUser?.displayName}</span>님!</div>
      <Card variant='outlined'>
        <CardContent>
          <div className="mb-[--gap-md]" ><span className="font-[--blue-100]">{authUser?.displayName}</span>님을 위한 영양제 추천</div>
          <div className="flex h-full w-full items-center justify-around">
            {authUser?.concerns.map((ele, idx) => (
              <div className="text-center" key={idx}>
                <Image src={`/images/icon-pill${idx}.png`} width={50} height={50} alt="supplement-icon" />
                <span className="text-xs">{ele}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>


  )

}
