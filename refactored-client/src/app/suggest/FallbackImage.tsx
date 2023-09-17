import { Skeleton } from '@mui/material'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

export const FallbackImage = ({ src, fallback, alt, width, ...rest }: {
  src: string
  fallback: string
  alt: string
  width: string
}) => {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="100%" />}>
      <div className={`flex relative justify-center items-center w-[${width || `100%`}] h-full`}>
        <Image
          {...rest}
          alt={alt}
          fill
          className='object-contain'
          src={imgSrc ? imgSrc : fallback}
          onError={() => {
            setImgSrc(fallback)
          }}
        />
      </div>
    </Suspense>
  )
}