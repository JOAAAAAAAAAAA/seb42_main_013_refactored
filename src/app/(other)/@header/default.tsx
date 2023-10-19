import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import logo from '@/../public/images/logo_header.png'
import { sessionLogout as logout } from "@/lib/auth";

export default function Header() {
  return (
    <header className="fixed z-[20] flex h-[48px] w-full max-w-[428px] items-center justify-center bg-[--blue-100]">
      <Link href="/" className="relative h-full w-[160px] max-w-[428px]">
        <Image src={logo} alt="logo" priority/>
      </Link>
      <form 
      className="absolute right-[8px] flex h-[80%] cursor-pointer items-center text-[30px] text-white"
      action={logout}
      >
        <button type="submit"><FontAwesomeIcon icon={faRightFromBracket}/></button>
      </form>
    </header>
  )
}