import { Card, Skeleton } from "@mui/material";

Skeleton

function UserConcernSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={100} height={21} />
      <Card variant='outlined'className="p-[--gap-md]">
        <Skeleton variant="rounded" width={250} height="21px" />
        <div className="relative mt-[--gap-sm] flex h-[100px] w-full items-center justify-around">
          <div>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={50} height="0.75rem" className="mt-[0.125rem]" />
          </div>
          <div>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={50} height="0.75rem" className="mt-[0.125rem]" />
          </div>
          <div>
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="rounded" width={50} height="0.75rem" className="mt-[0.125rem]" />
          </div>
        </div>
      </Card>
    </>
  )
}

function BannerSkeleton() {
  return (
      <Skeleton variant="rounded" height="5.5rem" />
  )
}

function ConcernTabSkeleton() {
  return (
    <div>
      <Skeleton variant="circular" height="100%"/>
      <Skeleton variant="text" className="text-[14px]" />
    </div>
  )
}


export { UserConcernSkeleton, BannerSkeleton, ConcernTabSkeleton };