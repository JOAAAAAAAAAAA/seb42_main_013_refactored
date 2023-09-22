import healthconcernUrl from '../../../public/svg/health_concerns.svg?url'
import Healthconcern from '../../../public/svg/health_concerns.svg'

type HealthSvgSpriteID =
  | "all"
  | "anti_oxidant"
  | "blood_glucose_control"
  | "blood_improvement"
  | "blood_pressure_control"
  | "body_fat_reduction"
  | "bone_health"
  | "capsule"
  | "chewable"
  | "cholesterol"
  | "climacteric"
  | "eye_health"
  | "family"
  | "fatigue_recovery"
  | "female"
  | "growth_and_development"
  | "gummy"
  | "immunity"
  | "improve_memory"
  | "improve_sleep_quality"
  | "infant_youth"
  | "intestinal_health"
  | "liquid"
  | "liver_health"
  | "male"
  | "male_and_female"
  | "nutritional_supplement"
  | "powder"
  | "pregnant_woman"
  | "prostate"
  | "relaxation_of_tension"
  | "senior"
  | "skin_health"
  | "stomach_health"
  | "tablet"


interface HealthSvgSpriteProps extends React.SVGAttributes<HTMLOrSVGElement> {
  id: HealthSvgSpriteID
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