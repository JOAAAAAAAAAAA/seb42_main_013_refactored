import { User } from "@/types"
import { verify } from "crypto"
import { cookies } from "next/headers"

export const getUserClient = async () => {
  "use client"
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/user`, {
    method: 'GET',
    //no cache for dynamic redner
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'cookie': `session=${sessionCookie}`,
    },
  })

  if (res.status === 200) {
    const data = await res.json()
    const user = data.user as User
    return user
  }
  } catch (error) {
    console.error(error)
  }
}

export const getUserServer = async () => {
  "use server"
  const sessionCookie = cookies().get('session')
  if (!sessionCookie) return null
  v
  gf

}