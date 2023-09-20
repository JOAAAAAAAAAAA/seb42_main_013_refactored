import { getUser } from '@/lib/auth'
 
export default function MypageLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <h1>Mypage</h1>
      {children}
    </div>

  )
}