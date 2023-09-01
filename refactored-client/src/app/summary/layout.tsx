import AuthProvider from "@/context/AuthProvider"




export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <AuthProvider>
        {children}
      </AuthProvider>
    </section>
  )
}