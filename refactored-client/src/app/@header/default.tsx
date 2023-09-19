import Image from "next/image";
import Link from "next/link";

export default function HeaderDefault() {
  return (
    <header className="flex h-[48px] w-full max-w-[428px] items-center justify-center bg-[--blue-100] px-[20px]">
      <Link href="/"><Image src="/images/logo_header.png" alt="logo" width={120} height={34} className="mt-[2px]" /></Link>
    </header>
  )
}

//parallel-routes 로 하면 페이지 전환 때마다 불필요한 렌더링이 발생해서 안하는게 좋을 것 같다.
