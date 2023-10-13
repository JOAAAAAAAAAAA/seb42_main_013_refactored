import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { getPills } from "@/lib/pills";
import DataLists from "../components/DataLists";
import { PillData, PillDataSort } from "@/types";
import Dashboard from "../components/Dashboard";




async function Summary({
  // searchParams
}: {
  // searchParams: { [key: string]: string | undefined }
  //https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
}) {
  const data = await getPills();
  // const filter = searchParams?.filter as PillData["productType"] || undefined
  // const sort = searchParams?.sort as PillDataSort ?? "AtoZ"

  // const createQuery = (key: 'filter' | 'sort' | 'modal', value: string) => {
  //   const params = new URLSearchParams(searchParams)
  //   params.set(key, value)
  //   const query = params.toString()
  //   return 'summary' + (query ? `?${query}` : '')
  // }




  return (
    <section className="main relative gap-[--gap-md]">
      <Dashboard data={data} />
      <Fab
        className="!fixed bottom-[calc(8px+64px)] !ml-[calc(420px-40px-8px-4px)] "
        LinkComponent={Link}
        href={"/create"}
        size="small" color="primary" aria-label="add">
        <FontAwesomeIcon icon={faPlus} />
      </Fab>
    </section>
  )
}

export default Summary;