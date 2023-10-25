import SearchForm from "@/app/(home)/@suggest/SearchForm"
import { getItems, getItemsWithBase64 } from "@/lib/shopping"
import SearchItem from "./SearchItem"
import { Item } from "@/types"
import Image from "next/image"
import nodata from '@/../public/images/no-result-data-found.png'
import { Suspense } from "react"
import { DataListSkeleton } from "../Skeletons"
import Await from "@/app/components/Await"
import SearchLists from "./SearchLists"


export default async function Search({ searchParams }: { searchParams: { query: string } }) {
  const { query } = searchParams
  // const items = await getItemsWithBase64(query) as Item[]
  // const items = query && await searchItem(query) as Item[]
  return (
    <div className="main">
      <SearchForm />
      클라이언트
      <Suspense fallback={<DataListSkeleton />}>
        <Await promise={getItems(query)}>
          {(items) => <SearchLists items={items} />}
        </Await>
      </Suspense>
    </div>
  )
}