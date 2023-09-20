import AuthProvider from "@/context/AuthProvider"




export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log('summaryLayout발동')

  return (
    <section>
      <AuthProvider>
        {children}
      </AuthProvider>
    </section>
  )
}