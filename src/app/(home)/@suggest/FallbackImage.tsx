import Image from 'next/image'

export const FallbackImage = ({ src, alt, blur, ...rest }: {
  src: string
  alt: string
  blur?: string
}) => {
  // const [imgSrc, setImgSrc] = useState(src)
  const tempblur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='

  // useEffect(() => {
  //   setImgSrc(src)
  // }, [src])

  return (
    //suspense 는 component suspsense에서 trigger 됨 이미지 로딩이 아니라
    <div className={`relative flex aspect-square h-full items-center justify-center`}>
        <Image
          {...rest}
          alt={alt}
          fill
          // TODO : 100vw로 하면 이미지가 너무 커짐
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 50vw"
          className='object-contain'
          src={src}
          blurDataURL={blur ?? tempblur}
          placeholder="blur"
          // onError={() => {
          //   setImgSrc("/images/pills-bottle.png")
          // }}
        />
      </div>
  )
}