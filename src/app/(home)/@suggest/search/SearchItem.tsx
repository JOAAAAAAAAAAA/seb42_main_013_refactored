import { Item } from "@/types"
import Image from "next/image"

export default function SearchItem({ item }: { item: Item }) {

  let title = [item.title.replace(item.brand, '').trim()]
  if (title[0].includes("<b>" && "</b>")) {
    const regex = /(.*?)(<b>.+<\/b>)(.*)/
    const parts = title[0].match(regex) as RegExpMatchArray
    title = [parts[1].trim(), parts[2].replace(/<\/?b>/g, '').trim(), parts[3].trim()]
  }
  const price = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(Number(item.lprice))

  return (
    <li className="
    relative flex w-full rounded-[5px] px-[8px] py-[16px]
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="relative mr-[8px] flex h-full w-[auto] flex-none items-center justify-center pb-[5px] text-center">
        <Image
          src={item.image}
          alt="item image"
          width={80}
          height={80}
          className="rounded-[5px]"
        />
      </div>
      <div className="flex flex-auto flex-col gap-[--gap-sm] overflow-hidden">

        <div className="flex max-w-[90%] items-center text-[14px] font-bold text-[--black-200]">
          {title.length > 1
            ? <span className="w-full shrink-0 truncate text-[16px] text-black">{title[0]}<b>{title[1]}</b>{title[2]}</span>
            : <span className="shrink-0 truncate text-[16px] text-black">{item.title}</span>
          }
        </div>
        <div className="flex items-center gap-[5px] text-center text-[14px] text-[--black-100]
        [&>span]:flex [&>span]:items-center [&>span]:gap-[2px] [&>span]:truncate
        ">{item.brand}
        </div>
        <div className="flex items-center gap-[5px] text-center text-[14px] font-bold">
          {price}
        </div>
      </div>
    </li>

  )
}