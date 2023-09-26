import healthconcernUrl from '../../../../public/svg/health_concerns.svg?url'


type HealthSvgSpriteID =
  | "all"
  | "anti_oxidant"
  | "blood_glucose_control"
  | "blood_improvement"
  | "blood_pressure_control"
  | "body_fat_reduction"
  | "bone_health"
  | "cholesterol"
  | "climacteric"
  | "eye_health"
  | "fatigue_recovery"
  | "growth_and_development"
  | "immunity"
  | "improve_memory"
  | "improve_sleep_quality"
  | "intestinal_health"
  | "liquid"
  | "liver_health"
  | "nutritional_supplement"
  | "prostate"
  | "relaxation_of_tension"
  | "skin_health"
  | "stomach_health"


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