"use server"  

import { getHealthData } from "@/lib/health"
import { Concern, Supplement } from "@/types"
import { getPlaiceholder } from 'plaiceholder'


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

export const getHealth4 = async (): Promise<ConcernWithBase64[]> => {
  const data = await getHealthData();
  const sliced = data.slice(0, 7); 
  // base64 병렬처리
  const base64Promises = sliced.map(async (concern: Concern) => {
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

export const getHealthwithSliced = async (slicedData:ConcernWithBase64[]): Promise<ConcernWithBase64[]> => {
  const base64Promises = slicedData.map(async (concern: Concern) => {
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

export const loadData = async ( prev: ConcernWithBase64[], formData: FormData,) => {
  console.log('formAction ...ing')
  const page = formData.get('page') as number | null
  if(!page) return prev
  const data = await getHealthData();
  const sliceStart = page * 7;
  const sliceEnd = sliceStart + 6;
  const sliced = data.slice(sliceStart, sliceEnd); 
  const newData = await getHealthwithSliced(sliced)
  return [...prev, ...newData]
}
