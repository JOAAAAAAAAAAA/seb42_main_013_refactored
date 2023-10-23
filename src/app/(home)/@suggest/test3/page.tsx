
import { Suspense } from "react"
import Await from "@/app/components/Await"
import ConcernTab from "./ConcernTab"
import { ConcernTabSkeleton } from "../Skeletons"
import { getHealth4 } from "./helper"


export default async function Page() {


  return (
    <div className="main">
      <Suspense fallback={<ConcernTabSkeleton />} >
        <Await promise={getHealth4()}>
        {(dataWithbase64) => <ConcernTab initialData={dataWithbase64} />}
        </Await>
      </Suspense>
    </div>
  )
}