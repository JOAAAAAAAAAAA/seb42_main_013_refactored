"use client"
import { Item } from "@/types"
import Image from "next/image"
import { useEffect, useState } from "react"
import SearchItem from "./SearchItem"
import nodata from '@/../public/images/no-result-data-found.png'
import { getBase64 } from "@/lib/base64"
import { DataListSkeleton } from "../Skeletons"
import { Skeleton } from "@mui/material"



export default function SearchLists({ items }: { items: Item[] | undefined }) {
  const [itemsWbase64, setItemsWbase64] = useState<Item[] | null>(null)
  useEffect(() => {
    const getItemsWithBase64 = async (items: Item[]) => {
      const itemPromises = items.map(async (item: Item) => {
        const base64 = await getBase64(item.image)
        return {
          ...item,
          base64
        }
      })
      const results = await Promise.all(itemPromises)
      setItemsWbase64(results)
    }
    items && getItemsWithBase64(items)
  }, [items])

  return (
    itemsWbase64 ?
      <ul className="gap-[8px]">
        {items
          ? itemsWbase64 && itemsWbase64.map((item, idx) => <SearchItem item={item} key={idx} />)
          : (<div className="relative flex h-full flex-col items-center gap-[--gap-sm]">
            <Image src={nodata} alt="no data" sizes="100vw"
              style={{
                width: '50%',
                height: 'auto',
              }} />
            <span>검색결과가 없습니다.</span>
          </div>)
        }
      </ul>
      : <ul className="relative flex h-full flex-col items-center gap-[--gap-sm]">
        <li className="
  relative flex w-full rounded-[5px] px-[8px] py-[16px]
  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div className="mr-[8px] flex h-full w-[auto] items-center justify-center text-center">
            <Skeleton variant="rounded" width={80} height={80} />
          </div>
          <div className="flex flex-col justify-center gap-[--gap-sm]">
            <div className="flex items-center gap-[4px]">
              <Skeleton height={24} width={40} />
              <Skeleton height={21} width={40} />
            </div>
            <Skeleton height={21} width={240} />
            <Skeleton height={21} width={120} />
          </div>
        </li>
        <li className="
  relative flex w-full rounded-[5px] px-[8px] py-[16px]
  shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <div className="mr-[8px] flex h-full w-[auto] items-center justify-center text-center">
            <Skeleton variant="rounded" width={80} height={80} />
          </div>
          <div className="flex flex-col justify-center gap-[--gap-sm]">
            <div className="flex items-center gap-[4px]">
              <Skeleton height={24} width={40} />
              <Skeleton height={21} width={40} />
            </div>
            <Skeleton height={21} width={240} />
            <Skeleton height={21} width={120} />
          </div>
        </li>
      </ul>

      
  )
}