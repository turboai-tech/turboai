'use client'

import { Checkbox } from '@heroui/react'

/**
 * HeroUI v3 的 Checkbox 是组合式的：只写 `<Checkbox>文案</Checkbox>` 会渲染出
 * 文案却没有方框 —— 必须显式给出 Content / Control / Indicator，
 * 与 Switch 需要 Content / Control / Thumb 是同一套约定。
 */
export default function RememberMe({ label }: { label: string }) {
  return (
    <Checkbox className="text-muted text-sm" name="remember">
      <Checkbox.Content>
        {/* v3 的 control 默认 border-width 为 0，在深色卡片上与背景同色，
            必须显式补边框才看得见方框 */}
        <Checkbox.Control className="border-default/60 border">
          <Checkbox.Indicator />
        </Checkbox.Control>
        {label}
      </Checkbox.Content>
    </Checkbox>
  )
}
