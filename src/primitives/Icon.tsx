import { type ButtonHTMLAttributes } from 'react'

type IconProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name: string,
  icon: string,
  color: string,
  size: string,
  rounded: boolean
}

function Icon({ className, name, icon, color, size, rounded, ...rest }: IconProps) {
  return (
    <button className={`${name} ${className}`} {...rest}>
      <div className={`icon is-${icon} is-${color} is-${size} ${rounded ? 'is-rounded' : ''}`}>
        <span className="icon__span"></span>
      </div>
    </button>
  )
}

export default Icon
