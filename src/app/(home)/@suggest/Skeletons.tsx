"use client"
import { Box, Card, Paper, Skeleton } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';



function UserConcernSkeleton() {
  return (
    <>
      <Skeleton variant="rounded" width={100} height={21} />
      <Card variant='outlined' className="p-[--gap-md]">
        <Skeleton variant="rounded" width={250} height="1.5rem" />
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex overflow-hidden pl-[40px] ">
        <div className="relative min-h-[72px] min-w-[90px]  justify-center px-[16px] py-[12px]">
          <Skeleton variant="circular" width={32.51} height={32.51} className="m-auto" />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
          <span className="absolute bottom-0 left-0 h-[2px] w-[90px] bg-[#007aff]" />
        </div>
        <div className="relative min-h-[72px] min-w-[90px]  justify-center px-[16px] py-[12px]">
          <Skeleton variant="circular" width={32.51} height={32.51} className="m-auto" />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
        </div>
        <div className="relative min-h-[72px] min-w-[90px]  justify-center px-[16px] py-[12px]">
          <Skeleton variant="circular" width={32.51} height={32.51} className="m-auto" />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
        </div>
        <div className="relative min-h-[72px] min-w-[90px]  justify-center px-[16px] py-[12px]">
          <Skeleton variant="circular" width={32.51} height={32.51} className="m-auto" />
          <Skeleton variant="text" sx={{ fontSize: '14px' }} />
        </div>
      </Box>
      <Box sx={{ pt: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6} className="">
            <Paper className="flex flex-col items-center p-[--gap-sm]">
              <Skeleton variant="rectangular" width={90} height={90} />
              <Skeleton variant="text" sx={{ fontSize: '14px' }} width={50} className="mt-[4px]" />
            </Paper>
          </Grid>
          <Grid xs={6} className="">
            <Paper className="flex flex-col items-center p-[--gap-sm]">
              <Skeleton variant="rectangular" width={90} height={90} />
              <Skeleton variant="text" sx={{ fontSize: '14px' }} width={50} className="mt-[4px]" />
            </Paper>
          </Grid>
          <Grid xs={6} className="">
            <Paper className="flex flex-col items-center p-[--gap-sm]">
              <Skeleton variant="rectangular" width={90} height={90} />
              <Skeleton variant="text" sx={{ fontSize: '14px' }} width={50} className="mt-[4px]" />
            </Paper>
          </Grid>
          <Grid xs={6} className="">
            <Paper className="flex flex-col items-center p-[--gap-sm]">
              <Skeleton variant="rectangular" width={90} height={90} />
              <Skeleton variant="text" sx={{ fontSize: '14px' }} width={50} className="mt-[4px]" />
            </Paper>
          </Grid>
      
        </Grid>
      </Box>

    </div>
  )
}


export { UserConcernSkeleton, BannerSkeleton, ConcernTabSkeleton };