"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { PillData, PillDataSort } from "@/types";
import Link from "next/link";
import OthersSVGSprite from "@/app/components/OthersSVGSprite";
import SortbyModalWindow from "../components/SortbyModalWindow";
import DataLists from "./DataLists";
import Image from "next/image";
import { experimental_useOptimistic as useOptimistic } from "react";
import nodata from '@/../public/images/NoSupplementData.png'
import DataList from "./DataList";

export default function Dashboard({ data }: { data: PillData[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const [filter, setFilter] = useState<PillData["productType"] | undefined>(undefined)
  const [sort, setSort] = useState<PillDataSort>("AtoZ")
  const modalOpen = searchParams.get('modal')

  const sortName = new Map<PillDataSort, string>([
    ["AtoZ", "가나다순"],
    ["ZtoA", "가나다역순"],
    ["pillsLeftAscending", "남은약 적은순"],
    ["pillsLeftDescending", "남은약 많은순"],
  ])

  const filteredData = filter ? data.filter((pill) => pill.productType === filter) : data
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "AtoZ") return a.supplementName.localeCompare(b.supplementName)
    if (sort === "ZtoA") return b.supplementName.localeCompare(a.supplementName)
    if (sort === "pillsLeftAscending") return a.pillsLeft - b.pillsLeft
    if (sort === "pillsLeftDescending") return b.pillsLeft - a.pillsLeft
    return 0; //defalut value
  })

  //optimistic ui
  const [optimisticData, deleteOptimisticData] = useOptimistic(
    sortedData,
    (state, id) => state.filter((pill) => pill.id !== id)
  )


  return (
    <>
      <div className="relative flex w-full justify-between gap-[16px] rounded-[24px] bg-[--black-500] p-[3px]
         [&>button]:z-10 [&>button]:flex-1 [&>button]:rounded-[21px] [&>button]:p-[4px] [&>button]:text-center">
        <button
          onClick={() => setFilter(undefined)}
          className={!filter ? "text-[--black-200]" : "text-[--black-300]"}>
          종합
        </button>
        <button
          onClick={() => setFilter("supplement")}
          className={filter === "supplement" ? "text-[--black-200]" : "text-[--black-300]"}>
          영양제
        </button>
        <button
          onClick={() => setFilter("drug")}
          className={filter === "drug" ? "text-[--black-200]" : "text-[--black-300]"}>
          처방약
        </button>
        <span className={`
        absolute left-[3px]
        z-0	
        h-[calc(100%-6px)] w-[calc((100%-36px)/3)] rounded-[21px] bg-white p-[4px] text-center shadow-md transition-transform
        ${filter === "supplement" && "translate-x-[calc(100%+16px)]"}
        ${filter === "drug" && "translate-x-[calc(200%+30px)]"}
        `} />
      </div>
      <div className="relative mx-0 my-[4px] flex justify-end">
        <Link
          className="flex items-center"
          href={pathname + `?modal=sort`}>
          <button className="flex cursor-pointer items-center border-none text-[14px] text-[--black-100] outline-none">{sortName.get(sort)}</button>
          <OthersSVGSprite id="arrow" color="black" width="18px" height="18px" className={`${modalOpen === "sort" ? "rotate-180" : ""}`} />
        </Link>
        {modalOpen === "sort" && <SortbyModalWindow sortName={sortName} sort={sort} setSort={setSort} />}
      </div>
      {!!modalOpen && <div onClick={() => router.back()} className="fixed inset-0 z-10 flex justify-center" />}
      <ul className="relative flex h-full flex-col items-center gap-[--gap-sm]">
        {(!sortedData || sortedData.length === 0) && <>
          <Image src={nodata} alt="no data" sizes="100vw"
            style={{
              width: '50%',
              height: 'auto',
            }} />
          <span>등록된 데이터가 없습니다.</span>
        </>}
        {optimisticData && optimisticData.map((pill, idx) => {
          return <DataList key={pill.id} pill={pill} deleteOptimisticData={deleteOptimisticData} />;
        })}
      </ul>
    </>
  )
}
