import { User } from "@/types"

export const getUser = async (sessionCookie: string) => {
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