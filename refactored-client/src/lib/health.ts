import { Concern } from "@/types"

export const postHealthData = async (sessionCookie: string, data:Concern) => {
  //   const sessionCookie = cookies().get('session')?.value || ""
  //   로 담아야 한다
  const csrfToken = await fetch("/api/auth/csrf")
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/health`,{
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'cookie': `session=${sessionCookie}`,
    },
    body: JSON.stringify(data)
  })
}

export const getHealthData = async (): Promise<Concern[]> => {

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/health`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(res.status === 200){
      const healthConcern :Concern[] = await res.json() 
      const result = await new Promise ((resolve) => { setTimeout(resolve, 10000) })
      return healthConcern
    }
    //다 throw 시켜서 <Await>에서 Generic으로 undefined 안받게 하기
    throw new Error('Failed to fetch health data');
  } catch (error) {
    console.error(error)
    throw error
  }
}
