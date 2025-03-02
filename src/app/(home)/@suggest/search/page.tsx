import SearchForm from "@/app/(home)/@suggest/SearchForm"
import { getItemsWithBase64 } from "@/lib/shopping"
import SearchItem from "./SearchItem"
import Image from "next/image"
import nodata from '@/../public/images/no-result-data-found.png'
import { Suspense } from "react"
import { DataListSkeleton } from "../Skeletons"
import Await from "@/app/components/Await"



export default async function Search({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams
  // const items = await getItemsWithBase64(query) as Item[]
  // const items = query && await searchItem(query) as Item[]
  return (
    <div className="main">
      <SearchForm />
      <Suspense fallback={<DataListSkeleton />}>
        <Await promise={getItemsWithBase64(query)}>
          {(items) =>
            <ul className="gap-[8px]">
              {items && items.length > 0
                ? items.map((item, idx) => <SearchItem item={item} key={idx} />)
                : (<div className="relative flex h-full flex-col items-center gap-[--gap-sm]">
                  <Image src={nodata} alt="no data" sizes="100vw"
                    style={{
                      width: '50%',
                      height: 'auto',
                    }} />
                  <span>검색결과가 없습니다.</span>
                </div>)
              }
            </ul>}
        </Await>
      </Suspense>
    </div>
  )
}