"use server"


import { Item } from "@/types"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getBase64 } from "./base64"



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

export const getItems = async (query:string):Promise<Item[]|undefined> => {
  // https://rapidapi.com/guides/query-parameters-fetch
  const params = new URLSearchParams({
    query: query,
    display: '2'
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

export const getItemsWithBase64 = async (query:string):Promise<Item[]> => {
  const items = await getItems(query)
  if (!items) {
    return []
  }
  const itemPromises = items.map(async (item:Item) => {
    // const base64 = await getBase64(item.image)
    //TODO : Serverless Function Execution Timeout. ERR
    //TODO : temporary solution
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='
    return {
      ...item,
      base64
    }})
  const itemsWithBase64 = await Promise.all(itemPromises)

  return itemsWithBase64
}

