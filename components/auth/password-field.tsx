'use client'

import {
  InputGroupInput,
  InputGroupRoot,
  InputGroupSuffix,
  Label,
  TextField,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

interface PasswordFieldProps {
  label: string
  name?: string
  autoComplete?: 'current-password' | 'new-password'
  /** 屏幕阅读器用的切换按钮说明 */
  toggleLabel: string
  minLength?: number
}

/**
 * 带可见性切换的密码输入。登录与注册两处复用。
 *
 * HeroUI v3 的 `Input` 不接受 `endContent`，要放尾部图标必须用 InputGroup 组合。
 */
export default function PasswordField({
  label,
  name = 'password',
  autoComplete = 'current-password',
  toggleLabel,
  minLength,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <TextField
      isRequired
      className="w-full"
      name={name}
      type={isVisible ? 'text' : 'password'}
    >
      <Label>{label}</Label>
      <InputGroupRoot>
        <InputGroupInput autoComplete={autoComplete} minLength={minLength} />
        <InputGroupSuffix>
          <button
            aria-label={toggleLabel}
            className="text-default-400 outline-none"
            // 明确 type=button：默认的 submit 会让点击「显示密码」直接提交表单
            type="button"
            onClick={() => setIsVisible((visible) => !visible)}
          >
            <Icon
              icon={isVisible ? 'solar:eye-closed-linear' : 'solar:eye-bold'}
              width={20}
            />
          </button>
        </InputGroupSuffix>
      </InputGroupRoot>
    </TextField>
  )
}
