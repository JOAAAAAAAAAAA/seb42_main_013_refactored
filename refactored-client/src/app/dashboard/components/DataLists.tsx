'use client'

import { PillData } from "@/types";
import Image from "next/image";
import { experimental_useOptimistic as useOptimistic } from "react";
import nodata from '@/../public/images/NoSupplementData.png'
import DataList from "./DataList";
import { useSearchParams } from "next/navigation";

export default function DataLists({ data }: { data: PillData[] }) {
  const [optimisticData, deleteOptimisticData] = useOptimistic(
    data,
    (state, id) => state.filter((pill) => pill.id !== id)
  )
  
  const searchParams = useSearchParams()

  return (
    <ul className="relative flex h-full flex-col items-center gap-[--gap-sm]">
      {(!data || data.length === 0) && <>
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
  )
}