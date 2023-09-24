import { getHealthData } from "@/lib/health"
import ConcerTab from "../(home)/@suggest/ConcernTab"

export default async function Await<T>({
  promise,
  children
}: {
  promise: Promise<T>
  children: (value: T) => JSX.Element
}) {
  let data = await promise

  return children(data)
}

