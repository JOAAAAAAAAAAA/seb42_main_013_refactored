
import { Suspense } from "react"
import Await from "@/app/components/Await"
import { getHealthData } from "@/lib/health"
import { Concern, Supplement } from "@/types"
import ConcernTab from "./ConcernTab"
import { getBase64 } from "@/lib/base64"
import { ConcernTabSkeleton } from "../Skeletons"

export interface ConcernWithBase64 extends Concern {
  supplementsList: {
    supplementName: string
    imageURL: string
    base64?: string
  }[]
}


export default async function Page() {

  const getHealth = async (): Promise<ConcernWithBase64[]> => {
    const data = await getHealthData();
    // base64 병렬처리
    const base64Promises = data.map(async (concern: Concern) => {
      const supplementsWithBase64 = await Promise.all(
        concern.supplementsList.map(async (supplement: Supplement) => {
          const base64 = await getBase64(supplement.imageURL);
          return { ...supplement, base64 };
        }),
      );
      return { ...concern, supplementsList: supplementsWithBase64 };
    });
    const now= Date.now()
    console.log(now)
    const result = await Promise.all(base64Promises);
    const now2= Date.now()
    console.log('all',now2-now)
    return result;
  };
  const getHealthhalf = async (): Promise<ConcernWithBase64[]> => {
    const data = await getHealthData();
    const half = data.slice(0, 7)
    // base64 병렬처리
    const base64Promises = half.map(async (concern: Concern) => {
      const supplementsWithBase64 = await Promise.all(
        concern.supplementsList.map(async (supplement: Supplement) => {
          const base64 = await getBase64(supplement.imageURL);
          return { ...supplement, base64 };
        }),
      );
      return { ...concern, supplementsList: supplementsWithBase64 };
    });
    const now= Date.now()
    console.log(now)
    const result = await Promise.all(base64Promises);
    const now2= Date.now()
    console.log('half',now2-now)
    return result;
  };
  
  const getHealthall = async () => {
    const data = await getHealthData();
    const half = data.slice(0, 7)
    // base64 병렬처리
    const base64Promises = half.map( (concern: Concern) => {
      const supplementsWithBase64 = 
        concern.supplementsList.map((supplement: Supplement) => {
          return { ...supplement, base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg==' };
        })
      return { ...concern, supplementsList: supplementsWithBase64 };
    });
    return base64Promises;
  };
  // const data = await getHealth();

  return (
    <div className="main">
      <Suspense fallback={<ConcernTabSkeleton />} >
        <Await promise={getHealthhalf()}>
          {(dataWithbase64) => <ConcernTab data={dataWithbase64} />}
        </Await>
      </Suspense>
      <Suspense fallback={<ConcernTabSkeleton />} >
        <Await promise={getHealthall()}>
        {(dataWithbase64) => <ConcernTab data={dataWithbase64} />}
        </Await>
      </Suspense>
    </div>
  )
}