import { ReadonlyURLSearchParams } from "next/navigation"

export const createQuery = (key: string, value: string, searchParams:ReadonlyURLSearchParams) => {
  const params = new URLSearchParams(searchParams)
  params.set(key, value)
  const query = params.toString()
  return '/create' + (query ?`?${query}` : '')
  // 'create' 로하면 오류남 chip 생성안됨.....
}