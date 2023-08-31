import Image from "next/image";
import Link from "next/link";


function Header() {

  return (
    <div className="bg-[--blue-100] w-full max-w-[428px] h-[48px] fixed top-0 flex justify-between items-center px-[20px]">
      <Link href="/"><Image src="images/logo_header.png" alt="logo" width={120} className="mt-[2px]" /></Link>
    </div>
  )
}

export default Header;