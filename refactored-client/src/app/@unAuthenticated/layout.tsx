import AuthProvider from "@/context/AuthProvider"

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  //! Provider 은 꼭 layout 안에 있어야 함
  return (
    <main className="main">
        {children}
    </main>
  )
}