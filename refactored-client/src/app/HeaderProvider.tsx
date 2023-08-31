"use client"
import { usePathname} from "next/navigation"
import Header from "./@header/page"

//https://stackoverflow.com/questions/76230464/next-js-13-remove-layout-for-specific-page
//conditional layout 에 대한 고민...
// page per layout 
// vs 
// conditional rendering depending on pathname 
// https://nextjs.org/docs/app/api-reference/functions/use-pathname


function HeaderProvider () {
  const pathname = usePathname()

    return (
      <>
       {pathname === "/signup" && <Header />}
      </>
      )
}

export default HeaderProvider