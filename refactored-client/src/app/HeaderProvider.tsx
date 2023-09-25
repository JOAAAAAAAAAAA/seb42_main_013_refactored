"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";


//https://stackoverflow.com/questions/76230464/next-js-13-remove-layout-for-specific-page
//conditional layout 에 대한 고민...
// page per layout 
// vs 
// conditional rendering depending on pathname 
// https://nextjs.org/docs/app/api-reference/functions/use-pathname

function HeaderProvider() {
  const { sessionLogout, authUser } = useContext(AuthContext);

    return (
      <header className="relative flex h-[48px] w-full max-w-[428px] items-center justify-center bg-[--blue-100]">
        <Link href="/" className="relative h-full w-[160px] max-w-[428px]">
          <Image src="/images/logo_header.png" alt="logo" fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
          className="mt-[2px] object-contain" 
          />
          </Link>
        <FontAwesomeIcon icon={faRightFromBracket} className="absolute right-[8px] h-full cursor-pointer text-[30px] text-white" onClick={sessionLogout}/>
      </header>
    )


}


export default HeaderProvider