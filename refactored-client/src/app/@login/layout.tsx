import Header from "../@header/page"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("login layout")
  return (
    <main className="main">
      {children}
    </main>
  )
}