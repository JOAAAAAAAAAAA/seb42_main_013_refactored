import Image from "next/image";
import Link from "next/link";

export default function HeaderDefault() {
  return (
    <header className="bg-[--blue-100] w-full max-w-[428px] h-[48px] flex justify-center items-center px-[20px]">
      <Link href="/"><Image src="/images/logo_header.png" alt="logo" width={120} height={34} className="mt-[2px]" /></Link>
    </header>
  )
}

