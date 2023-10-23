
import { Suspense } from "react"
import Await from "@/app/components/Await"
import { getHealthData } from "@/lib/health"
import { Concern, Supplement } from "@/types"
import ConcernTab from "./ConcernTab"
import { getPlaiceholder } from 'plaiceholder'
import { ConcernTabSkeleton } from "../Skeletons"

export interface ConcernWithBase64 extends Concern {
  supplementsList: {
    supplementName: string
    imageURL: string
    base64?: string
  }[]
}
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}



async function getBase64(imgUrl: string) {
  let base64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='
  try {
    const res = await fetch(imgUrl)
    if (!res.ok) {
      console.error('Failed to fetch image for base64')
      return base64
    }
    const buffer = await res.arrayBuffer()
    const result = await getPlaiceholder(Buffer.from(buffer))
    base64 = result.base64
  } catch (error) {
    console.error(error)
    throw error
  }
  return base64
}

export default async function Page() {
  const data = await getHealthData();
  const getHealthchunk = async (): Promise<ConcernWithBase64[]> => {
    const processChunk = async (chunk: Concern[]): Promise<ConcernWithBase64[]> => {
      const base64Promises = chunk.map(async (concern: Concern) => {
        const supplementsWithBase64 = await Promise.all(
          concern.supplementsList.map(async (supplement: Supplement) => {
            const base64 = await getBase64(supplement.imageURL);
            return { ...supplement, base64 };
          }),
        );
        return { ...concern, supplementsList: supplementsWithBase64 };
      });
      return await Promise.all(base64Promises);
    };
  
    const chunks = chunkArray(data, 7);
    let result: ConcernWithBase64[] = [];
  
    const now= Date.now()
    console.log(now)
    for (const chunk of chunks) {
      const chunkResult = await processChunk(chunk);
      result = [...result, ...chunkResult];
    }  const now2= Date.now()
    console.log('chink',now2-now)
    return result;
  };

  const getHealth4 = async (): Promise<ConcernWithBase64[]> => {

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

  
  return (
    <div className="main">
      <Suspense fallback={<ConcernTabSkeleton />} >
        <Await promise={getHealthchunk()}>
          {(dataWithbase64) => <ConcernTab data={dataWithbase64} />}
        </Await>
      </Suspense>
      <Suspense fallback={<ConcernTabSkeleton />} >
        <Await promise={getHealth4()}>
        {(dataWithbase64) => <ConcernTab data={dataWithbase64} />}
        </Await>
      </Suspense>
    </div>
  )
}