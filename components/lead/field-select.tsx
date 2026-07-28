'use client'

import { Label, ListBox, Select } from '@heroui/react'

export interface SelectOption {
  value: string
  label: string
}

interface FieldSelectProps {
  label: string
  name: string
  placeholder: string
  options: SelectOption[]
  value: string | null
  onChange: (value: string | null) => void
  isRequired?: boolean
}

/**
 * 表单里的下拉选择。
 *
 * HeroUI v3 的 Select 要五层组合（Root / Trigger / Value / Indicator /
 * Popover + ListBox），在表单里重复五次会淹没实际逻辑，所以包一层。
 */
export default function FieldSelect({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
  isRequired = false,
}: FieldSelectProps) {
  return (
    <Select
      className="w-full"
      isRequired={isRequired}
      name={name}
      selectedKey={value}
      onSelectionChange={(key) => onChange(key === null ? null : String(key))}
    >
      <Label>{label}</Label>
      <Select.Trigger className="border-default/50 border">
        <Select.Value>
          {({ selectedText }) => (
            <span className={selectedText ? undefined : 'text-muted'}>
              {selectedText || placeholder}
            </span>
          )}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox items={options}>
          {(option) => (
            <ListBox.Item key={option.value} id={option.value}>
              {option.label}
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
