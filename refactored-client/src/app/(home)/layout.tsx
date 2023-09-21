import { cookies } from "next/headers"
import { Suspense } from "react"
import Loading from "../loading"



export default function HomeLayout({
  intro,
  suggest,
  children,
}: {
  intro: React.ReactNode,
  suggest: React.ReactNode,
  children: React.ReactNode
}) {
  const sessionCookie = cookies().get('session')

  return (
    <section className="main">
      {sessionCookie ?suggest : intro}
      {children}
    </section>
  )
}