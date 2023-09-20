import { cookies } from "next/headers"
import { Suspense } from "react"
import Loading from "../loading"


export default function HomeLayout({
  intro,
  suggest,
}: {
  intro: React.ReactNode,
  suggest: React.ReactNode,
}) {
  const sessionCookie = cookies().get('session')

  return (
    <section className="main">
      {sessionCookie ?suggest : intro}
    </section>
  )
}