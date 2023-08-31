import Header from "@/app/components/Header"

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

  <section>
    <Header />
    {children}
  </section>
  )
}