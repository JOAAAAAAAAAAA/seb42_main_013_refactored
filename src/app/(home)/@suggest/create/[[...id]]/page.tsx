import CreateForm from "../components/CreateForm"
import { cookies, headers } from "next/headers"


export default async function Create() {
  return (
    <section className="main">
      <CreateForm  />
    </section>
  )
}