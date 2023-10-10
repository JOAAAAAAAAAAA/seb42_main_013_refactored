import Await from "@/app/components/Await";
import Create from "../components/Create";
import { getPill } from "@/lib/pills";

export default async function Layout({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const id = searchParams?.edit
  const pill = getPill(id)

  return (
    <>
      {id
        ? (
          <Await promise={pill}>
            {(data) => <Create initialData={data}/>}
          </Await>
        )
        : <Create />

      }
    </>
  )
}