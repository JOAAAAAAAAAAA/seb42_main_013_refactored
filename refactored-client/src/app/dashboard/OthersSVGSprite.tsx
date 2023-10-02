import othersSVGUrl from '../../../public/svg/others.svg?url'

type OthersID =
  | "calendar"
  | "drug"
  | "supplement"
  | "menu"
  | "time"




interface OthersSVGSpriteProps extends React.SVGAttributes<HTMLOrSVGElement> {
  id: OthersID
  color: string;
  width: string;
  height: string;
}

export default function OthersSVGSprite({
  id,
  width,
  height,
  color,
  ...props
}: OthersSVGSpriteProps) {

  return (
    <>
      <svg
        width={width}
        height={height}
        color={color}
        className='inline-block'
        >
        <use
          width="100%"
          height="100%"
          xlinkHref={`${othersSVGUrl.src}#${id}`}
        />
      </svg>
    </>

  )
}