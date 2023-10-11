import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import logo from '@/../public/images/logo_header.png'
import { sessionLogout as logout } from "@/lib/auth";

//https://stackoverflow.com/questions/76230464/next-js-13-remove-layout-for-specific-page
//conditional layout 에 대한 고민...
// page per layout 
// vs 
// conditional rendering depending on pathname 
// https://nextjs.org/docs/app/api-reference/functions/use-pathname

function Header() {

  return (
    <header className="relative flex h-[48px] w-full max-w-[428px] items-center justify-center bg-[--blue-100]">
      <Link href="/" className="relative h-full w-[160px] max-w-[428px]">
        <Image src={logo} alt="logo" priority/>
      </Link>
      <form 
      className="absolute right-[8px] flex h-[80%] cursor-pointer items-center text-[30px] text-white"
      action={logout}>
        <button type="submit"><FontAwesomeIcon icon={faRightFromBracket}/></button>
      </form>
    </header>
  )
}


export default Header