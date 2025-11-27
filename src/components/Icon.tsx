// copy from https://github.com/unixzii/cyandev.app/blob/873c1656894dbbdff1d6e9797d9baecd49d4cafd/src/components/Icon.tsx
import type { IconBaseProps } from 'react-icons'
import {
  TbBrandTwitter,
  TbBrandGithub,
  TbRss,
  TbSun,
  TbMoon,
  TbDeviceDesktop,
} from 'react-icons/tb'

const ICON_MAP = {
  twitter: TbBrandTwitter,
  github: TbBrandGithub,
  rss: TbRss,
  sun: TbSun,
  moon: TbMoon,
  display: TbDeviceDesktop,
}
export type IconType = keyof typeof ICON_MAP

export type IconProps = {
  icon: IconType
} & IconBaseProps

export function Icon(props: IconProps) {
  const { icon, ...restProps } = props
  const IconComponent = ICON_MAP[icon]
  return <IconComponent {...restProps} />
}
