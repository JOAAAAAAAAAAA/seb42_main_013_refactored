"use client";
import { PillDataSort } from "@/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";



function SortbyModalWindow({
  sort,
  sortName,
}: {
  sort: string;
  sortName: Map<string, string>;
  }) {
   
  //server component에 선언된 createQuery 는 props로 전달할 수 없음
  const searchParams = useSearchParams()
  const pathname = usePathname()
  console.log(pathname)

  return (

    <ul className="absolute right-[4px] top-[21px] z-10 flex list-none flex-col rounded-[5px] bg-white text-center text-[12px] shadow-md"
      onClick={(e) => e.stopPropagation()}>
      {[...sortName.keys()].map((key) => {
        return <Link
          href={pathname + `?sort=${key}`+`&filter=${searchParams.get('filter')}`}
          key={key}
          className={`cursor-pointer bg-white px-[16px] py-[4px] hover:bg-[#f7f9fa] ${sort === key ? "text-[--blue-100]" : "text-[--black-200]"}`}
        >{sortName.get(key)}</Link>
      })}
    </ul>

  )
}

export default SortbyModalWindow;