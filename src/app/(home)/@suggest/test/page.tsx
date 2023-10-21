import Image from "next/image"
import { Item } from "@/types"
import { getPlaiceholder } from "plaiceholder"
import { Suspense } from "react"
import Await from "@/app/components/Await"
import { getHealthData } from "@/lib/health"
import { Concern, Supplement, ConcernWithBase64 } from "@/types"
import ConcernTab from "./ConcernTab"
import { getBase64 } from "@/lib/base64"
import { FallbackImage } from "../FallbackImage"


export default async function Page() {
  const getHealth = async () => {
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
    console.log('1111')
    const result = await Promise.allSettled(base64Promises);
    console.log('22222')
    const fulfilled = result.map((res, idx) => res.status === 'fulfilled'
      ? res.value
      : data[idx]
    );
    return fulfilled;
  };
  const data = await getHealth()

  return (
    <div className="main">
      <ConcernTab data={data} />

      {data.map((concern) =>
        concern.supplementsList.map((ele,idx) => {
          return (
            <FallbackImage
              key={idx}
              src={ele.imageURL}
              alt="supplement-img"
              blur={ele.base64}
            />
          )
        })
      )}
    </div>

  )
}