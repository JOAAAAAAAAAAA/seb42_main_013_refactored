import pillSVGUrl from '@/../public/svg/pill_type.svg?url'

export type PillTypeID =
  | "capsule"
  | "chewable"
  | "gummy"
  | "powder"
  | "tablet"
  | "liquid"


interface PillSVGSpriteProps extends React.SVGAttributes<HTMLOrSVGElement> {
  id: PillTypeID
  color: string;
  width: string;
  height: string;
}

export default function PillSVGSprite({
  id,
  width,
  height,
  color,
  ...props
}: PillSVGSpriteProps) {

  return (
    <>
      <svg
        width={width}
        height={height}
        color={color}
        {...props}>
        <use
          width="100%"
          height="100%"
          xlinkHref={`${pillSVGUrl.src}#icon_${id}`}
        />
      </svg>
    </>

  )
}