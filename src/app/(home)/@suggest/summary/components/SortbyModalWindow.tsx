"use client";
import { PillDataSort } from "@/types.js";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



function SortbyModalWindow({
  sortName,
  sort,
  setSort,
}: {
  sortName: Map<PillDataSort, string>,
  sort: PillDataSort,
  setSort: Dispatch<SetStateAction<PillDataSort>>
}) {
  //server component에 선언된 createQuery 는 props로 전달할 수 없음
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <ul
      className="absolute right-0 top-[calc(21px+4px)] z-[100] flex list-none flex-col rounded-[5px] bg-white text-center text-[12px]
      shadow-md"
      onClick={(e) => e.stopPropagation()}>
      {[...sortName.keys()].map((key) => {
        return <li
          onClick={() => {
            setSort(key)
            router.back()
          }}
          key={key}
          className={`cursor-pointer bg-white px-[16px] py-[4px] hover:bg-[#f7f9fa]
          ${sort === key ? "text-[--blue-100]" : "text-[--black-200]"}`}
        >{sortName.get(key)}</li>
      })}
    </ul>
  )
}

export default SortbyModalWindow;