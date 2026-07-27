import type { ReactNode } from 'react'

export enum SidebarItemType {
  Nest = 'nest',
}

export type SidebarItem = {
  key: string
  title: string
  href?: string
  icon?: string
  startContent?: ReactNode
  endContent?: ReactNode
  items?: SidebarItem[]
  type?: SidebarItemType
  className?: string
}

export default function Sidebar() {
  return null
}
