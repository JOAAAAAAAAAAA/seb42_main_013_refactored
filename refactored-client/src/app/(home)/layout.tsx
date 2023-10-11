import { cookies } from "next/headers"

export default function HomeLayout({
  intro,
  suggest,
}: {
  intro: React.ReactNode,
  suggest: React.ReactNode,
}) {
  const isLogin = cookies().has('session')
  return isLogin ? suggest : intro
}