"use server"


import { Item } from "@/types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export const searchItem = (formData:FormData) => {
  const query = formData.get('query') as string ?? '' 
  if(query){
    const params = new URLSearchParams({
      query: query,
    })
    revalidatePath('/search')
    redirect(`/search?${params.toString()}`)
  }  
  redirect('/search')
}

export const getItem = async (query:string) => {
  // https://rapidapi.com/guides/query-parameters-fetch
  const params = new URLSearchParams({
    query: query,
    display: '20'
  }) //encoded UTF-8

  const res = await fetch(`https://openapi.naver.com/v1/search/shop?${params.toString()}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-NAVER-CLIENT-ID': `${process.env.NAVER_CLIENT_ID}`,
      'X-NAVER-CLIENT-SECRET': `${process.env.NAVER_CLIENT_SECRET}`,
    },
  })
  if(res.status === 200){
    const data = await res.json()
    const filteredData = data.items.filter((item:Item)=>item.category2 === '건강식품')
    return filteredData
  }
}