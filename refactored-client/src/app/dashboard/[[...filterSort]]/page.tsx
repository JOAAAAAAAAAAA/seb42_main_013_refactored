import SortbyModalWindow from "../components/SortbyModalWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { getPills } from "@/lib/pills";
import DataLists from "../components/DataLists";
import { PillData, PillDataSort } from "@/types";
import OthersSVGSprite from "@/app/components/OthersSVGSprite";




async function Dashboard({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
  //https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
}) {
  const data = await getPills();
  const filter = searchParams?.filter as PillData["productType"] || undefined
  const sort = searchParams?.sort as PillDataSort ?? "AtoZ"
  const isModalOpen = searchParams?.modal === "true" || false
  const filteredData = filter ? data.filter((pill) => pill.productType === filter) : data
  const sortedData = filteredData.sort((a, b) => {
    if (sort === "AtoZ") return a.supplementName.localeCompare(b.supplementName)
    if (sort === "ZtoA") return b.supplementName.localeCompare(a.supplementName)
    if (sort === "pillsLeftAscending") return b.pillsLeft - a.pillsLeft
    if (sort === "pillsLeftDescending") return a.pillsLeft - b.pillsLeft
    return 0; //defalut value
  })

  const createQuery = (key: 'filter' | 'sort' | 'modal', value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set(key, value)
    const query = params.toString()
    return 'dashboard' + (query ? `?${query}` : '')
  }
  const sortName = new Map([
    ["AtoZ", "가나다순"],
    ["ZtoA", "가나다역순"],
    ["pillsLeftAscending", "남은약 적은순"],
    ["pillsLeftDescending", "남은약 많은순"],
  ])



  return (
    <section className="main relative gap-[--gap-md]">
      <div className="relative flex w-full justify-between gap-[16px] rounded-[24px] bg-[--black-500] p-[3px]
    [&>a]:z-10 [&>a]:flex-1 [&>a]:rounded-[21px] [&>a]:p-[4px] [&>a]:text-center
    ">
        <Link
          href={'/dashboard'}
          className={!filter ? "text-[--black-200]" : "text-[--black-300]"}>
          종합
        </Link>
        <Link
          href={createQuery('filter', 'supplement')}
          className={filter === "supplement" ? "text-[--black-200]" : "text-[--black-300]"}>
          영양제
        </Link>
        <Link
          href={createQuery('filter', 'drug')}
          className={filter === "drug" ? "text-[--black-200]" : "text-[--black-300]"}>
          처방약
        </Link>
        <span className={`
            absolute left-[3px]
            z-0	
            h-[calc(100%-6px)] w-[calc((100%-36px)/3)] rounded-[21px] bg-white p-[4px] text-center shadow-md transition-transform
            ${filter === "supplement" && "translate-x-[calc(100%+16px)]"}
            ${filter === "drug" && "translate-x-[calc(200%+30px)]"}
            `} />
      </div>
        <Link 
        className="relative mx-0 my-[4px] flex items-center justify-end"
        href={createQuery('modal', 'true')}>
          <OthersSVGSprite id="arrow" color="black" width="18px" height="18px" />
          <button className="flex cursor-pointer items-center border-none text-[14px] text-[--black-100] outline-none">{sortName.get(sort)}</button>
        </Link>
        {isModalOpen && <SortbyModalWindow sort={sort} sortName={sortName}/>}

      <DataLists data={sortedData} />
      <Fab
        className="!absolute bottom-[calc(8px+64px)]"
        LinkComponent={Link}
        href={"/create"}
        size="small" color="primary" aria-label="add">
        <FontAwesomeIcon icon={faPlus} />
      </Fab>
    </section>
  )
}

export default Dashboard;