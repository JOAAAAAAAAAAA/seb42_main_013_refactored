import Image from "next/image"
import { Item } from "@/types"
import { getPlaiceholder } from "plaiceholder"


export default async function Page() {
  
  const getItems = async (query: string) => {
    // https://rapidapi.com/guides/query-parameters-fetch
    const params = new URLSearchParams({
      query: query,
      display: '10'
    }) //encoded UTF-8
  
    const res = await fetch(`https://openapi.naver.com/v1/search/shop?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-NAVER-CLIENT-ID': `${process.env.NAVER_CLIENT_ID}`,
        'X-NAVER-CLIENT-SECRET': `${process.env.NAVER_CLIENT_SECRET}`,
      },
    })
    if (res.status === 200) {
      const data = await res.json()
      const filteredData = data.items.filter((item: Item) => item.category2 === '건강식품')
      return filteredData
    }
  }
  
  const getBase64 = async (imgUrl: string)=> {
    let base64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='
    try {
      const res = await fetch(imgUrl)
      if (!res.ok) {
        console.error('Failed to fetch image for base64')
        return base64
      }
      const buffer = await res.arrayBuffer()
      const result = await getPlaiceholder(Buffer.from(buffer), { size: 10 })
      base64 = result.base64
    } catch (error) {
      console.error(error)
      throw error
    }
    return base64
  }
  const items = await getItems('비타민') as Item[]
  const parsed = await Promise.all(items.map(async (item) => {
    const base64 = await getBase64(item.image)
    return {
      ...item,
      base64,
    }
  }))

  const blurforone = await getBase64('https://shopping-phinf.pstatic.net/main_3129732/31297322631.20220314114144.jpg')
  return (
    <div className="main">
      <ul className="gap-[8px]">
        하나
        <Image
          src="https://shopping-phinf.pstatic.net/main_3129732/31297322631.20220314114144.jpg"
          alt="item image"
          width={80}
          height={80}
          placeholder="blur"
          blurDataURL={blurforone}
        />
        묶음
        {parsed.length > 0
          ? parsed.map((item, idx) => <Image
            key={idx}
            src={item.image}
            alt="item image"
            width={80}
            height={80}
            placeholder="blur"
            blurDataURL={item.base64}
            className="rounded-[5px]"
          />)
          : (<div className="relative flex h-full flex-col items-center gap-[--gap-sm]">
            <span>검색결과가 없습니다.</span>
          </div>)
        }
      </ul>
    </div>


  )
}