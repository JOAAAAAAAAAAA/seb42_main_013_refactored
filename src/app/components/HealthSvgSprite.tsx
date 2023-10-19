import healthconcernUrl from '@/../public/svg/health_concerns.svg?url';
import { HealthSvgSpriteID } from '@/types'



interface HealthSvgSpriteProps extends React.SVGAttributes<HTMLOrSVGElement> {
  id: HealthSvgSpriteID;//HealthSvgSpriteID
  color: string;
  width: string;
  height: string;
}

export default function HealthSvgSprite({
  id,
  width,
  height,
  color,
  ...props
}: HealthSvgSpriteProps) {

  return (
    <>
      <svg
        width={width}
        height={height}
        color={color}>
        <use
          width="100%"
          height="100%"
          xlinkHref={`${healthconcernUrl.src}#icon_${id}`}
        />
      </svg>
    </>

  )
}