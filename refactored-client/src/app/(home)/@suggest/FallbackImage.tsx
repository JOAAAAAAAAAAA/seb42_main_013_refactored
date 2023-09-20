import { Skeleton } from '@mui/material'
import Image from 'next/image'
import { Suspense, useEffect, useState } from 'react'

export const FallbackImage = ({ src, fallback, alt, ...rest }: {
  src: string
  alt: string
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const temfallback = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="100%" />}>
        <div className={`relative flex aspect-square h-full items-center justify-center`}>
        <Image
          {...rest}
          alt={alt}
          fill
          // TODO : 100vw로 하면 이미지가 너무 커짐
          sizes="100%"
          className='object-contain'
          src={imgSrc}
          onError={() => {
            setImgSrc(fallback)
          }}
        />
      </div>
    </Suspense>
  )
}