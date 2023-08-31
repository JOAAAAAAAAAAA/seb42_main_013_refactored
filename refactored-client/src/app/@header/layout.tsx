"use client"

import { usePathname} from "next/navigation"

//https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#modals
//parallel example 중 모달 참고하여 conditional layout 구현
//이렇게 나누기는 했는데 어차피 client side rendering이라서
//서버에서는 렌더링이 안되고 클라이언트에서 렌더링이 되는 것이기 때문에
//이렇게 나누는 것이 의미가 있을까?

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode
}){
  const pathname = usePathname()
    return (
      <>
       {pathname === "/signup" && children}
      </>
      )
}

