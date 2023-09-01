export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  console.log('login layout')
  return (
    <main className="main">
      {children}
    </main>
  )
}